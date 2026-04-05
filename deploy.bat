@echo off
echo ===================================
echo   Christable MVP Deployment Helper
echo ===================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ first.
    pause
    exit /b 1
)

REM Check Node.js version
for /f "tokens=1 delims=." %%i in ('node -v') do set "NODE_VERSION=%%i"
set "NODE_VERSION=%NODE_VERSION:~1%"
if %NODE_VERSION% LSS 18 (
    echo ❌ Node.js version must be 18 or higher.
    pause
    exit /b 1
)

echo ✅ Node.js detected
echo.

REM Check if npm is installed
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ npm is not installed.
    pause
    exit /b 1
)

echo ✅ npm detected
echo.

REM Install dependencies
echo 📦 Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

echo ✅ Dependencies installed successfully
echo.

:menu
echo 🎯 Deployment Options:
echo ======================
echo.
echo 1. Deploy to Vercel (Recommended)
echo 2. Deploy to Vercel using CLI
echo 3. Build for production
echo 4. Exit
echo.

set /p option="Select option (1-4): "

if "%option%"=="1" goto option1
if "%option%"=="2" goto option2
if "%option%"=="3" goto option3
if "%option%"=="4" goto option4
echo ❌ Invalid option
goto menu

:option1
echo.
echo 🌐 Deploy to Vercel (GitHub)
echo ---------------------------
echo 1. Push your code to GitHub:
echo    git add .
echo    git commit -m "Deploy Christable MVP"
echo    git push origin main
echo.
echo 2. Go to https://vercel.com/new
echo 3. Import your GitHub repository
echo 4. Configure environment variables:
echo    - DATABASE_URL (PostgreSQL)
echo    - NEXTAUTH_SECRET
echo    - NEXTAUTH_URL
echo    - APP_URL
echo 5. Click 'Deploy'
echo.
echo 📝 See DEPLOYMENT.md for detailed instructions
goto resources

:option2
echo.
echo 💻 Deploy to Vercel using CLI
echo ----------------------------
echo 1. Install Vercel CLI:
echo    npm i -g vercel
echo.
echo 2. Login to Vercel:
echo    vercel login
echo.
echo 3. Deploy:
echo    vercel
echo.
echo 4. Follow the prompts to configure your deployment
goto resources

:option3
echo.
echo 🔨 Build for production
echo -----------------------
echo Building the application...
call npm run build
if %errorlevel% equ 0 (
    echo.
    echo ✅ Build successful!
    echo.
    echo To start the production server:
    echo npm start
    echo.
    echo The application will be available at: http://localhost:3000
) else (
    echo ❌ Build failed. Check the errors above.
)
goto resources

:option4
echo Exiting...
pause
exit /b 0

:resources
echo.
echo 📚 Additional Resources:
echo -----------------------
echo • Deployment Guide: DEPLOYMENT.md
echo • Environment Variables: .env.production.example
echo • Vercel Documentation: https://vercel.com/docs
echo • Next.js Deployment: https://nextjs.org/docs/deployment
echo.
echo 🎉 Christable MVP is ready for deployment!
pause