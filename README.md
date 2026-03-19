# Brinqo Design Agency Website

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/brinqo-design-agency)
[![License](https://img.shields.io/badge/license-Proprietary-blue.svg)](LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org/)

Professional digital marketing agency website built with React, TypeScript, and Vite. Featuring comprehensive SEO optimization, structured data, and modern web technologies.

## 🚀 Quick Deploy to Vercel

This project is ready for instant deployment to Vercel with zero configuration!

```bash
# Check if ready for deployment
npm run deploy:check

# Deploy to Vercel
npm run deploy
```

**Or use the Vercel Dashboard:**
1. Push code to GitHub/GitLab/Bitbucket
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your repository
4. Click "Deploy" - Done! ✨

📖 **See [VERCEL_QUICKSTART.md](VERCEL_QUICKSTART.md) for 5-minute deployment guide**
📖 **See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions**

---

## About Brinqo

Brinqo is a USA-based digital marketing agency specializing in:
- UI/UX Design Services
- Graphic Design
- Web Design & Development
- Motion Graphics
- AI-Powered Brand Audit

## Features

- **SEO Optimized**: Comprehensive meta tags, Open Graph, Twitter Cards, and JSON-LD structured data
- **Performance**: Optimized for Core Web Vitals with 90+ Lighthouse SEO score
- **Accessibility**: WCAG 2.1 AA compliant with semantic HTML and ARIA labels
- **PWA Ready**: Progressive Web App with manifest.json and service worker support
- **Analytics**: Integrated Google Analytics 4, Google Tag Manager, and Facebook Pixel
- **Mobile First**: Fully responsive design optimized for all devices

## Tech Stack

- **Frontend**: React 19, TypeScript
- **Build Tool**: Vite 6.2
- **Styling**: Tailwind CSS 4.x
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Testing**: Vitest, @testing-library/react, fast-check (property-based testing)

## Local Development

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

4. Open http://localhost:3000 in your browser

### Available Scripts

- `npm run dev` – Start development server on port 3000
- `npm run build` – Build production assets
- `npm run preview` – Preview production build
- `npm run lint` – Type-check with TypeScript
- `npm run test` – Run unit tests
- `npm run test:ui` – Run tests with UI
- `npm run clean` – Remove dist directory

## SEO Configuration

### Meta Tags
The website includes comprehensive SEO meta tags in `index.html`:
- Title, description, keywords
- Open Graph tags for social media sharing
- Twitter Card tags
- Mobile optimization tags
- Canonical URLs and hreflang

### Structured Data
JSON-LD structured data for:
- Organization (contact info, social profiles)
- LocalBusiness (location, price range)
- Services (UI/UX, Graphic Design, Web Design, Motion Graphics, Brand Audit)
- WebSite (with search action)
- BreadcrumbList (navigation hierarchy)

### Sitemap & Robots
- `public/sitemap.xml` – XML sitemap for search engines
- `public/robots.txt` – Crawler directives
- Submit sitemap to Google Search Console after deployment

## Analytics Setup

The website includes placeholder IDs for analytics services. Replace these with your actual IDs:

### Google Analytics 4
In `index.html`, replace `GA_MEASUREMENT_ID` with your Google Analytics 4 Measurement ID.

### Google Tag Manager
In `index.html`, replace `GTM-XXXXXXX` with your Google Tag Manager ID (appears in 2 places: head and body).

### Facebook Pixel
In `index.html`, replace `YOUR_PIXEL_ID` with your Facebook Pixel ID (appears in 2 places).

## Deployment

### Deploy to Vercel (Recommended)

This project is optimized for Vercel deployment with zero configuration.

#### Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/brinqo-design-agency)

#### Manual Deploy

1. Push your code to GitHub/GitLab/Bitbucket
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your repository
4. Vercel auto-detects Vite configuration
5. Click "Deploy"

**See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.**

### Build for Production

```bash
npm run build
```

This creates optimized production files in the `dist` directory.

### Deployment Checklist

1. **Update URLs**: Replace `https://brinqo.com` with your actual domain in:
   - `index.html` (canonical URLs, Open Graph, structured data)
   - `public/sitemap.xml`
   - `public/robots.txt`

2. **Configure Analytics**: Replace placeholder IDs with actual analytics IDs

3. **Add Favicon Files**: Ensure all favicon files exist in `public/`:
   - favicon.ico (32x32px)
   - favicon.svg
   - apple-touch-icon.png (180x180px)
   - favicon-16x16.png
   - favicon-32x32.png
   - icon-192x192.png
   - icon-512x512.png

4. **Add OG Image**: Create and add `public/og-image.jpg` (1200x630px) for social media sharing

5. **Submit Sitemap**: After deployment, submit `sitemap.xml` to:
   - Google Search Console
   - Bing Webmaster Tools

6. **Verify SEO**: Run Lighthouse audit and verify 90+ SEO score

## Project Structure

```
brinqo-design-agency/
├── public/
│   ├── sitemap.xml
│   ├── robots.txt
│   ├── manifest.json
│   └── [favicon files]
├── src/
│   ├── components/
│   │   ├── AIChat.tsx
│   │   ├── BrandAudit.tsx
│   │   ├── Projects.tsx
│   │   └── ui/
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.ts
└── README.md
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Lighthouse SEO Score: 90+
- Core Web Vitals optimized
- Lazy loading for images
- Code splitting and tree shaking
- Preconnect and DNS prefetch for external resources

## Accessibility

- WCAG 2.1 AA compliant
- Semantic HTML5 structure
- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatible
- Color contrast ratios meet standards

## License

Copyright © 2025 Brinqo Design Agency. All rights reserved.

## Contact

- **Phone**: (508) 446-2526
- **Email**: mail@brinqo.com
- **Website**: https://brinqo.com

---

Built with ❤️ by Brinqo Design Agency

