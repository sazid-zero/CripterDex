'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, TrendingUp, Star, TrendingDown, Search, Loader2, Newspaper } from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { searchCryptos } from '@/lib/crypto-api'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/markets', label: 'Markets', icon: TrendingUp },
  { href: '/news', label: 'News', icon: Newspaper },
  { href: '/watchlist', label: 'Watchlist', icon: Star },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const router = useRouter()
  const [query, setQuery] = React.useState('')
  const [results, setResults] = React.useState<any[]>([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [showResults, setShowResults] = React.useState(false)
  const wrapperRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowResults(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  React.useEffect(() => {
    const search = async () => {
        if (!query.trim()) {
            setResults([])
            return
        }
        setIsLoading(true)
        try {
            const data = await searchCryptos(query)
            setResults(data)
        } catch (e) {
            console.error(e)
        } finally {
            setIsLoading(false)
        }
    }

    const timeoutId = setTimeout(search, 300)
    return () => clearTimeout(timeoutId)
  }, [query])

  const handleSelect = (coinId: string) => {
      router.push(`/coin/${coinId}`)
      setShowResults(false)
      setQuery('')
  }

  return (
    <Sidebar {...props}>
      <SidebarHeader className="p-4 pb-0">
        <Link href="/" className="flex items-center gap-2 px-2 py-3 mb-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <TrendingUp className="size-5" />
          </div>
          <span className="text-lg font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            CripterDex
          </span>
        </Link>
        <div className="relative" ref={wrapperRef}>
             <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
             <Input 
                type="search" 
                placeholder="Search..." 
                className="w-full bg-background pl-9 h-9" 
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value)
                    setShowResults(true)
                }}
                onFocus={() => setShowResults(true)}
             />
             {showResults && query && (
                <div className="absolute top-full left-0 w-full bg-popover text-popover-foreground border rounded-md shadow-lg mt-2 z-50 max-h-[300px] overflow-y-auto">
                   {isLoading ? (
                       <div className="flex items-center justify-center p-4">
                           <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                       </div>
                   ) : results.length > 0 ? (
                       <div className="py-1">
                           {results.map((coin) => (
                               <div 
                                   key={coin.id} 
                                   className="flex items-center gap-3 px-3 py-2 hover:bg-muted/50 cursor-pointer transition-colors"
                                   onClick={() => handleSelect(coin.id)}
                               >
                                   <img src={coin.thumb} alt={coin.name} className="w-5 h-5 rounded-full" />
                                   <div className="flex flex-col overflow-hidden">
                                       <span className="text-sm font-medium truncate">{coin.name}</span>
                                       <span className="text-xs text-muted-foreground truncate">{coin.symbol}</span>
                                   </div>
                               </div>
                           ))}
                       </div>
                   ) : (
                     <div className="p-4 text-sm text-center text-muted-foreground">No results found</div>
                   )}
                </div>
             )}
        </div>
      </SidebarHeader>
      <SidebarContent className="p-4 pt-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-sm font-medium text-muted-foreground px-2 mb-2">Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={pathname === item.href}
                    className={cn(
                        "h-10 px-4 py-2 hover:bg-muted/50 transition-colors",
                         "data-[active=true]:bg-primary data-[active=true]:text-primary-foreground"
                    )}
                  >
                    <Link href={item.href} className="flex items-center gap-3">
                      <item.icon className="size-4" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
