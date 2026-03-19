# Vercel Deployment Guide

This guide will help you deploy the Brinqo Design Agency website to Vercel.

## Prerequisites

- GitHub, GitLab, or Bitbucket account
- Vercel account (free tier available at [vercel.com](https://vercel.com))
- Your repository pushed to your Git provider

## Quick Deploy

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to Git**
   ```bash
   git add .
   git commit -m "Ready for Vercel deployment"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Click "Import Project"
   - Select your Git provider and repository
   - Vercel will auto-detect Vite configuration

3. **Configure Project**
   - **Framework Preset**: Vite (auto-detected)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `dist` (auto-detected)
   - **Install Command**: `npm install` (auto-detected)

4. **Click "Deploy"**
   - Vercel will build and deploy your site
   - You'll get a production URL like `your-project.vercel.app`

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Deploy to Production**
   ```bash
   vercel --prod
   ```

## Post-Deployment Configuration

### 1. Custom Domain Setup

1. Go to your project in Vercel Dashboard
2. Navigate to **Settings** > **Domains**
3. Add your custom domain (e.g., `brinqo.com`)
4. Follow DNS configuration instructions
5. Update URLs in your code:
   - `index.html` (canonical URLs, Open Graph, structured data)
   - `public/sitemap.xml`
   - `public/robots.txt`

### 2. Environment Variables (Optional)

If you need environment variables:

1. Go to **Settings** > **Environment Variables**
2. Add variables:
   - `VITE_APP_URL` = `https://yourdomain.com`
   - `VITE_GA_MEASUREMENT_ID` = Your Google Analytics ID (optional)
   - `VITE_GTM_ID` = Your Google Tag Manager ID (optional)
   - `VITE_FB_PIXEL_ID` = Your Facebook Pixel ID (optional)

**Note**: Currently, analytics IDs are hardcoded in `index.html`. You can either:
- Keep them as placeholders and replace manually
- Or refactor to use environment variables

### 3. Analytics Setup

Replace placeholder IDs in `index.html`:

1. **Google Analytics 4**
   - Find: `GA_MEASUREMENT_ID`
   - Replace with: Your actual GA4 Measurement ID (e.g., `G-XXXXXXXXXX`)

2. **Google Tag Manager**
   - Find: `GTM-XXXXXXX` (appears in 2 places)
   - Replace with: Your actual GTM ID

3. **Facebook Pixel**
   - Find: `YOUR_PIXEL_ID` (appears in 2 places)
   - Replace with: Your actual Pixel ID

After updating, commit and push:
```bash
git add index.html
git commit -m "Update analytics IDs"
git push
```

Vercel will automatically redeploy.

### 4. SEO Configuration

1. **Update Sitemap**
   - Edit `public/sitemap.xml`
   - Replace `https://brinqo.com` with your actual domain
   - Commit and push

2. **Update Robots.txt**
   - Edit `public/robots.txt`
   - Replace `https://brinqo.com/sitemap.xml` with your actual domain
   - Commit and push

3. **Submit Sitemap**
   - Go to [Google Search Console](https://search.google.com/search-console)
   - Add your property (domain)
   - Submit sitemap: `https://yourdomain.com/sitemap.xml`
   - Go to [Bing Webmaster Tools](https://www.bing.com/webmasters)
   - Submit sitemap there as well

### 5. Add Favicon Files

Create and add these files to `public/` directory:

- `favicon.ico` (32x32px)
- `favicon.svg` (vector format)
- `apple-touch-icon.png` (180x180px)
- `favicon-16x16.png`
- `favicon-32x32.png`
- `icon-192x192.png`
- `icon-512x512.png`
- `og-image.jpg` (1200x630px for social media)

Commit and push:
```bash
git add public/
git commit -m "Add favicon and OG image"
git push
```

## Vercel Configuration

The project includes `vercel.json` with:

- **SPA Routing**: All routes redirect to `index.html` for client-side routing
- **Security Headers**: X-Content-Type-Options, X-Frame-Options, X-XSS-Protection
- **Cache Headers**: Optimized caching for static assets
- **Content-Type Headers**: Proper MIME types for sitemap.xml and robots.txt

## Automatic Deployments

Vercel automatically deploys:

- **Production**: Every push to `main` branch
- **Preview**: Every push to other branches or pull requests

Each deployment gets a unique URL for testing.

## Performance Optimization

Vercel automatically provides:

- ✅ Global CDN
- ✅ Automatic HTTPS
- ✅ HTTP/2 and HTTP/3
- ✅ Brotli compression
- ✅ Image optimization (if using Vercel Image)
- ✅ Edge caching
- ✅ DDoS protection

## Monitoring

1. **Analytics**
   - Go to your project dashboard
   - View **Analytics** tab for traffic insights

2. **Speed Insights**
   - Enable **Speed Insights** in project settings
   - Monitor Core Web Vitals

3. **Logs**
   - View deployment logs in **Deployments** tab
   - Check runtime logs in **Logs** tab

## Troubleshooting

### Build Fails

1. Check build logs in Vercel dashboard
2. Ensure `package.json` has correct dependencies
3. Test build locally: `npm run build`

### 404 Errors

- Verify `vercel.json` has correct rewrites configuration
- Check that `dist` directory is being generated

### Slow Performance

1. Run Lighthouse audit
2. Check **Speed Insights** in Vercel
3. Optimize images (use WebP format)
4. Enable Vercel Image Optimization

### SEO Issues

1. Verify meta tags in deployed site
2. Test with [Google Rich Results Test](https://search.google.com/test/rich-results)
3. Check sitemap is accessible: `https://yourdomain.com/sitemap.xml`
4. Verify robots.txt: `https://yourdomain.com/robots.txt`

## Rollback

If you need to rollback to a previous deployment:

1. Go to **Deployments** tab
2. Find the working deployment
3. Click **⋯** menu > **Promote to Production**

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Documentation](https://vitejs.dev/)
- [Vercel Community](https://github.com/vercel/vercel/discussions)

## Deployment Checklist

Before going live:

- [ ] Push code to Git repository
- [ ] Deploy to Vercel
- [ ] Add custom domain
- [ ] Update all URLs (index.html, sitemap.xml, robots.txt)
- [ ] Replace analytics placeholder IDs
- [ ] Add favicon files
- [ ] Add og-image.jpg for social sharing
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Run Lighthouse audit (target: 90+ SEO score)
- [ ] Test on mobile devices
- [ ] Test social media sharing (Facebook, Twitter, LinkedIn)
- [ ] Verify structured data with Google Rich Results Test
- [ ] Set up Vercel Speed Insights
- [ ] Configure custom 404 page (optional)

---

**Ready to deploy?** Push your code and import to Vercel! 🚀
