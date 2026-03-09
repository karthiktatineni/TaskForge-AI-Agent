@echo off
echo ==========================================================
echo Starting AI Project Architect Backend ^& Cloudflare Tunnel
echo ==========================================================
echo.

echo Ensuring data and projects folders exist...
if not exist "backend\data" mkdir "backend\data"
if not exist "backend\projects" mkdir "backend\projects"

cd backend

echo Stopping existing containers...
docker-compose down

echo.
echo Building and spinning up the containers...
echo This might take a minute on first run...
docker-compose up -d --build

echo.
echo ==========================================================
echo SUCCESS! 🚀
echo.
echo [1] Backend running on: http://localhost:8000
echo [2] Public URL running on: https://architect-api.tatinenikarthik.online
echo.
echo [!] Generated projects will be saved in:
echo     %CD%\projects
echo.
echo To view live logs, type: docker-compose logs -f
echo ==========================================================
cd ..
pause
