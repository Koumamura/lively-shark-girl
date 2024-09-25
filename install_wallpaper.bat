@echo off
setlocal

set "source=%~dp0"
set "destination=%USERPROFILE%\AppData\Local\Lively Wallpaper\Library\wallpapers\Lively-Shark-Girl-Main"
set "parentDir=%USERPROFILE%\AppData\Local\Lively Wallpaper\Library\wallpapers"

if exist "%parentDir%" (
    echo.
    echo Parent directory found! Creating destination directory...


    if not exist "%destination%" (
        mkdir "%destination%"
        if errorlevel 1 (
            color 0C
            echo Failed to create the destination directory! Please check permissions.
            pause
            exit /b
        )
    )
    echo.
    echo Copying files to "%destination%" ...
    echo.
    
    xcopy "%source%*" "%destination%\" /E /I /Y

    if errorlevel 1 (
        color 0C
        echo.
        echo.
        echo Copy failed! Please check if the source and destination are correct.
    ) else (
        color 0A
        echo.
        echo Install successful! Please restart your Lively Wallpaper to apply the wallpaper.
    )
) else (
    color 0C
    echo.
    echo Unable to locate the parent folder. Please check the path.
)
echo.
pause
echo.
endlocal
