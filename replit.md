# Opening Night Live - Marketing Website

## Overview

Opening Night Live is a static marketing website for a restaurant launch service that helps new restaurants create successful opening nights through creator tastings, PR campaigns, and RSVP management. The site is built as a high-performance, zero-dependency static website using pure HTML5, CSS3, and vanilla JavaScript—no frameworks, no build tools, no external libraries.

The website serves as the primary digital presence and lead generation tool, featuring service information, case studies, blog content, and contact forms. It's optimized for speed, accessibility, and SEO, designed to be deployed to any static hosting platform (Netlify, Vercel, GitHub Pages, S3, etc.).

## Recent Changes

**October 2, 2025**: Complete website implementation
- Built all 7 HTML pages (index, about, services, case-studies, blog, contact, 404)
- Implemented BEM CSS framework with brand colors and mobile-first responsive design
- Created vanilla JavaScript components (carousel, modal, countdown, forms, navigation)
- Added complete SEO implementation (JSON-LD schema, Open Graph tags, sitemap, robots.txt)
- Integrated royalty-free stock images for all sections
- Set up HTTP server workflow on port 5000
- Created comprehensive documentation in README.md
- Added placeholder documentation for hero video asset (to be added by user)
- Website is production-ready and deployable to any static host

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Static Multi-Page Application (MPA)**
- Pure HTML5, CSS3, and vanilla JavaScript
- No frameworks, bundlers, or build processes required
- Direct file serving from any static host
- Client-side rendering only, no server-side processing needed

**Rationale**: Eliminates all build complexity, maximizes performance, ensures maximum compatibility, and reduces deployment friction. Static files can be deployed anywhere without configuration.

**Page Structure**
- Separate HTML files for each route (index.html, about.html, services.html, case-studies.html, blog.html, contact.html, 404.html)
- Shared header/footer navigation duplicated across pages
- Each page is self-contained with full meta tags and structured data

**CSS Architecture**
- Single stylesheet (`/assets/css/styles.css`) loaded on all pages
- BEM (Block Element Modifier) naming convention
- Mobile-first responsive design with CSS custom properties (variables)
- Accessibility features including reduced-motion media queries

**JavaScript Architecture**
- Single vanilla JS file (`/assets/js/main.js`)
- IIFE (Immediately Invoked Function Expression) pattern for encapsulation
- Feature detection and progressive enhancement
- No external dependencies or libraries

### Design System

**Color Palette** (CSS custom properties):
- Background: `#0E0F14` (dark charcoal)
- Primary accent: `#E73E33` (coral red)
- Secondary accent: `#FFD166` (warm yellow)
- Text: `#F5F7FA` (near white)
- Muted text: `#8A90A2` (gray)

**Typography**:
- Display font: Clash Display (Google Fonts) with Georgia fallback
- Body font: Inter (Google Fonts) with system font stack fallback
- Font loading via Google Fonts CDN with preconnect optimization

**Brand Identity**:
- Dark, high-contrast nightlife aesthetic
- Minimal grain textures and micro-animations
- Professional yet energetic tone

### Performance Optimizations

**Image Strategy**:
- WebP format preferred for photographs
- SVG for favicon and icons
- Lazy loading implemented where appropriate
- Responsive image sizing

**Video Strategy**:
- Hero video: MP4 format, H.264 codec, max 2MB
- Autoplay, loop, muted by default
- Fallback image for reduced-motion preferences and incompatible browsers
- Currently placeholder-based (video asset to be added)

**Loading Optimizations**:
- Preconnect to Google Fonts domains
- Cache control headers set via meta tags
- Minimal HTTP requests
- Inline critical CSS (not yet implemented but architecture supports it)

### Accessibility & SEO

**Accessibility Features**:
- Semantic HTML5 elements (header, nav, main, footer, article, section)
- ARIA labels and roles throughout navigation
- Keyboard navigation support
- Reduced-motion media query support
- Focus management in interactive components

**SEO Implementation**:
- Unique title and meta description per page
- Canonical URLs on all pages
- Open Graph and Twitter Card meta tags
- Structured data (JSON-LD) for organization and FAQ pages
- robots.txt and sitemap.xml files
- Progressive Web App manifest (site.webmanifest)

**Structured Data**:
- Organization schema on homepage
- FAQ schema on services page
- Contact point information included

### Component Patterns

**Navigation Component**:
- Responsive hamburger menu for mobile
- Accessible toggle with aria-expanded states
- Auto-close on outside click or link selection
- Duplicated across all pages (no component framework)

**Forms**:
- Multi-step contact form with validation on contact.html
- Newsletter signup forms with honeypot spam prevention
- Lead magnet form on homepage
- All forms include TODO placeholders for backend integration (Formspree/Netlify/etc.)

**Countdown Timer**:
- Data-driven via `data-launch` attribute on index.html
- JavaScript-powered dynamic countdown
- ISO 8601 date format for launch dates

## External Dependencies

### Third-Party Services

**Google Fonts CDN**:
- Clash Display font family (weights: 400, 600, 700)
- Inter font family (weights: 400, 500, 600, 700)
- Loaded via link tags with preconnect optimization
- **Alternative**: Could be self-hosted for better privacy/performance

**Domain & Email**:
- Domain: openingnightlive.live
- Contact email: hello@openingnightlive.live
- Used in CTAs, schema markup, and footer

### Hosting Requirements

**Static File Hosting**:
- No server-side processing required
- Any static host works (Netlify, Vercel, GitHub Pages, S3, etc.)
- Supports custom domain configuration
- HTTPS required for PWA features and security

**No Database**:
- All content is hardcoded in HTML
- No dynamic data fetching
- Contact forms would require third-party service (Formspree, Netlify Forms, etc.) or serverless function integration

**No Backend API**:
- Purely client-side application
- No authentication or user management
- No server-side rendering

### Asset Dependencies

**Assets Status**:
- ✓ All stock images included in `/assets/img/` directory (9 images total)
- ✓ Favicon.svg and site.webmanifest configured
- ✓ Fallback image for hero video is in place
- ⚠️ `/assets/video/hero.mp4` - User must add their own hero video (see /assets/video/README.md for specifications)
- ⚠️ `/assets/video/fallback.jpg` - Optional dedicated fallback image (currently uses restaurant_crowded image)

### Browser Compatibility

**Target Browsers**:
- Modern evergreen browsers (Chrome, Firefox, Safari, Edge)
- ES6+ JavaScript features used (requires transpilation for older browsers if needed)
- CSS Grid and Flexbox layout (IE11 not supported without polyfills)
- CSS custom properties required

**Progressive Enhancement**:
- Core content accessible without JavaScript
- Enhanced interactions require JavaScript enabled
- Graceful degradation for unsupported features