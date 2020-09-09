if [ $# -ne 3 ];
then
    echo "Usage:"
    echo "  sh merge-video-audio.sh <video> <audio> <out_file>"
fi

ffmpeg="E:\test_ffmpeg\ffmpeg.exe"
video=$1
audio=$2
out_file=$3

"$ffmpeg" -i "$video" -i "$audio" -c:v copy -map 0:v:0 -map 1:a:0 "$out_file"
