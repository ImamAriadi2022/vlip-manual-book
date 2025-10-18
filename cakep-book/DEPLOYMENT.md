# 🚀 Deployment Guide - Vercel

Panduan lengkap untuk deploy aplikasi Manual Book ke Vercel.

## Prerequisites

- Akun Vercel (gratis) - [Sign up](https://vercel.com/signup)
- Git installed
- Project sudah di-push ke GitHub/GitLab/Bitbucket

## Method 1: Deploy via Vercel Dashboard (Recommended)

### Step 1: Push ke GitHub

```bash
# Initialize git (jika belum)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Manual Book App"

# Add remote (ganti dengan URL repository Anda)
git remote add origin https://github.com/username/repo-name.git

# Push to GitHub
git push -u origin main
```

### Step 2: Import ke Vercel

1. Buka [vercel.com/new](https://vercel.com/new)
2. Login dengan akun GitHub/GitLab/Bitbucket
3. Click **"Import Project"**
4. Select repository **"cakep-book"**
5. Vercel akan auto-detect Vite configuration

### Step 3: Configure Project

Vercel akan otomatis set:
- **Framework Preset:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

**Tidak perlu ubah apapun!** Klik **Deploy**.

### Step 4: Wait for Deployment

- Deploy biasanya selesai dalam 1-2 menit
- Anda akan mendapat URL seperti: `your-project.vercel.app`
- Setiap push ke `main` branch akan auto-deploy

## Method 2: Deploy via Vercel CLI

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Login

```bash
vercel login
```

Follow instruksi untuk login via email atau GitHub.

### Step 3: Deploy

```bash
# Preview deployment (test)
vercel

# Production deployment
vercel --prod
```

### Step 4: Follow Prompts

```
? Set up and deploy "~/cakep-book"? [Y/n] y
? Which scope do you want to deploy to? Your Name
? Link to existing project? [y/N] n
? What's your project's name? manual-book
? In which directory is your code located? ./
```

Vercel akan auto-detect settings dan deploy!

## Method 3: GitHub Integration (Auto Deploy)

### Step 1: Connect Repository

1. Push code ke GitHub
2. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
3. Click **"Add New Project"**
4. Click **"Import Git Repository"**
5. Select your repository

### Step 2: Configure & Deploy

- Vercel auto-configures Vite projects
- Click **"Deploy"**
- Done! ✨

### Step 3: Enable Auto Deploy

By default, setiap push ke `main` branch akan trigger deployment.

**Branches:**
- `main` → Production deployment
- Other branches → Preview deployments

## Custom Domain

### Add Custom Domain

1. Go to Project Settings
2. Click **"Domains"**
3. Add your domain (e.g., `manual-book.com`)
4. Follow DNS configuration instructions

### DNS Configuration

```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

Atau untuk root domain:
```
Type: A
Name: @
Value: 76.76.21.21
```

## Environment Variables

Jika menggunakan env variables:

### Step 1: Create `.env` locally

```env
VITE_API_URL=https://api.example.com
VITE_APP_NAME=Manual Book
```

**Important:** Prefix harus `VITE_` untuk Vite apps!

### Step 2: Add to Vercel

1. Go to Project Settings
2. Click **"Environment Variables"**
3. Add each variable:
   - Key: `VITE_API_URL`
   - Value: `https://api.example.com`
   - Scope: Production / Preview / Development

### Step 3: Redeploy

```bash
vercel --prod
```

## Performance Optimization

### 1. Image Optimization

```bash
# Install image optimization tools
npm install --save-dev vite-plugin-image-optimizer
```

Update `vite.config.js`:
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer({
      png: { quality: 80 },
      jpeg: { quality: 80 },
      jpg: { quality: 80 },
    })
  ],
})
```

### 2. Enable Compression

Vercel automatically enables:
- Gzip compression
- Brotli compression
- Edge caching

### 3. Analytics

Enable Vercel Analytics:
1. Go to Project → Analytics
2. Enable Analytics (free)
3. View real-time performance metrics

## Troubleshooting

### Build Fails

**Error:** `Module not found: react-pageflip`

**Fix:**
```bash
npm install react-pageflip
git add package.json package-lock.json
git commit -m "Add react-pageflip dependency"
git push
```

### Images Not Loading

**Error:** 404 on `/manuals/page1.png`

**Fix:**
- Ensure images are in `public/manuals/` folder
- Check naming: `page1.png` (lowercase, no spaces)
- Commit and push images:
```bash
git add public/manuals/
git commit -m "Add manual images"
git push
```

### Deployment Stuck

**Fix:**
- Check [Vercel Status](https://www.vercel-status.com/)
- Cancel and retry deployment
- Check build logs in Vercel Dashboard

### 404 on Routes

**Fix:**
Already handled by `vercel.json`:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

## Post-Deployment Checklist

- [ ] Test all pages flip correctly
- [ ] Check responsive design on mobile
- [ ] Verify all images load
- [ ] Test navigation buttons
- [ ] Check performance with Lighthouse
- [ ] Add custom domain (optional)
- [ ] Enable analytics (optional)
- [ ] Set up monitoring (optional)

## Continuous Deployment

### Auto Deploy on Push

Already enabled by default! Just:
```bash
git add .
git commit -m "Update manual pages"
git push
```

Vercel will automatically:
1. Detect push
2. Build project
3. Deploy to production
4. Notify you via email

### Preview Deployments

Every PR gets a preview URL:
- Create branch: `git checkout -b feature/new-pages`
- Make changes
- Push: `git push origin feature/new-pages`
- Create PR on GitHub
- Vercel creates preview URL automatically

## Monitoring & Analytics

### Vercel Analytics

```bash
npm install @vercel/analytics
```

Update `main.jsx`:
```javascript
import { Analytics } from '@vercel/analytics/react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <Analytics />
  </React.StrictMode>,
)
```

### Error Monitoring

Integrate with:
- Sentry
- LogRocket
- Datadog

## Rollback

### Via Dashboard

1. Go to Deployments
2. Find previous successful deployment
3. Click **"Promote to Production"**

### Via CLI

```bash
# List deployments
vercel ls

# Rollback to specific deployment
vercel rollback [deployment-url]
```

## Cost

### Free Tier Includes:

- Unlimited deployments
- 100 GB bandwidth/month
- Automatic HTTPS
- Global CDN
- Preview deployments
- Custom domains

### When to Upgrade:

- Need more bandwidth
- Team collaboration features
- Advanced analytics
- Priority support

## Support

- [Vercel Docs](https://vercel.com/docs)
- [Vercel Discord](https://vercel.com/discord)
- [GitHub Issues](https://github.com/vercel/vercel/issues)

---

**Happy Deploying! 🚀**
