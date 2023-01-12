from sys import argv
from subprocess import call
import os

#ffmpeg -i <in> -c:v libvpx-vp9 -c:a libopus -c:s copy <out>

for mp4 in argv[1:]:
	if not mp4.endswith('.mp4'):
		continue
	out = mp4[:-4] + '_vp9.mp4'

	if os.path.isfile(out):
		continue

	call([
		'ffmpeg',
		'-i', mp4,
		'-c:v', 'libvpx-vp9',
		'-c:a', 'libopus',
		'-c:s', 'copy',
		out
	])
