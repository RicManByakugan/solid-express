@echo off
cd /d "D:\WORK - FINAMAD\Train\Library\library-api"
npm run dev

timeout /t 5

:WAIT
curl -s http://localhost:3000 >nul
if errorlevel 1 (
    timeout /t 1
    goto WAIT
)


cmd /k
