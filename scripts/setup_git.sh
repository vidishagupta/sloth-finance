#!/usr/bin/env bash
# SlothFinance - Automated Git Setup & Push Tool for Linux/macOS

set -e

echo "========================================================"
echo "SlothFinance - Automated Git Setup & Push Tool"
echo "========================================================"

if ! command -v git &> /dev/null; then
    echo "[ERROR] Git is not installed. Please install Git."
    exit 1
fi

echo "[1/4] Initializing Git repository..."
if [ ! -d ".git" ]; then
    git init
    git branch -M main
fi

echo "[2/4] Staging project files..."
git add .

echo "[3/4] Creating initial release commit..."
git commit -m "feat: initial SlothFinance release (Hacktoberfest Week 3)" || echo "No new changes to commit."

echo "========================================================"
echo "[4/4] GitHub Remote Push Instructions"
echo "========================================================"
echo "To push to your GitHub account:"
echo "1. Create a repository on GitHub (e.g. sloth-finance)"
echo "2. Run:"
echo "   git remote add origin https://github.com/YOUR_USERNAME/sloth-finance.git"
echo "   git push -u origin main"
echo "========================================================"
