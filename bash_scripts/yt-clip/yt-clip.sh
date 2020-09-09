ffmpeg="E:\\test_ffmpeg\\ffmpeg.exe"
youtubedl="E:\\test_ffmpeg\\youtube-dl"

if [ $# -eq 1 ];
then
   url=$1
   "$youtubedl" -F "$url"

   exit
fi

if [ $# -ne 5 ];
then
   echo "Usage: "
   echo "  Download segment:"
   echo "    sh yt-clip.sh  <start_time> <end_time> <format> <url> <out_file>"
   echo "  List available formats:"
   echo "    sh yt-clip.sh  <url>"
   exit
fi

start_time=$1
end_time=$2
format=$3
url=$4
out_file=$5

"$ffmpeg" -ss "$start_time" -i $("E:\\test_ffmpeg\\youtube-dl" -f "$format" -g "$url") -acodec copy -vcodec copy -t "$end_time" "$out_file"
