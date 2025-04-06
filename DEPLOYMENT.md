# 🌐 Deploying the Resume Builder (100% Free)

## Option 1: Deploy to Vercel (Recommended)

Vercel offers completely free hosting for personal projects with generous limits:

1. **Fork this project to your GitHub account**
2. **Sign up for a free Vercel account at [vercel.com](https://vercel.com)**
3. **Import your GitHub repository**:
   - From the Vercel dashboard, click "Add New..." and select "Project"
   - Connect to your GitHub account and select the forked repository
   - Keep the default settings and click "Deploy"
   - Vercel will automatically detect the project configuration

Vercel provides:
- Completely free hosting for personal projects
- Custom domain support
- Automatic HTTPS
- Continuous deployment from GitHub

## Option 2: Deploy to Render (Alternative)

Render also offers a generous free tier:

1. **Create a GitHub repository with this project**
2. **Sign up for a free Render account at [render.com](https://render.com)**
3. **Set up a Web Service**:
   - From the dashboard, click "New" and select "Web Service"
   - Connect your repository
   - Name your service
   - Select "Node" as the environment
   - Set the build command: `npm install --include=dev && npm run build`
   - Set the start command: `npm run start`
   - Select the free plan
   - Click "Create Web Service"

**Important Notes for Render Deployment:**
- Make sure to use `npm install --include=dev` to include development dependencies, as they're needed for the build process
- If you encounter errors, check the build logs and make sure all dependencies are installed
- The application requires puppeteer for PDF generation, which should be included in your package.json

Render provides:
- Completely free hosting for static sites and small services
- Automatic HTTPS
- Continuous deployment from GitHub

## Option 3: Deploy to Netlify (Another Free Option)

Netlify is another excellent platform with a free tier:

1. **Push your code to GitHub**
2. **Sign up for a free Netlify account at [netlify.com](https://netlify.com)**
3. **Import your project**:
   - Click "Add new site" and select "Import an existing project"
   - Connect to GitHub and select your repository
   - Configure build settings:
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Click "Deploy site"

Netlify provides:
- Generous free tier with no credit card required
- Continuous deployment
- Custom domains with free HTTPS
- Form handling and serverless functions
