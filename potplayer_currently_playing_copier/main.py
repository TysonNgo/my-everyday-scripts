import os
import psutil
import re
import win32gui


potplayer_process = [process for process in psutil.process_iter() if process.name() == "PotPlayerMini64.exe"][0]
potplayer_title = ""


def enumHandler(hwnd, lParam):
    global potplayer_title
    if win32gui.IsWindowVisible(hwnd):
        if "PotPlayer" in win32gui.GetWindowText(hwnd):
            potplayer_title = win32gui.GetWindowText(hwnd)


def makedir(dir):
    try:
        os.makedirs(dir)
    except:
        pass


if __name__ == "__main__":
    dir = input("Enter the name of the directory to place the files: ")

    makedir(dir)
    while True:
        input("Hit enter to add currently playing song to %s%s: " % (os.getcwd()+os.sep,dir))

        # get the title of potplayer (which will be "song.mp3 - PotPlayer")
        win32gui.EnumWindows(enumHandler, None)

        playing = re.findall("(.*) - PotPlayer$", potplayer_title)[0]
        song_path = [path for path in potplayer_process.open_files() if playing in path.path][0].path

        print(("copying %s to %s" % (playing, dir)).encode("utf-8"))

        with open(song_path, "rb") as f:
            song = f.read()

        with open(dir+os.sep+playing, "wb") as f:
            f.write(song)