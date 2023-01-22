from argparse import ArgumentParser
from queue import Queue
import threading
import subprocess
import json
import os


class FFMPEG():
	@staticmethod
	def encoding_is_vp9(infile):
		if os.path.isfile(infile):
			process = subprocess.Popen([
				'ffprobe', '-v', 'error',
				'-select_streams', 'v:0',
				'-show_entries', 'stream=codec_name',
				'-of', 'default=nokey=1:noprint_wrappers=1',
				infile
				], stdin=subprocess.PIPE, stdout=subprocess.PIPE)

			return process.stdout.read().strip() == b'vp9'
		return False

	@staticmethod
	def encode_vp9(config, infile):
		basename, ext = os.path.splitext(infile)
		outpath = os.path.abspath(basename + '_vp9' + ext)

		# do not encode if the\file\exists_vp9.mp4
		if os.path.isfile(outpath):
			return

		cmds = []
		cmd = ['ffmpeg', '-i', infile]

		if config.two_pass:
			cmd += ['-c:v', 'libvpx-vp9']
			if config.video_bitrate is not None:
				cmd += ['-b:v', config.video_bitrate]
			if config.crf is not None:
				cmd += ['-crf', config.crf]
			cmd += [
			'-pass', '1',
			'-an',
			'-f', 'NULL', 'NUL'
			]
			cmds.append(cmd)

			cmd = []
			cmd += ['ffmpeg', '-i', infile]
			cmd += ['-c:v', 'libvpx-vp9']
			if config.video_bitrate is not None:
				cmd += ['-b:v', config.video_bitrate]
			if config.crf is not None:
				cmd += ['-crf', config.crf]
			if config.audio_bitrate is not None:
				cmd += ['-c:a', 'libopus']
				cmd += ['-b:a', config.audio_bitrate]
			else:
				cmd += ['-c:a', 'copy']
			cmd += ['-c:s', 'copy']
			cmd += ['-pass', '2']
			cmd += [outpath]
			cmds.append(cmd)
		else:
			cmd += ['-c:v', 'libvpx-vp9']
			if config.video_bitrate is not None:
				cmd += ['-b:v', config.video_bitrate]
			if config.crf is not None:
				cmd += ['-crf', config.crf]
			if config.audio_bitrate is not None:
				cmd += ['-c:a', 'libopus']
				cmd += ['-b:a', config.audio_bitrate]
			else:
				cmd += ['-c:a', 'copy']
			cmd += ['-c:s', 'copy']
			cmd += [outpath]
			cmds.append(cmd)

		for cmd in cmds:
			subprocess.call(cmd)


class Config():
	def __init__(self, args):
		with open('config.json') as f:
			config = json.load(f)

		self.crf = args.crf if args.crf is not None else config["crf"]
		self.video_bitrate = getattr(args, 'b:v') if getattr(args, 'b:v') is not None else config["video_bitrate"]
		self.audio_bitrate = getattr(args, 'b:a') if getattr(args, 'b:a') is not None else config["audio_bitrate"]
		self.two_pass = getattr(args, '2pass') if getattr(args, '2pass') else config["2pass"]
		self.ffmpeg_instances = config["ffmpeg_instances"]


def get_args():
	parser = ArgumentParser(epilog='Default values for the options are contained in config.json')
	parser.add_argument('input', type=str, help='Path to video file or a directory')

	parser.add_argument('-crf', type=str, help='CRF value. the lower the number, the higher the quality')
	parser.add_argument('-b:v', type=str, help='Bitrate of video')
	parser.add_argument('-b:a', type=str, help='Bitrate of audio')
	parser.add_argument('-2pass', action='store_true', help='Use 2 pass encoding')

	args = parser.parse_args()
	return args


def get_files(in_path):
	q = Queue()
	if os.path.isfile(in_path):
		q.put(in_path)
	elif os.path.isdir(in_path):
		for root, dirs, files in os.walk(in_path):
			for fname in files:
				q.put(os.path.abspath(os.path.join(root, fname)))
	return q


def encode_files(config, files):
	while not files.empty():
		fname = files.get()
		if not FFMPEG.encoding_is_vp9(fname):
			if os.path.isfile(fname):
				FFMPEG.encode_vp9(config, fname)
		files.task_done()


def main():
	args = get_args()
	config = Config(args)
	files = get_files(args.input)

	threads = [threading.Thread(target=encode_files, args=[config, files]) for i in range(config.ffmpeg_instances)]
	[t.start() for t in threads]
	[t.join() for t in threads]


if __name__ == '__main__':
	main()
