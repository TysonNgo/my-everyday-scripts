import sys
import os
import threading
from queue import Queue
import subprocess

from random import randint
from time import sleep

clips = Queue()
ffmpeg_instances = 3

# maybe TODO
# check if last argument is file
input_file = sys.argv[-1]
dirname = os.path.dirname(input_file)
basename, ext = os.path.splitext(os.path.basename(input_file))

def run_ffmpeg():
	global clips, input_file
	while True:
		if clips.empty():
			break
		clip = clips.get()
		clips.task_done()

		outfile = clip['outfile']

		#command = [ 'echo', input_file ]
		command = ['ffmpeg']

		command += ['-ss', clip['start']] if clip['start'] else []
		command += ['-to', clip['end']] if clip['end'] else []
		command += ['-i', input_file ]
		command += ['-c', 'copy']
		command += [outfile]

		subprocess.call(command)

for i, clip in enumerate(sys.argv[1:-1]):
	start, end, outfile = [p.split('=').pop() for p in clip.split(';')]

	if outfile == '':
		outfile = basename + '_clip' + str(i).zfill(2) + ext
	else:
		if os.path.splitext(outfile)[1] == '':
			outfile += ext

	clips.put({
		"start": start,
		"end": end,
		"outfile": os.path.join(dirname, outfile)
		})


threads = []
for i in range(ffmpeg_instances):
	t = threading.Thread(target=run_ffmpeg).start()
for t in threads:
	t.join()
