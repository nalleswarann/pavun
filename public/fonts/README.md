# Luxury Font Assets Directory

To self-host the **Sagita** and **Swagume** fonts across all devices and browsers, place your font files here:

### Sagita Font Files (Primary Brand Font):
- `public/fonts/Sagita.woff2` (Recommended modern webfont)
- `public/fonts/Sagita.woff`
- `public/fonts/Sagita.otf` (OpenType font)
- `public/fonts/Sagita.ttf` (TrueType font)
- `public/fonts/Sagita-Italic.woff2` / `Sagita-Italic.otf`
- `public/fonts/Sagita-Bold.woff2` / `Sagita-Bold.otf`

### Swagume Font Files:
- `public/fonts/Swagume.woff2`
- `public/fonts/Swagume.woff`
- `public/fonts/Swagume.otf`
- `public/fonts/Swagume.ttf`
- `public/fonts/Swagume-Italic.woff2`

The app is configured in `src/index.css` with `@font-face` rules to automatically load:
1. Local installation on the machine: `local('Sagita')`, `local('Sagita Regular')`, `local('Sagita-Display')`, etc.
2. Webfont files from this `/fonts/` directory: `url('/fonts/Sagita.woff2')`, `url('/fonts/Sagita.otf')`, etc.
3. High-contrast luxury fallback fonts (`Bodoni Moda`, `Playfair Display`, `Cormorant Garamond`) if the font file is pending download.
