@echo off
echo ========================================================
echo SlothFinance - Automated Git Setup & Push Tool
echo ========================================================

REM Check if git is installed
where git >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Git is not installed or not in PATH. Please install Git.
    pause
    exit /b 1
)

echo.
echo [1/4] Initializing Git repository...
if not exist .git (
    git init
    git branch -M main
)

echo.
echo [2/4] Staging project files...
git add .

echo.
echo [3/4] Creating initial release commit...
git commit -m "feat: initial SlothFinance release (Hacktoberfest Week 3)"

echo.
echo ========================================================
echo [4/4] GitHub Remote Push Instructions
echo ========================================================
echo To push to your GitHub account:
echo 1. Create a new repository on GitHub (e.g., https://github.com/your-username/sloth-finance)
echo 2. Run the following two commands:
echo.
echo    git remote add origin https://github.com/YOUR_USERNAME/sloth-finance.git
echo    git push -u origin main
echo.
echo ========================================================
pause
