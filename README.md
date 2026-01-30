# CripterDex 

**CripterDex** is a professional-grade cryptocurrency dashboard and market intelligence platform designed for traders, investors, and enthusiasts. Built with modern web technologies, it offers real-time data tracking, news aggregation, and portfolio management in a sleek, responsive interface.

##  Features

- **Real-Time Market Data**: Live tracking of thousands of cryptocurrencies with 60-second auto-updates.
- **Advanced Charting**: Interactive price history charts (1D, 7D, 30D, 1Y).
- **Global News Aggregator**: Curated crypto news feed to stay ahead of market trends.
- **Watchlist Management**: Personalized portfolio tracking and favorites list.
- **Deep Market Analysis**:
  - Top Gainers & Losers
  - Trending Coins
  - Volume & Market Cap metrics
- **Responsive Design**: Seamless experience across Desktop, Tablet, and Mobile devices.
- **Progressive Web App (PWA)**: Installable application support.

##  Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) (Radix UI)
- **Charts**: [Recharts](https://recharts.org/)
- **State Management**: Zustand (implied via hooks/use-store patterns)

##  Getting Started

First, run the development server:

```bash
# Install dependencies
pnpm install
# or
npm install
# or
yarn install

# Run the dev server
pnpm dev
# or
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

##  Project Structure

```bash
.
 app/                  # Next.js App Router pages & API
    api/              # Internal API routes (crypto data, news)
    dashboard/        # Main user dashboard
    markets/          # Detailed market list
    page.tsx          # Landing page
    globals.css       # Global styles & Tailwind config
 components/           # Reusable UI components
    ui/               # shadcn/ui primitives
 hooks/                # Custom React hooks (store, logic)
 lib/                  # Utilities & API helpers
 public/               # Static assets
```

##  License

This project is licensed under the MIT License - see the LICENSE file for details.

