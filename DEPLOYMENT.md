# Deployment Guide for Procad Next.js Application

This guide explains how to set up and use the CI/CD pipeline for deploying the Procad Next.js application.

## GitHub Actions CI/CD Pipeline

The project includes a GitHub Actions workflow that automatically builds, tests, and deploys your Next.js application when you push to the main branch. The workflow is defined in `.github/workflows/ci-cd.yml`.

### How It Works

1. **Build and Test**: Runs on every push to main and on pull requests
   - Checks out the code
   - Sets up Node.js 20 (optimized for Next.js)
   - Installs dependencies
   - Runs linting
   - Runs email template tests
   - Builds the Next.js application

2. **Deploy**: Only runs on pushes to main, after the build and test job succeeds
   - Checks out the code
   - Deploys directly to Vercel using their official CLI

## Required Secrets

You need to add the following secrets to your GitHub repository:

### Environment Variables
- `RESEND_API_KEY`: Your Resend API key for sending emails
- `EMAIL_RECIPIENT`: The email address that will receive form submissions

### Vercel Deployment
- `VERCEL_TOKEN`: Your Vercel API token
- `VERCEL_ORG_ID`: Your Vercel organization ID
- `VERCEL_PROJECT_ID`: Your Vercel project ID

## Setting Up Secrets in GitHub

1. Go to your GitHub repository
2. Click on "Settings"
3. In the left sidebar, click on "Secrets and variables" > "Actions"
4. Click "New repository secret"
5. Add each of the required secrets listed above

## Getting Vercel Deployment Information

To get your Vercel deployment information:

1. **Vercel Token**:
   - Go to https://vercel.com/account/tokens
   - Create a new token with a descriptive name
   - Copy the token and add it as the `VERCEL_TOKEN` secret

2. **Vercel Organization ID and Project ID**:
   - Run `npx vercel link` in your project directory
   - This will link your project to Vercel and output the org and project IDs
   - Alternatively, you can find these IDs in the project settings on the Vercel dashboard

## Manual Deployment

If you prefer to deploy manually:

1. Install the Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy to Vercel:
   ```bash
   vercel --prod
   ```

## Pre-Deployment Checklist

Before deploying to production, ensure:

1. All environment variables are set up in Vercel:
   - `RESEND_API_KEY`
   - `EMAIL_RECIPIENT`

2. Email functionality has been tested:
   - Contact form submissions work
   - Career form submissions with attachments work

3. All pages render correctly:
   - Check responsive design on mobile devices
   - Verify all links work
   - Ensure images are loading properly

## Troubleshooting

### GitHub Actions Failures

- Check the GitHub Actions logs for detailed error information
- Common issues include:
  - Missing environment variables
  - Failed tests
  - Build errors

### Vercel Deployment Issues

- Verify your Vercel secrets are correct
- Check that your project is properly linked to Vercel
- Ensure your Next.js application is compatible with Vercel deployment

### Email Sending Problems

- Verify your Resend API key is valid
- Check that the recipient email is correctly configured
- Ensure your email templates are properly formatted

## Monitoring

After deployment:

1. Monitor your application for any errors
2. Check that form submissions are being received
3. Verify that all features are working as expected

## Rollback Procedure

If you need to roll back to a previous version:

1. In the Vercel dashboard, go to your project
2. Navigate to the "Deployments" tab
3. Find the previous working deployment
4. Click the three dots menu and select "Promote to Production"
