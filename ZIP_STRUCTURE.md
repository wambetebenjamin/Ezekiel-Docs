# ZIP STRUCTURE (read-only reference)

```
Freshen-v1.0.0 (1).zip
├── about-rtl.html
├── about.html
├── assets/
│   ├── css/
│   │   ├── font/
│   │   │   ├── Inter-italic.var.woff2
│   │   │   ├── Inter-roman.var.woff2
│   │   │   └── inter.css
│   │   ├── main.css
│   │   ├── main.min.css
│   │   ├── main.min.rtl.css
│   │   ├── main.rtl.css
│   │   └── style.css
│   ├── img/
│   │   ├── bg/ (bg1.jpg through bg10.jpg)
│   │   ├── clients/ (logo1.png through logo9.png)
│   │   ├── partners/ (logo1.png through logo9.png)
│   │   ├── screenshots/ (laptop-rtl.jpg, laptop.jpg)
│   │   ├── small-team/ (st1.jpg through st6.jpg)
│   │   └── team/ (t1.jpg through t6.jpg)
│   ├── js/
│   │   ├── color-modes.js
│   │   └── scripts.js
│   ├── libraries/
│   │   ├── aos/ (aos.css, aos.js)
│   │   ├── bootstrap/ (bootstrap.bundle.min.js)
│   │   └── glide/ (glide.core.min.css, glide.theme.min.css, glide.min.js)
│   ├── logo/ (favicon files, logo.png, site.webmanifest)
│   ├── php/
│   │   └── contact/ (mailer.php, script.js)
│   ├── scss/
│   │   ├── _utilities.scss
│   │   ├── _variables.scss
│   │   ├── color_palette/_color_palette.scss
│   │   ├── main.scss
│   │   ├── package-lock.json
│   │   ├── package.json
│   │   └── styles.scss
├── blog-author-rtl.html
├── blog-author.html
├── blog-post-rtl.html
├── blog-post.html
├── blog-rtl.html
├── blog.html
├── contact-rtl.html
├── contact.html
├── home-rtl.html
├── home.html
├── index.html
├── services-rtl.html
└── services.html
```

## CSS Custom Properties (from main.css)

All Bootstrap 5.3.3 CSS variables (--bs-*):
- Primary: #ea580c (orange)
- Secondary: #0284c7 (blue)
- Success: #10b981 (emerald)
- Info: #3b82f6 (blue)
- Warning: #f59e0b (amber)
- Danger: #f43f5e (rose)
- Light: #e0f2fe
- Dark: #0c4a6e
- Body color: #0369a1
- Body bg: #fff
- Custom scrollbar variables: --bs-scrollbar-thumb-bg, --bs-scrollbar-track-bg, --bs-patten-boxes-opacity

## @font-face Rules (from inter.css)

```css
@font-face {
  font-family: 'Inter var';
  font-weight: 100 900;
  font-display: swap;
  font-style: normal;
  font-named-instance: 'Regular';
  src: url("Inter-roman.var.woff2") format("woff2");
}

@font-face {
  font-family: 'Inter var';
  font-weight: 100 900;
  font-display: swap;
  font-style: italic;
  font-named-instance: 'Italic';
  src: url("Inter-italic.var.woff2") format("woff2");
}
```

## Audit Checklist

| Feature | In Template | Action |
|---------|-------------|--------|
| CSS custom properties | ✅ | Preserve all |
| @font-face rules | ✅ | Preserve verbatim |
| Loading screen | ✅ | Copy .loader-wrapper |
| Cookie consent banner | ❌ | Build fresh |
| CAPTCHA integration | ❌ | Build fresh |
| /legal/privacy-policy | ❌ | Build fresh |
| /legal/terms | ❌ | Build fresh |
| /legal/cookie-policy | ❌ | Build fresh |
| 404 page | ❌ | Build fresh |
| 500 page | ❌ | Build fresh |
| API routes | ❌ | Build fresh |
| .env variables | ❌ | Create fresh |