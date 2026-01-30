# 🔗 LinkNest - Link-in-Bio Tool

A beautiful, modern link-in-bio application built with Next.js 16, React 19, and TypeScript. Create your personalized landing page to share all your important links from one simple URL.

## ✨ Features

- 🎨 **Customizable Link Pages** - Create beautiful landing pages with your links
- 📊 **Click Analytics** - Track which links get the most engagement
- 🎯 **Drag & Drop** - Easily reorder your links
- 🌈 **Theme Customization** - Choose colors that match your brand
- 📱 **Mobile Responsive** - Perfect on all devices
- ⚡ **Lightning Fast** - Built with Next.js for optimal performance
- 💾 **Local Storage** - Your data stays private on your device
- 🔒 **No Sign-up Required** - Start immediately, no account needed
- 📈 **Link Management** - Toggle links on/off, edit anytime
- 🎭 **Beautiful UI** - Smooth animations and modern design

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- pnpm (recommended) or npm

### Installation

1. **Install dependencies:**
```bash
pnpm install
```

2. **Run development server:**
```bash
pnpm dev
```

3. **Open your browser:**
Navigate to [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
pnpm build
pnpm start
```

## 📁 Project Structure

```
LinkNest/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Landing page
│   ├── layout.tsx         # Root layout
│   ├── globals.css        # Global styles
│   ├── links/             # Link management page
│   ├── analytics/         # Analytics dashboard
│   └── preview/           # Public profile page
├── components/            # React components
│   ├── ui/               # UI components (buttons, cards, etc.)
│   ├── global-nav.tsx    # Navigation component
│   └── pwa-installer.tsx # PWA installer
├── hooks/                # Custom React hooks
│   └── use-links-store.tsx # Zustand store for links
├── lib/                  # Utilities and types
│   ├── utils.ts          # Helper functions
│   └── types.ts          # TypeScript types
└── public/               # Static assets
```

## 🎯 How to Use

### 1. Add Your First Link
- Navigate to `/links`
- Click "Add Link" button
- Enter title and URL
- Click "Add Link" to save

### 2. Customize Your Links
- Drag and drop to reorder
- Toggle links on/off with the switch
- Edit link details anytime
- Delete links you no longer need

### 3. Share Your Page
- Click the copy button to copy your unique URL
- Share on Instagram, TikTok, Twitter, YouTube bio
- Track clicks in the Analytics page

### 4. View Analytics
- Go to `/analytics`
- See total clicks and link performance
- Identify your top performing links
- Understand your audience better

## 🎨 Color Customization

The project uses Teal/Cyan as the primary color. To change the theme:

1. **Edit `app/globals.css`:**
```css
:root {
  --primary: oklch(0.55 0.15 200); /* Change the last number for different hues */
}
```

2. **Popular color alternatives:**
   - Purple: `oklch(0.55 0.15 280)`
   - Pink: `oklch(0.65 0.20 350)`
   - Orange: `oklch(0.65 0.18 35)`
   - Green: `oklch(0.55 0.15 150)`
   - Red: `oklch(0.55 0.20 20)`

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **UI Library:** React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Components:** shadcn/ui
- **State Management:** Zustand
- **Animations:** Framer Motion
- **Smooth Scrolling:** Lenis
- **Icons:** Lucide React
- **PWA Support:** Built-in service worker

## 📝 Pages Overview

### Landing Page (`/`)
- Hero section with project introduction
- Feature showcase with tabs
- Benefits cards
- CTA sections
- Footer with social links

### Links Management (`/links`)
- Add, edit, delete links
- Drag & drop reordering
- Toggle link visibility
- Copy shareable URL
- Live preview button

### Preview Page (`/preview`)
- Public-facing link page
- Clean, minimal design
- Click tracking
- Mobile-optimized
- Shareable URL

### Analytics (`/analytics`)
- Total clicks counter
- Link performance metrics
- Top performing links chart
- Quick stats overview
- Insights and tips

## 🔧 Customization Guide

### Change Project Name
1. Update `package.json` → `name` field
2. Update `app/layout.tsx` → metadata
3. Update all "LinkNest" text throughout the project
4. Update `README.md`

### Change Colors
Edit `app/globals.css` → `:root` variables

### Add New Features
1. Create components in `components/`
2. Add types in `lib/types.ts`
3. Update store in `hooks/use-links-store.tsx`
4. Create new pages in `app/`

## 🌐 Deployment

### Vercel (Recommended)
```bash
vercel deploy
```

### Other Platforms
```bash
pnpm build
# Upload the `.next` folder and run `pnpm start`
```

## 🔑 Key Features Explained

### Local Storage
- All data stored in browser's localStorage
- No server required
- Privacy-focused approach
- No data collection

### Click Tracking
- Increments counter when link is clicked
- Stored locally
- Anonymous tracking
- No external analytics

### PWA Support
- Installable on mobile devices
- Works offline
- App-like experience
- Service worker included

## 💡 Tips for Success

1. **Keep it Simple** - Add 5-8 key links max
2. **Update Regularly** - Keep links fresh and relevant
3. **Use Clear Titles** - Make it obvious what each link is
4. **Test Your Links** - Ensure all URLs work correctly
5. **Share Everywhere** - Add to all your social bios
6. **Check Analytics** - Optimize based on what works

## 🤝 Reuse This Template

Want to create a similar project with different functionality?

1. **Copy the structure** - Use the same landing page design
2. **Change colors** - Update CSS variables
3. **Modify content** - Update text and images
4. **Swap functionality** - Replace links with your features
5. **Deploy** - Launch your new project!

## 📜 License

MIT License - Feel free to use this project for personal or commercial purposes.

## 🆘 Support

For issues or questions:
1. Check existing issues in your repository
2. Create a new issue with details
3. Include screenshots if relevant

## 🎉 Credits

Built with inspiration from Linktree, Beacons, and other link-in-bio tools.

---

**Made with ❤️ by [Your Name]**

Start creating your link page today! 🚀
