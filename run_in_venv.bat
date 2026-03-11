@echo off
cd /d %~dp0

if not exist .venv\Scripts\activate.bat (
  echo [ERROR] .venv not found at %cd%\.venv
  echo Create it first: py -3 -m venv .venv
  exit /b 1
)

call .venv\Scripts\activate.bat
cmd /k
