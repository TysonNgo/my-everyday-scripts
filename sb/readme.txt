create python2 virtualenv:

   > virtualenv venv

add environment variables; append to venv\scripts\activate.bat:

set SB_COOKIE=<phpsession here>
set SB_ID=<your id>

activate virtual environment:

   > venv\scripts\activate

install dependencies:

   > pip install -r requirements.txt

run script:

   > python auto.py

