# Vercel Deployment - Quick Start

Deploy your Brinqo Design Agency website to Vercel in 5 minutes.

## Step 1: Prepare Your Code

```bash
# Check deployment readiness
npm run deploy:check

# If you see warnings, address them (optional for initial deploy)
# If you see errors, fix them before proceeding
```

## Step 2: Push to Git

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Ready for Vercel"

# Add remote (replace with your repository URL)
git remote add origin https://github.com/yourusername/brinqo-design-agency.git

# Push
git push -u origin main
```

## Step 3: Deploy to Vercel

### Option A: Via Dashboard (Easiest)

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click "Import Project"
3. Select your Git provider (GitHub/GitLab/Bitbucket)
4. Select your repository
5. Click "Deploy" (Vercel auto-detects everything!)

### Option B: Via CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

## Step 4: Get Your URL

After deployment completes, you'll get:
- **Production URL**: `your-project.vercel.app`
- **Preview URLs**: For each branch/PR

## Step 5: Add Custom Domain (Optional)

1. Go to your project in Vercel Dashboard
2. Click **Settings** > **Domains**
3. Add your domain (e.g., `brinqo.com`)
4. Follow DNS instructions
5. Wait for DNS propagation (5-60 minutes)

## Step 6: Update URLs (Important!)

After adding custom domain, update these files:

### index.html
Replace `https://brinqo.com` with your actual domain in:
- Canonical URL
- Open Graph URLs
- Structured data URLs

### public/sitemap.xml
Replace all `https://brinqo.com` URLs

### public/robots.txt
Replace sitemap URL

Then commit and push:
```bash
git add .
git commit -m "Update URLs to production domain"
git push
```

Vercel will automatically redeploy!

## Step 7: Configure Analytics (Optional)

Replace placeholder IDs in `index.html`:

1. **Google Analytics**: Replace `GA_MEASUREMENT_ID`
2. **Google Tag Manager**: Replace `GTM-XXXXXXX` (2 places)
3. **Facebook Pixel**: Replace `YOUR_PIXEL_ID` (2 places)

Commit and push to deploy changes.

## Step 8: Submit Sitemap

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add your property
3. Submit sitemap: `https://yourdomain.com/sitemap.xml`

## That's It! 🎉

Your website is now live on Vercel with:
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Automatic deployments on git push
- ✅ Preview deployments for PRs
- ✅ 99.99% uptime SLA

## Useful Commands

```bash
# Check deployment readiness
npm run deploy:check

# Deploy to production
npm run deploy

# View deployment logs
vercel logs

# List all deployments
vercel ls

# Open project in browser
vercel open
```

## Troubleshooting

**Build fails?**
- Run `npm run build` locally to test
- Check build logs in Vercel dashboard

**404 errors?**
- Verify `vercel.json` exists
- Check rewrites configuration

**Slow performance?**
- Run Lighthouse audit
- Enable Vercel Speed Insights

## Next Steps

- [ ] Add favicon files to `public/`
- [ ] Create `og-image.jpg` for social sharing
- [ ] Replace analytics placeholder IDs
- [ ] Update domain URLs
- [ ] Submit sitemap to search engines
- [ ] Enable Vercel Speed Insights
- [ ] Set up monitoring alerts

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Community](https://github.com/vercel/vercel/discussions)
- [Full Deployment Guide](DEPLOYMENT.md)

---

**Need help?** Check [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.
