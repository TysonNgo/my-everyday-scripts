if [[ "$OSTYPE" == "msys" ]]; then
    echo "Enter the desired amount of minutes to close processes in process_list.txt: ";
    read sleep_time;

    if ! [ "$sleep_time" -eq "$sleep_time" ]; then
        exit 1;
    fi

    echo Closing programs:
    
    cat $(dirname $0)/process_list.txt | awk '{print "\t" $0}'

    echo on $(date -d "+$sleep_time minutes")
    
    expr $sleep_time \* 60 | xargs sleep;

    while read process; do
        tasklist | awk -v process=$process '
        {
           if ($1 == process)
               print "//PID " $2
        }' | xargs taskkill;
    done < $(dirname $0)/process_list.txt
else
    echo "This script is inteded to be run on Windows"
    exit 1
fi
