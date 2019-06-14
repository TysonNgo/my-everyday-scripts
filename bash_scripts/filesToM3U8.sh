#!/bin/bash
echo \#EXTM3U
while read -r line; do
	echo \#EXTINF:0,$line
	echo $line
done