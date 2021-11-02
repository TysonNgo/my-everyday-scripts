import struct
import sys

"""
Usage:

python hex2float.py 00 00 00 00

"""

byte_arr = [chr(int(b,16)) for b in sys.argv[1:5]]

print struct.unpack('<f', ''.join(byte_arr))[0]
