@echo off
echo ====================================
echo     Mise a jour du site C2R
echo ====================================
echo.

cd /d "%~dp0"

echo Verification des modifications...
git status

echo.
echo Ajout des modifications...
git add .

echo.
set /p message="Message de mise a jour (ex: 'Mise a jour du contenu'): "
echo.

echo Enregistrement des modifications...
git commit -m "%message%"

echo.
echo Publication des modifications...
git push

echo.
echo ====================================
echo     Mise a jour terminee !
echo ====================================
echo.
pause
