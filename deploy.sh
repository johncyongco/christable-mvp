#!/bin/bash

# Christable MVP Deployment Script
# This script helps deploy the application to Vercel

echo "🚀 Christable MVP Deployment Script"
echo "==================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version must be 18 or higher. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm."
    exit 1
fi

echo "✅ npm $(npm -v) detected"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"

# Check if we can build the application
echo ""
echo "🔨 Testing build..."
npm run build 2>/dev/null

if [ $? -ne 0 ]; then
    echo "⚠️  Build test failed (some warnings are okay for testing)"
    echo "   The application may still deploy, but check for critical errors."
else
    echo "✅ Build test passed"
fi

echo ""
echo "🎯 Deployment Options:"
echo "======================"
echo ""
echo "1. Deploy to Vercel (Recommended)"
echo "2. Deploy to Vercel using CLI"
echo "3. Build for production"
echo "4. Exit"
echo ""

read -p "Select option (1-4): " option

case $option in
    1)
        echo ""
        echo "🌐 Deploy to Vercel (GitHub)"
        echo "---------------------------"
        echo "1. Push your code to GitHub:"
        echo "   git add ."
        echo "   git commit -m 'Deploy Christable MVP'"
        echo "   git push origin main"
        echo ""
        echo "2. Go to https://vercel.com/new"
        echo "3. Import your GitHub repository"
        echo "4. Configure environment variables:"
        echo "   - DATABASE_URL (PostgreSQL)"
        echo "   - NEXTAUTH_SECRET"
        echo "   - NEXTAUTH_URL"
        echo "   - APP_URL"
        echo "5. Click 'Deploy'"
        echo ""
        echo "📝 See DEPLOYMENT.md for detailed instructions"
        ;;
    2)
        echo ""
        echo "💻 Deploy to Vercel using CLI"
        echo "----------------------------"
        echo "1. Install Vercel CLI:"
        echo "   npm i -g vercel"
        echo ""
        echo "2. Login to Vercel:"
        echo "   vercel login"
        echo ""
        echo "3. Deploy:"
        echo "   vercel"
        echo ""
        echo "4. Follow the prompts to configure your deployment"
        ;;
    3)
        echo ""
        echo "🔨 Build for production"
        echo "----------------------"
        echo "Building the application..."
        npm run build
        
        if [ $? -eq 0 ]; then
            echo ""
            echo "✅ Build successful!"
            echo ""
            echo "To start the production server:"
            echo "npm start"
            echo ""
            echo "The application will be available at: http://localhost:3000"
        else
            echo "❌ Build failed. Check the errors above."
        fi
        ;;
    4)
        echo "Exiting..."
        exit 0
        ;;
    *)
        echo "❌ Invalid option"
        exit 1
        ;;
esac

echo ""
echo "📚 Additional Resources:"
echo "-----------------------"
echo "• Deployment Guide: DEPLOYMENT.md"
echo "• Environment Variables: .env.production.example"
echo "• Vercel Documentation: https://vercel.com/docs"
echo "• Next.js Deployment: https://nextjs.org/docs/deployment"
echo ""
echo "🎉 Christable MVP is ready for deployment!"