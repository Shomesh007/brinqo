# Deployment Checklist

Use this checklist to ensure your Brinqo Design Agency website is ready for production deployment.

## Pre-Deployment

### Code Preparation
- [ ] All code committed to Git
- [ ] No console.log or debug code in production
- [ ] All TypeScript errors resolved (`npm run lint`)
- [ ] All tests passing (`npm run test`)
- [ ] Build succeeds locally (`npm run build`)
- [ ] Preview build works (`npm run preview`)

### Configuration Files
- [ ] `vercel.json` exists and configured
- [ ] `.vercelignore` exists
- [ ] `.gitignore` updated
- [ ] `package.json` has correct name and description
- [ ] `README.md` updated with project info

### SEO Files
- [ ] `public/sitemap.xml` created
- [ ] `public/robots.txt` created
- [ ] `public/manifest.json` created
- [ ] `index.html` has all meta tags
- [ ] Structured data (JSON-LD) added to `index.html`

### Assets
- [ ] `public/favicon.ico` added (32x32px)
- [ ] `public/favicon.svg` added
- [ ] `public/apple-touch-icon.png` added (180x180px)
- [ ] `public/favicon-16x16.png` added
- [ ] `public/favicon-32x32.png` added
- [ ] `public/icon-192x192.png` added
- [ ] `public/icon-512x512.png` added
- [ ] `public/og-image.jpg` added (1200x630px)
- [ ] All images optimized (WebP format recommended)
- [ ] All images have alt text

## Deployment

### Git Repository
- [ ] Code pushed to GitHub/GitLab/Bitbucket
- [ ] Repository is public or Vercel has access
- [ ] Main branch is up to date

### Vercel Setup
- [ ] Vercel account created
- [ ] Project imported to Vercel
- [ ] Build settings verified (auto-detected)
- [ ] First deployment successful
- [ ] Production URL works

### Custom Domain (Optional)
- [ ] Custom domain added in Vercel
- [ ] DNS records configured
- [ ] SSL certificate issued (automatic)
- [ ] Domain propagation complete
- [ ] HTTPS working

## Post-Deployment

### URL Updates
- [ ] Update `index.html` canonical URLs
- [ ] Update `index.html` Open Graph URLs
- [ ] Update `index.html` structured data URLs
- [ ] Update `public/sitemap.xml` URLs
- [ ] Update `public/robots.txt` sitemap URL
- [ ] Commit and push URL changes

### Analytics Configuration
- [ ] Google Analytics 4 ID added (replace `GA_MEASUREMENT_ID`)
- [ ] Google Tag Manager ID added (replace `GTM-XXXXXXX`)
- [ ] Facebook Pixel ID added (replace `YOUR_PIXEL_ID`)
- [ ] Analytics tracking verified in browser dev tools
- [ ] Test events firing correctly

### SEO Submission
- [ ] Google Search Console property added
- [ ] Sitemap submitted to Google Search Console
- [ ] Bing Webmaster Tools property added
- [ ] Sitemap submitted to Bing Webmaster Tools
- [ ] Robots.txt accessible and correct

### Testing

#### Functionality
- [ ] Homepage loads correctly
- [ ] All navigation links work
- [ ] Brand Audit page works
- [ ] Projects page works
- [ ] Contact form works (if applicable)
- [ ] Mobile navigation works
- [ ] All interactive elements work

#### Performance
- [ ] Lighthouse Performance score: 90+ (target)
- [ ] Lighthouse SEO score: 90+ (target)
- [ ] Lighthouse Accessibility score: 95+ (target)
- [ ] Lighthouse Best Practices score: 90+ (target)
- [ ] Core Web Vitals passing
- [ ] Page load time < 3 seconds

#### SEO
- [ ] Meta title displays correctly
- [ ] Meta description displays correctly
- [ ] Open Graph tags work (test with Facebook Debugger)
- [ ] Twitter Cards work (test with Twitter Card Validator)
- [ ] Structured data valid (test with Google Rich Results Test)
- [ ] Sitemap accessible: `/sitemap.xml`
- [ ] Robots.txt accessible: `/robots.txt`
- [ ] Canonical URLs correct

#### Cross-Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

#### Responsive Testing
- [ ] Mobile (320px - 480px)
- [ ] Tablet (481px - 768px)
- [ ] Desktop (769px - 1024px)
- [ ] Large Desktop (1025px+)

#### Accessibility
- [ ] Keyboard navigation works
- [ ] Screen reader compatible (test with NVDA/JAWS)
- [ ] Color contrast meets WCAG 2.1 AA
- [ ] Focus indicators visible
- [ ] All images have alt text
- [ ] Forms have labels
- [ ] ARIA labels present where needed

### Monitoring Setup
- [ ] Vercel Analytics enabled
- [ ] Vercel Speed Insights enabled
- [ ] Error tracking configured (optional)
- [ ] Uptime monitoring configured (optional)

### Social Media
- [ ] Test Facebook sharing
- [ ] Test Twitter sharing
- [ ] Test LinkedIn sharing
- [ ] OG image displays correctly
- [ ] Title and description correct

### Security
- [ ] HTTPS enabled (automatic with Vercel)
- [ ] Security headers configured (in `vercel.json`)
- [ ] No sensitive data exposed
- [ ] Environment variables secured
- [ ] API keys not in client code

## Launch

### Final Checks
- [ ] All checklist items above completed
- [ ] Stakeholders reviewed and approved
- [ ] Backup of current site (if replacing existing)
- [ ] DNS TTL reduced (if switching domains)
- [ ] Rollback plan documented

### Go Live
- [ ] DNS switched to Vercel (if custom domain)
- [ ] Old site redirects configured (if applicable)
- [ ] Announcement prepared
- [ ] Social media posts scheduled

### Post-Launch
- [ ] Monitor analytics for first 24 hours
- [ ] Check error logs
- [ ] Verify all functionality
- [ ] Respond to user feedback
- [ ] Document any issues

## Maintenance

### Regular Tasks
- [ ] Monitor Vercel Analytics weekly
- [ ] Check Speed Insights monthly
- [ ] Review Search Console monthly
- [ ] Update dependencies quarterly
- [ ] Run security audits quarterly
- [ ] Backup database/content monthly (if applicable)

### Updates
- [ ] Keep Node.js updated
- [ ] Keep npm packages updated
- [ ] Keep Vercel CLI updated
- [ ] Review and update content regularly
- [ ] Update copyright year annually

---

## Quick Commands

```bash
# Check deployment readiness
npm run deploy:check

# Build and test locally
npm run build && npm run preview

# Deploy to Vercel
npm run deploy

# Run all tests
npm run test

# Type check
npm run lint
```

## Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Google Search Console](https://search.google.com/search-console)
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)

---

**Last Updated**: 2025-03-19
