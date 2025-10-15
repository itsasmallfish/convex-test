# Task Manager App

A full-stack real-time task management application built with Next.js, Convex, and GitHub OAuth authentication.

## Features

- ✅ **Real-time task management** - Add, edit, delete, and toggle tasks
- ✅ **GitHub OAuth authentication** - Secure sign-in with GitHub
- ✅ **User isolation** - Each user sees only their own tasks
- ✅ **Modern UI** - Built with shadcn/ui components
- ✅ **Responsive design** - Works on all screen sizes
- ✅ **Real-time updates** - Changes sync instantly across devices

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Backend**: Convex (real-time database and API)
- **Authentication**: GitHub OAuth via Convex Auth
- **UI**: shadcn/ui components with Tailwind CSS
- **Package Manager**: pnpm

## Prerequisites

Before you begin, ensure you have:

- Node.js 18+ installed
- A GitHub account
- A Convex account (free tier available)

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
git clone <your-repo-url>
cd convex-test
pnpm install
```

### 2. Set Up Convex

#### Create a Convex Project

```bash
npx convex dev
```

This will:
- Create a new Convex project
- Set up your local development environment
- Generate the necessary configuration files

#### Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Convex Configuration
NEXT_PUBLIC_CONVEX_URL=https://your-deployment-url.convex.cloud
CONVEX_DEPLOYMENT=your-deployment-name
```

### 3. Set Up GitHub OAuth

#### Create a GitHub OAuth App

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Fill in the details:
   - **Application name**: Task Manager (or your preferred name)
   - **Homepage URL**: `http://localhost:3000` (for development)
   - **Authorization callback URL**: `http://localhost:3000` (for development)
4. Click "Register application"
5. Copy the **Client ID** and generate a **Client Secret**

> **Note**: For development, localhost URLs are allowed. For production, you'll need to update these URLs to your actual domain with HTTPS.

#### Configure GitHub OAuth in Convex

```bash
npx @convex-dev/auth --prod
```

This will:
- Set up authentication configuration
- Configure JWT keys
- Set up the auth endpoints

#### Add GitHub Credentials to Environment

Add your GitHub OAuth credentials to `.env.local`:

```bash
# GitHub OAuth Configuration
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

### 4. Deploy Convex Functions

```bash
npx convex deploy
```

This deploys your Convex functions to the cloud.

### 5. Start Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see your app!

## Key Features Explained

### Authentication Flow

1. **Unauthenticated State**: Shows sign-in button and welcome message
2. **Loading State**: Shows spinner while checking authentication
3. **Authenticated State**: Shows full task management interface

### Real-time Updates

- Tasks sync instantly across all devices
- No manual refresh needed
- Optimistic updates for better UX

### User Isolation

- Each user only sees their own tasks
- Secure data access with Convex Auth
- Automatic user identification

## Deployment

### Deploy to Production

1. **Update GitHub OAuth App**:
   - Go to your OAuth app settings in GitHub
   - Change **Homepage URL** to your production domain (e.g., `https://your-app.vercel.app`)
   - Change **Authorization callback URL** to your production domain (e.g., `https://your-app.vercel.app`)
   - **Important**: Production requires HTTPS URLs

2. **Update Environment Variables**:
   ```bash
   NEXT_PUBLIC_CONVEX_URL=https://your-production-deployment.convex.cloud
   ```

3. **Deploy to Vercel** (recommended):
   ```bash
   npx vercel
   ```

4. **Set Production Environment Variables**:
   In your Vercel dashboard, add these environment variables:
   - `NEXT_PUBLIC_CONVEX_URL`
   - `GITHUB_CLIENT_ID` 
   - `GITHUB_CLIENT_SECRET`

### Environment Variables for Production

Make sure to set these in your deployment platform:

- `NEXT_PUBLIC_CONVEX_URL`
- `GITHUB_CLIENT_ID`
- `GITHUB_CLIENT_SECRET`

## Troubleshooting

### Common Issues

1. **"Not authenticated" errors**:
   - Check GitHub OAuth configuration
   - Verify environment variables are set
   - Ensure Convex Auth is properly configured

2. **Schema validation errors**:
   - Run `npx convex deploy` to update schema
   - Check for old data that doesn't match new schema

3. **GitHub OAuth not working**:
   - Verify callback URL matches your app URL
   - Check GitHub OAuth app settings
   - Ensure environment variables are correct

### Getting Help

- [Convex Documentation](https://docs.convex.dev/)
- [Convex Auth Documentation](https://docs.convex.dev/auth)
- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/)

## License

MIT License - feel free to use this project as a starting point for your own applications!

