@echo off
:: makes a hardlink of all files in a directory and its subdirectories
:: hardlink_copy.bat C:\source\folder_to_hardlink_files folder_name
:: folder_name will be created in C:\source\


if "%~1"=="" goto :INCORRECT_ARG
if "%~2"=="" goto :INCORRECT_ARG

set source=%~1
set drive=%~d1
set dest=%~dp1%~2

CHOICE /C YN /M "Are you sure you want to create a hardlink copy of %source% to %dest%?"

if ERRORLEVEL==2 goto :eof

cd %source%
%drive%

echo creating %dest%
mkdir "%dest%"

:: dir paths
:: create empty folders
for /R /D %%s in (.\*) do (
	call :COPY_FOLDER "%%s"
)

:: file paths
:: create hardlinks
for /R %%f in (.\*) do (
	call :HARD_LINK "%%f"
)

pause
goto :eof

:COPY_FOLDER
set a=%~1
call set a=%%a:%cd%^=%%
echo copying %a%...
mkdir "%dest%%a%"
EXIT /B 0

:HARD_LINK
set source=%~1
call set fname=%%source:%cd%^=%%
set link=%dest%%fname%

mklink /H "%link%" "%source%"
EXIT /B 0

:INCORRECT_ARG
echo Incorrect number of arguments
echo Usage:
echo "%~n0%~x0 <path_to_folder> <output_folder_name>"
pause
