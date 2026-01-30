# 🚀 Quick Project Switcher

Transform LinkNest into any project in **under 5 minutes**! Just follow these steps:

## ⚡ 5-Minute Transformation

### 1. Choose Your Project (Pick One)

#### 🔗 URL Shortener "LinkSnap"
```css
/* Color: Red */
--primary: oklch(0.55 0.20 20);
```
**Changes:**
- Icon: `Scissors` or `Link`
- Hero: "Shorten. Track. Optimize."
- Keep: Links page → "Manage Short URLs"
- Keep: Analytics page → "Click Analytics"

#### 📸 Screenshot Tool "SnapBeauty"
```css
/* Color: Purple */
--primary: oklch(0.58 0.12 280);
```
**Changes:**
- Icon: `Camera` or `Image`
- Hero: "Screenshot perfection, every time"
- Rename: Links → "Gallery"
- Rename: Analytics → "Usage Stats"

#### 💰 Invoice Generator "InvoiceFlow"
```css
/* Color: Green */
--primary: oklch(0.55 0.15 150);
```
**Changes:**
- Icon: `FileText` or `Receipt`
- Hero: "Professional invoices in seconds"
- Rename: Links → "Invoices"
- Rename: Analytics → "Payments"

#### 📝 Form Builder "FormEase"
```css
/* Color: Blue */
--primary: oklch(0.55 0.15 220);
```
**Changes:**
- Icon: `Layout` or `Grid`
- Hero: "Create forms in minutes"
- Rename: Links → "Forms"
- Rename: Analytics → "Responses"

#### 🎨 Color Palette Tool "PaletteHub"
```css
/* Color: Multi-gradient */
--primary: oklch(0.65 0.20 350);
```
**Changes:**
- Icon: `Palette` or `Sparkles`
- Hero: "Perfect colors, every time"
- Rename: Links → "Palettes"
- Rename: Analytics → "Favorites"

#### 📚 Bookmark Manager "SaveNest"
```css
/* Color: Purple */
--primary: oklch(0.58 0.12 270);
```
**Changes:**
- Icon: `Bookmark` or `Star`
- Hero: "Never lose a link again"
- Rename: Links → "Bookmarks"
- Rename: Analytics → "Collections"

## 🎯 Copy-Paste Transformations

### URL Shortener "LinkSnap"

**1. Update `globals.css`:**
```css
:root {
  --primary: oklch(0.55 0.20 20); /* Red */
}
.dark {
  --primary: oklch(0.65 0.22 20);
}
```

**2. Update `app/page.tsx` Hero:**
```tsx
<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
  Shorten. Track.{' '}
  <span className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
    Optimize
  </span>
</h1>

<p className="mx-auto max-w-2xl text-lg text-muted-foreground mb-8">
  Create branded short links that are easy to share and track. Get powerful analytics and insights for every link you shorten.
</p>
```

**3. Change Icon (Header):**
```tsx
// Find Link2, replace with:
<Scissors className="size-6 text-primary-foreground" />
```

**Done! Run `pnpm dev`**

---

### Screenshot Tool "SnapBeauty"

**1. Update `globals.css`:**
```css
:root {
  --primary: oklch(0.58 0.12 280); /* Purple */
}
.dark {
  --primary: oklch(0.68 0.15 280);
}
```

**2. Update `app/page.tsx` Hero:**
```tsx
<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
  Screenshot perfection,{' '}
  <span className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
    every time
  </span>
</h1>

<p className="mx-auto max-w-2xl text-lg text-muted-foreground mb-8">
  Add beautiful backgrounds, gradients, and frames to your screenshots. Make your images stand out on social media.
</p>
```

**3. Change Icon:**
```tsx
<Camera className="size-6 text-primary-foreground" />
```

**Done!**

---

### Invoice Generator "InvoiceFlow"

**1. Update `globals.css`:**
```css
:root {
  --primary: oklch(0.55 0.15 150); /* Green */
}
.dark {
  --primary: oklch(0.65 0.18 150);
}
```

**2. Update `app/page.tsx` Hero:**
```tsx
<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
  Professional invoices{' '}
  <span className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
    in seconds
  </span>
</h1>

<p className="mx-auto max-w-2xl text-lg text-muted-foreground mb-8">
  Create beautiful, professional invoices for your business. Track payments, manage clients, and get paid faster.
</p>
```

**3. Change Icon:**
```tsx
<FileText className="size-6 text-primary-foreground" />
```

**Done!**

---

## 🔄 Find & Replace Guide

Use VS Code's Find & Replace (Ctrl+Shift+H):

### For URL Shortener:
- Find: `LinkNest` → Replace: `LinkSnap`
- Find: `Link-in-Bio Tool` → Replace: `URL Shortener`
- Find: `link-in-bio page` → Replace: `short link`
- Find: `/links` → Keep same (works for short links!)
- Find: `Link2` → Replace: `Scissors`

### For Screenshot Tool:
- Find: `LinkNest` → Replace: `SnapBeauty`
- Find: `Link-in-Bio Tool` → Replace: `Screenshot Tool`
- Find: `/links` → Replace: `/gallery`
- Find: `Link2` → Replace: `Camera`

### For Invoice Generator:
- Find: `LinkNest` → Replace: `InvoiceFlow`
- Find: `Link-in-Bio Tool` → Replace: `Invoice Generator`
- Find: `/links` → Replace: `/invoices`
- Find: `Link2` → Replace: `FileText`

## ⚡ Lightning Fast Method

**Step 1:** Choose your project from above  
**Step 2:** Copy the color code  
**Step 3:** Copy the hero text  
**Step 4:** Change the icon  
**Step 5:** Run `pnpm dev`  

**Total time: 3-5 minutes! 🚀**

## 🎨 Popular Color Combinations

```css
/* Professional Blue */
--primary: oklch(0.55 0.15 220);
--secondary: oklch(0.45 0.15 250);

/* Creative Purple */
--primary: oklch(0.58 0.12 280);
--secondary: oklch(0.68 0.15 320);

/* Success Green */
--primary: oklch(0.55 0.15 150);
--secondary: oklch(0.45 0.12 130);

/* Urgent Red */
--primary: oklch(0.55 0.20 20);
--secondary: oklch(0.45 0.18 10);

/* Warm Orange */
--primary: oklch(0.65 0.18 35);
--secondary: oklch(0.55 0.16 25);

/* Cool Teal (current) */
--primary: oklch(0.55 0.15 200);
--secondary: oklch(0.45 0.12 190);
```

## 🎯 Icon Quick Reference

Popular Lucide icons for different projects:

```tsx
import { 
  Link, Link2, Scissors,      // URL tools
  Camera, Image, Aperture,     // Photo/Screenshot
  FileText, Receipt, File,     // Documents/Invoice
  Layout, Grid, Layers,        // Forms/Builders  
  Palette, Sparkles, Brush,    // Design tools
  Bookmark, Star, Heart,       // Bookmarks/Favorites
  QrCode, Scan, Code,         // QR/Tech tools
  Mail, Send, MessageSquare,   // Communication
  Calendar, Clock, Timer,      // Time/Schedule
  DollarSign, CreditCard,      // Finance
} from 'lucide-react'
```

## 📦 Project Template Library

Create a templates folder:

```
YourProjects/
├── LinkNest/ (original)
├── LinkSnap/ (URL shortener)
├── SnapBeauty/ (Screenshot)
├── InvoiceFlow/ (Invoices)
├── FormEase/ (Form builder)
└── SaveNest/ (Bookmarks)
```

Each one is ready to go with just the color/text changes!

## 🚀 Deployment Checklist

Before deploying:
- [ ] Updated all "LinkNest" references
- [ ] Changed primary color
- [ ] Updated icon in header
- [ ] Modified hero text
- [ ] Replaced screenshot images
- [ ] Updated metadata in layout.tsx
- [ ] Changed manifest.json
- [ ] Updated README.md
- [ ] Tested all pages
- [ ] Checked mobile view

## 💡 Pro Tip

Keep a "template" version of LinkNest untouched, then make copies for each new project:

```bash
# Create template
cp -r LinkNest LinkNest-Template

# Start new projects
cp -r LinkNest-Template LinkSnap
cp -r LinkNest-Template SnapBeauty
cp -r LinkNest-Template InvoiceFlow
```

Each project is independent and deployable!

---

**Remember:** The hard work is done! Just change colors, text, and icons. The beautiful landing page stays the same! 🎉
