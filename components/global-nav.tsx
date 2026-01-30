'use client'

import { LayoutDashboard, TrendingUp, Star, Home, Newspaper } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function GlobalNav() {
  const pathname = usePathname()

  const links = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/markets', label: 'Markets', icon: TrendingUp },
    { href: '/watchlist', label: 'Watchlist', icon: Star },
    { href: '/news', label: 'News', icon: Newspaper },
  ]

  return (
    <nav className="flex items-center gap-1">
      {links.map((link) => {
        const Icon = link.icon
        const isActive = pathname === link.href
        
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              isActive
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            }`}
          >
            <Icon className="size-4" />
            {link.label}
          </Link>
        )
      })}
    </nav>
  )
}
