if not "%~1" == "" goto CONVERT
goto :END

:CONVERT
set in="%~1"
set out=%in:.mp4=_vp9.mp4%

echo %in%
echo %out%
ffmpeg -i %in% -c:v libvpx-vp9 -c:a libopus -c:s copy %out%

:END
