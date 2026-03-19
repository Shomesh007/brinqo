#!/usr/bin/env node

/**
 * Deployment Preparation Script
 * Checks if all required files and configurations are ready for deployment
 */

const fs = require('fs');
const path = require('path');

const REQUIRED_FILES = [
  'public/sitemap.xml',
  'public/robots.txt',
  'public/manifest.json',
  'index.html',
  'package.json',
  'vercel.json'
];

const OPTIONAL_FILES = [
  'public/favicon.ico',
  'public/favicon.svg',
  'public/apple-touch-icon.png',
  'public/favicon-16x16.png',
  'public/favicon-32x32.png',
  'public/icon-192x192.png',
  'public/icon-512x512.png',
  'public/og-image.jpg'
];

console.log('🔍 Checking deployment readiness...\n');

let hasErrors = false;
let hasWarnings = false;

// Check required files
console.log('📋 Required Files:');
REQUIRED_FILES.forEach(file => {
  const exists = fs.existsSync(path.join(process.cwd(), file));
  if (exists) {
    console.log(`  ✅ ${file}`);
  } else {
    console.log(`  ❌ ${file} - MISSING`);
    hasErrors = true;
  }
});

// Check optional files
console.log('\n📋 Optional Files (Recommended):');
OPTIONAL_FILES.forEach(file => {
  const exists = fs.existsSync(path.join(process.cwd(), file));
  if (exists) {
    console.log(`  ✅ ${file}`);
  } else {
    console.log(`  ⚠️  ${file} - Missing (recommended for production)`);
    hasWarnings = true;
  }
});

// Check for placeholder IDs in index.html
console.log('\n🔍 Checking for placeholder IDs in index.html:');
const indexHtml = fs.readFileSync(path.join(process.cwd(), 'index.html'), 'utf-8');

const placeholders = [
  { id: 'GA_MEASUREMENT_ID', name: 'Google Analytics' },
  { id: 'GTM-XXXXXXX', name: 'Google Tag Manager' },
  { id: 'YOUR_PIXEL_ID', name: 'Facebook Pixel' }
];

placeholders.forEach(({ id, name }) => {
  if (indexHtml.includes(id)) {
    console.log(`  ⚠️  ${name} - Still using placeholder ID: ${id}`);
    hasWarnings = true;
  } else {
    console.log(`  ✅ ${name} - ID updated`);
  }
});

// Check for brinqo.com domain
console.log('\n🌐 Checking domain configuration:');
const filesToCheck = ['index.html', 'public/sitemap.xml', 'public/robots.txt'];
let usingDefaultDomain = false;

filesToCheck.forEach(file => {
  const filePath = path.join(process.cwd(), file);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf-8');
    if (content.includes('brinqo.com') || content.includes('https://brinqo.com')) {
      console.log(`  ⚠️  ${file} - Still using default domain (brinqo.com)`);
      usingDefaultDomain = true;
    }
  }
});

if (!usingDefaultDomain) {
  console.log('  ✅ Domain configuration updated');
}

// Summary
console.log('\n' + '='.repeat(50));
if (hasErrors) {
  console.log('❌ DEPLOYMENT NOT READY - Fix errors above');
  process.exit(1);
} else if (hasWarnings) {
  console.log('⚠️  DEPLOYMENT READY WITH WARNINGS');
  console.log('   Consider addressing warnings before production deployment');
  process.exit(0);
} else {
  console.log('✅ DEPLOYMENT READY!');
  console.log('   Run: vercel --prod');
  process.exit(0);
}
