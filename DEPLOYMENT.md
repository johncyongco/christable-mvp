# Christable MVP Deployment Guide

## Deployment Options

### Option 1: Vercel (Recommended)
Vercel is the easiest way to deploy Next.js applications.

#### Steps to Deploy on Vercel:

1. **Install Vercel CLI** (optional):
   ```bash
   npm i -g vercel
   ```

2. **Deploy from CLI**:
   ```bash
   vercel login
   vercel
   ```

3. **Or deploy from GitHub**:
   - Push code to GitHub repository
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure environment variables (see below)
   - Click "Deploy"

### Option 2: Manual Build & Deploy
1. **Build the application**:
   ```bash
   npm run build
   ```

2. **Start the production server**:
   ```bash
   npm start
   ```

## Environment Variables

For production deployment, configure these environment variables:

### Required Variables:
```
# Database (PostgreSQL)
DATABASE_URL="postgresql://username:password@host:5432/database"

# Next.js Authentication
NEXTAUTH_SECRET="generate-a-secure-random-string"
NEXTAUTH_URL="https://your-domain.com"

# App URL
APP_URL="https://your-domain.com"
```

### Optional Variables (for full functionality):
```
# Firebase (for push notifications)
FIREBASE_PROJECT_ID="your-project-id"
FIREBASE_PRIVATE_KEY="your-private-key"
FIREBASE_CLIENT_EMAIL="your-client-email"

# Google Sheets Integration
GOOGLE_SHEETS_CLIENT_EMAIL="service-account-email"
GOOGLE_SHEETS_PRIVATE_KEY="private-key"
GOOGLE_SHEETS_SPREADSHEET_ID="spreadsheet-id"

# Slack Integration
SLACK_BOT_TOKEN="xoxb-your-bot-token"
SLACK_SIGNING_SECRET="your-signing-secret"

# n8n Integration
N8N_WEBHOOK_URL="https://your-n8n-instance.com/webhook/path"
N8N_API_KEY="your-n8n-api-key"
```

## Vercel-Specific Configuration

### Environment Variables in Vercel Dashboard:
1. Go to your project in Vercel
2. Click "Settings" → "Environment Variables"
3. Add all required variables from above
4. Redeploy the application

### Build Settings:
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

## Testing the Deployment

### Local Testing:
1. Set up environment variables in `.env.local`
2. Run build: `npm run build`
3. Start production server: `npm start`
4. Visit: `http://localhost:3000`

### Post-Deployment Checks:
1. Verify all pages load correctly
2. Test form submissions
3. Check console for errors
4. Test responsive design on mobile/tablet

## Troubleshooting

### Common Issues:

1. **Build Failures**:
   - Check Node.js version (requires 18+)
   - Verify all dependencies are installed
   - Check for TypeScript errors

2. **Database Connection Issues**:
   - Verify DATABASE_URL is correct
   - Check database permissions
   - Ensure database is accessible from deployment region

3. **Environment Variables**:
   - All variables must be set in production
   - Use `.env.local` for local development
   - Never commit `.env` files to git

4. **CORS Issues**:
   - Configure CORS in Next.js config if needed
   - Check API route configurations

## Maintenance

### Updating the Application:
1. Push changes to GitHub
2. Vercel will automatically redeploy
3. Or trigger manual redeploy from Vercel dashboard

### Monitoring:
- Check Vercel logs for errors
- Monitor application performance
- Set up error tracking (Sentry, etc.)

## Security Notes

1. **Never commit sensitive data** to version control
2. **Use strong secrets** for NEXTAUTH_SECRET
3. **Restrict database access** to deployment IP only
4. **Regularly update dependencies**: `npm audit fix`
5. **Enable HTTPS** (automatic on Vercel)

## Support

For deployment issues:
1. Check Vercel documentation: [vercel.com/docs](https://vercel.com/docs)
2. Next.js deployment guide: [nextjs.org/docs/deployment](https://nextjs.org/docs/deployment)
3. Check application logs in Vercel dashboard