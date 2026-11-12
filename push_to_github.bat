@echo off
title Push Optivoyge-AI to GitHub
color 0A
echo =======================================================
echo          OPTIVOYAGE AI - GITHUB PUBLISHER
echo =======================================================
echo.
echo Target Repository: https://github.com/sohamgoswami05/Optivoyge-AI
echo Local Directory: %~dp0
echo.

cd /d "%~dp0"

echo [1/3] Checking Git status...
git status -s

echo.
echo [2/3] Checking if remote repo exists or creating via GitHub CLI...
where gh >nul 2>nul
if %errorlevel% equ 0 (
    echo GitHub CLI detected. Attempting automatic repository setup...
    gh repo create sohamgoswami05/Optivoyge-AI --public --source=. --remote=origin --push 2>nul
)

echo.
echo [3/3] Pushing main branch to origin...
git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo =======================================================
    echo   SUCCESS! Pushed cleanly to GitHub.
    echo   Link: https://github.com/sohamgoswami05/Optivoyge-AI
    echo =======================================================
) else (
    echo.
    echo -------------------------------------------------------
    echo  NOTE: If you have not created the repo yet on GitHub:
    echo  1. Open https://github.com/new
    echo  2. Name it: Optivoyge-AI (Public)
    echo  3. Click "Create repository"
    echo  4. Re-run this file!
    echo -------------------------------------------------------
)

echo.
pause
