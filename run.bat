@echo off
echo ==========================================================
echo Starting AI Project Architect Backend ^& Cloudflare Tunnel
echo ==========================================================
echo.

cd backend

echo Stopping existing containers...
docker-compose down

echo.
echo Building and spinning up the containers...
docker-compose up -d --build

echo.
echo ==========================================================
echo DONE! 
echo.
echo [1] Backend running on: http://localhost:8000
echo [2] Public URL running on: https://architect-api.tatinenikarthik.online
echo.
echo NOTE: Since your frontend is on Vercel, it uses the public URL automatically.
echo.
echo To view live logs, type: docker-compose logs -f
echo ==========================================================
cd ..
pause
