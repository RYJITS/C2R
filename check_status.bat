@echo off
echo ====================================
echo     Verification du status C2R
echo ====================================
echo.

cd /d "%~dp0"

echo Verification des modifications...
git status

echo.
echo ====================================
echo.
pause
