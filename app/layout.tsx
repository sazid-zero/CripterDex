import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { PWAInstaller } from '@/components/pwa-installer'
import { LayoutShell } from '@/components/layout-shell'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'LinkNest - Your Link-in-Bio Page',
  description: 'Create a beautiful link-in-bio page for all your content. Share unlimited links from one simple URL. Perfect for creators, influencers, and businesses.',
  generator: 'v0.app',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'LinkNest',
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: [
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
  },
  openGraph: {
    type: 'website',
    title: 'LinkNest - Your Link-in-Bio Page',
    description: 'Create a beautiful link-in-bio page for all your content. Share unlimited links from one simple URL.',
    siteName: 'LinkNest',
    images: [{
      url: '/icon.svg',
      width: 1200,
      height: 630,
      alt: 'LinkNest'
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LinkNest - Your Link-in-Bio Page',
    description: 'Create a beautiful link-in-bio page for all your content.',
    images: ['/icon.svg'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={_geist.className}>
        <LayoutShell>
          {children}
        </LayoutShell>
        <PWAInstaller />
        <Analytics />
      </body>
    </html>
  )
}
