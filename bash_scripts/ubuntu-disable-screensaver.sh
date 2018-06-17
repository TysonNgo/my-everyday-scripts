# returns uint32 <\d+>
t=($(gsettings get org.gnome.desktop.session idle-delay))
t=${t[1]}

if [ $t -eq 0 ]
then
    t=300
    echo Screensaver enabled
else
    t=0
    echo Screensaver disabled
fi

gsettings set org.gnome.desktop.session idle-delay $t
