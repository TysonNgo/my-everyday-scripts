import sys

def HHMMSS_to_seconds(srt_time_string):
    h, m, s = (float(n.replace(",", ".")) for n in srt_time_string.split(":"))
    return s + m*60 + h*60*60

def seconds_to_HHMMSS(seconds):
    m = int(seconds / 60)
    seconds = seconds % 60
    h = int(m / 60)
    m = m % 60
    
    fff = str(round((int(seconds)-seconds),3))[3:].ljust(3, "0")
    seconds = int(seconds)
    hms = [str(t).zfill(2) for t in [h,m,seconds]]
    return (":").join(hms)+","+fff

# line = 00:00:00,000 --> 00:00:00,000
def convert_time(line, speed_multiplier):
    arrow = " --> "
    time_strings = (speed_multiplier*HHMMSS_to_seconds(time) for time in line.split(arrow))
    
    new_time_strings = (seconds_to_HHMMSS(time) for time in time_strings)

    return arrow.join(new_time_strings)+"\n"
    

if len(sys.argv) != 3:
    print("Usage: ")
    print("    python srt_tempo_change.py <file.srt> <speed_multiplier>")
    sys.exit(1)

srt_file, speed_multiplier = sys.argv[1:]


# check if speed_multiplier is number
try:
    m = speed_multiplier
    speed_multiplier = 1/float(speed_multiplier)
    out = open(srt_file[:-4] + "_"+m+".srt", "w")
except:
    print("speed multiplier must be a number")
    sys.exit(1)

with open(srt_file) as f:
    line = f.readline()
    while line:
        try:
            float(line)
            timestamps = f.readline()
            out.write(line)
            out.write(convert_time(timestamps, speed_multiplier))

        except Exception as e:
            #print e
            pass
            out.write(line)
        line = f.readline()

out.close()
