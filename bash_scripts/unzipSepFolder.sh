#!/bin/bash

# unzips all zip files in a directory into
# their own folder

if [ $# -eq 1 ]; then
	if [ -d "$1" ]; then
		path="$1"
	else
		exit 1
	fi
else
	path=$(pwd)
fi

cd "$path"

for i in $(ls *.zip)
do
	albumName=${i::$(expr ${#i} - 4)};
	mkdir $albumName;
	unzip $i -d $albumName;
done
