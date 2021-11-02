import struct
import sys
import binascii

"""
Usage:

python float2hex.py 1.0

"""

s = binascii.hexlify(struct.pack('<f', float(sys.argv[1])))

arr = [s[i:i+2] for i in range(0, len(s), 2)]

print " ".join(arr)
