@echo off
setlocal

REM Set up environment manually if needed
REM Example: set PATH=C:\Users\YourUser\AppData\Roaming\nvm\v20.0.0;%PATH%

REM Change to the script directory
cd /d %~dp0

echo Starting Vite dev server...
start "" /b cmd /c "npm run dev"

echo Launching Electron app...
call npm run electron

echo Cleaning up port 5173...
npx kill-port 5173

echo Done.
