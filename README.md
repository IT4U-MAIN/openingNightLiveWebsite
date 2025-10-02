# Opening Night Live - Marketing Website

A high-performance marketing website for Opening Night Live built with pure HTML, CSS, and vanilla JavaScript. Zero frameworks, zero build tools, optimized for speed and accessibility.

## 🚀 Quick Start

The website is ready to deploy as static files to any hosting platform (Netlify, Vercel, S3, GitHub Pages, etc.).

## 📁 Project Structure

```
/
├── index.html              # Homepage
├── about.html              # About page
├── services.html           # Services & pricing
├── case-studies.html       # Case studies showcase
├── blog.html               # Blog listing
├── contact.html            # Contact form
├── 404.html                # 404 error page
├── robots.txt              # SEO robots file
├── sitemap.xml             # SEO sitemap
├── favicon.svg             # Site favicon
├── site.webmanifest        # PWA manifest
├── /assets/
│   ├── /css/
│   │   └── styles.css      # Main stylesheet
│   ├── /js/
│   │   └── main.js         # Main JavaScript
│   ├── /img/               # Images
│   └── /video/             # Hero video (add hero.mp4 here)
└── README.md
```

## ✏️ How to Edit Content

### Change Countdown Date

In `index.html`, find the countdown section and update the `data-launch` attribute:

```html
<div class="countdown" data-launch="2025-11-15T22:00:00Z">
```

Format: ISO 8601 date string (YYYY-MM-DDTHH:mm:ssZ)

### Update Copy

All text content is directly in the HTML files. Search for the text you want to change and update it in place.

### Swap Images

Replace images in `/assets/img/` with your own. Keep the same filenames or update the `src` attributes in the HTML.

**Recommended formats:**
- Hero images: WebP (with JPG fallback)
- Icons: SVG
- Photos: WebP optimized

### Add Hero Video

1. Place your video file at `/assets/video/hero.mp4`
2. Recommended specs:
   - Format: MP4 (H.264 codec)
   - Max size: 2MB
   - Resolution: 1920x1080
   - Duration: 10-30 seconds (looping)
3. Also add a fallback image: `/assets/video/fallback.jpg`

## 🔌 Connect Forms

### Newsletter Form (index.html & blog.html)

Forms currently submit to `#` with TODO placeholders. To connect:

**Option 1: Formspree**
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="post">
```

**Option 2: Netlify Forms**
```html
<form name="newsletter" netlify>
```

**Option 3: ConvertKit/Mailchimp**
Update the `action` attribute with your email provider's form endpoint.

### Contact Form (contact.html)

Multi-step form with validation. To connect:

1. Update form `action` attribute with your endpoint
2. Or use Formspree/Netlify as above
3. Honeypot field (`form__honeypot`) included for spam prevention

### Calendly Embed (contact.html)

Find `<div id="calendar-embed">` and replace the TODO with your Calendly embed code:

```html
<div id="calendar-embed">
  <!-- Calendly inline widget begin -->
  <div class="calendly-inline-widget" 
       data-url="https://calendly.com/YOUR_LINK" 
       style="min-width:320px;height:630px;">
  </div>
  <script type="text/javascript" 
          src="https://assets.calendly.com/assets/external/widget.js" 
          async>
  </script>
  <!-- Calendly inline widget end -->
</div>
```

## 🌐 Deploy to Production

### DNS Configuration

Point your domain to your hosting provider:

**For apex domain (openingnightlive.live):**
- A record or ALIAS record to your host's IP/endpoint

**For www subdomain:**
- CNAME record to your host or apex domain

**Canonical URL:**
Set canonical to apex domain (`https://openingnightlive.live`) for SEO.

### Netlify Deployment

1. Push to GitHub repository
2. Connect to Netlify
3. Build settings:
   - Build command: (leave empty)
   - Publish directory: `/`
4. Set domain to `openingnightlive.live`
5. Enable HTTPS and force HTTPS redirect

### Vercel Deployment

1. Push to GitHub repository
2. Import to Vercel
3. Framework preset: Other
4. Root directory: `./`
5. Set domain to `openingnightlive.live`

### Security Headers (Optional)

If your host supports, add these headers:

```
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

## 🎨 Customization

### Brand Colors

Update in `/assets/css/styles.css`:

```css
:root {
  --color-bg-primary: #0E0F14;
  --color-accent-coral: #E73E33;
  --color-accent-warm: #FFD166;
  --color-text-primary: #F5F7FA;
  --color-text-muted: #8A90A2;
}
```

### Typography

Fonts are loaded from Google Fonts. To change:

1. Update Google Fonts link in each HTML `<head>`
2. Update CSS variables:
```css
:root {
  --font-display: 'Clash Display', Georgia, serif;
  --font-body: 'Inter', system-ui, sans-serif;
}
```

## ♿ Accessibility

- WCAG AA compliant color contrast
- Semantic HTML5 structure
- ARIA labels on all interactive elements
- Keyboard navigation support
- Screen reader friendly
- Reduced motion support built-in

## 🚀 Performance

- No external frameworks or libraries
- Lazy-loading images
- Deferred JavaScript
- Optimized fonts with `font-display: swap`
- Minify CSS/JS before production deploy
- Hero video with reduced-motion fallback

## 📧 Contact & Support

**Primary Contact:** hello@openingnightlive.live

## 📝 License

© 2025 openingnightlive.live. All rights reserved.
