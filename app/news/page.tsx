'use client'

import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { CalendarDays, ExternalLink, Newspaper, TrendingUp } from 'lucide-react'
import { fetchCryptoNews } from '@/lib/crypto-api'
import { NewsItem } from '@/lib/types'
import Link from 'next/link'
import { motion } from 'framer-motion'

function formatTimeAgo(dateString: string) {
    const date = new Date(dateString)
    const now = new Date()
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)
    
    let interval = seconds / 31536000
    if (interval > 1) return Math.floor(interval) + " years ago"
    
    interval = seconds / 2592000
    if (interval > 1) return Math.floor(interval) + " months ago"
    
    interval = seconds / 86400
    if (interval > 1) return Math.floor(interval) + " days ago"
    
    interval = seconds / 3600
    if (interval > 1) return Math.floor(interval) + " hours ago"
    
    interval = seconds / 60
    if (interval > 1) return Math.floor(interval) + " minutes ago"
    
    return Math.floor(seconds) + " seconds ago"
}


const NewsCard = ({ item, variant = 'standard' }: { item: NewsItem; variant?: 'featured' | 'horizontal' | 'standard' }) => {
  if (variant === 'featured') {
    return (
      <Card className="relative overflow-hidden group border-0 shadow-lg h-[400px]">
        <img 
            src={item.image_url} 
            alt={item.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6 text-white w-full">
            <div className="flex gap-2 mb-3">
                 <Badge className="bg-primary hover:bg-primary/90 text-primary-foreground border-0">
                    {item.source}
                 </Badge>
                 {item.categories.slice(0, 1).map(cat => (
                    <Badge key={cat} variant="outline" className="border-white/20 text-white backdrop-blur-sm">
                        {cat}
                    </Badge>
                 ))}
            </div>
            <Link href={item.url} target="_blank" className="hover:underline decoration-primary decoration-2 underline-offset-4">
                 <h3 className="text-2xl font-bold leading-tight mb-3 text-white">
                    {item.title}
                 </h3>
            </Link>
            <div className="flex items-center text-xs text-gray-400">
                 <CalendarDays className="mr-1 h-3 w-3" />
                 {formatTimeAgo(item.published_at)}
            </div>
        </div>
      </Card>
    )
  }

  if (variant === 'horizontal') {
      return (
        <Card className="overflow-hidden h-[190px] hover:shadow-md transition-all hover:border-primary/50 group bg-card/50 backdrop-blur-sm flex">
            <div className="relative w-2/5 shrink-0 overflow-hidden bg-muted">
                <img 
                    src={item.image_url} 
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
            </div>
            <div className="flex flex-col flex-1 min-w-0 p-4">
                <Link href={item.url} target="_blank" className="block group-hover:text-primary transition-colors mb-2">
                    <h4 className="text-sm font-bold leading-snug line-clamp-3">
                        {item.title}
                    </h4>
                </Link>
                <div className="mt-auto flex items-center justify-between text-muted-foreground pt-2">
                    <Badge variant="secondary" className="text-[10px] px-1.5 h-5 font-medium opacity-80">
                        {item.source}
                    </Badge>
                    <div className="flex items-center text-[10px] font-medium">
                        {formatTimeAgo(item.published_at)}
                    </div>
                </div>
            </div>
        </Card>
      )
  }

  // Standard vertical card for the bottom grid
  return (
    <Card className="overflow-hidden flex flex-col h-full hover:shadow-md transition-all hover:border-primary/50 group bg-card/50 backdrop-blur-sm">
      <div className="relative h-48 w-full overflow-hidden bg-muted">
          <img 
              src={item.image_url} 
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute top-2 right-2">
               <Badge className="bg-background/80 text-foreground backdrop-blur-sm hover:bg-background/90 text-[10px] px-1.5 py-0 shadow-sm">
                  {item.source}
               </Badge>
          </div>
      </div>
      <div className="flex flex-col flex-1 p-4">
          <div className="flex flex-wrap gap-1.5 mb-3">
              {item.categories.slice(0, 1).map((cat) => (
                  <Badge key={cat} variant="secondary" className="text-[10px] px-1.5 h-5 font-medium opacity-80">
                      {cat}
                  </Badge>
              ))}
          </div>
          <Link href={item.url} target="_blank" className="block group-hover:text-primary transition-colors mb-2">
              <h4 className="text-base font-bold leading-tight line-clamp-2">
                  {item.title}
              </h4>
          </Link>
          <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
              {item.description}
          </p>
          <div className="mt-auto pt-2 border-t border-border/40 flex items-center justify-between text-muted-foreground">
               <div className="flex items-center text-[10px] font-medium">
                  <CalendarDays className="mr-1 h-3 w-3 opacity-70" />
                  {formatTimeAgo(item.published_at)}
              </div>
          </div>
      </div>
    </Card>
  )
}

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadNews()
  }, [])

  const loadNews = async () => {
    setLoading(true)
    const data = await fetchCryptoNews()
    setNews(data)
    setLoading(false)
  }

  const featured = news.slice(0, 2)
  const sideList = news.slice(2, 6)
  const feed = news.slice(6)

  return (
    <div className="flex-1 flex flex-col space-y-8 p-6 md:p-10 pt-8 max-w-[1600px] mx-auto w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Crypto News</h2>
            <p className="text-muted-foreground mt-2">
              Latest updates and market insights
            </p>
          </div>
        </div>

        {loading ? (
             <div className="flex flex-col gap-8">
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Skeleton className="h-[824px] rounded-xl" />
                    <Skeleton className="h-[824px] rounded-xl" />
                 </div>
             </div>
        ) : (
            <div className="flex flex-col gap-10">
                {/* Top Section: Split Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left Column: 2 Big Cards */}
                    <div className="flex flex-col gap-6">
                        {featured.map((item, i) => (
                            <NewsCard key={item.id} item={item} variant="featured" />
                        ))}
                    </div>

                    {/* Right Column: 4 Small Cards (2x2 Grid) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 content-start">
                        {sideList.map((item, i) => (
                            <div key={item.id} className="h-[400px]">
                                <NewsCard item={item} variant="standard" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Section: Standard Grid Feed */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {feed.map((item, i) => (
                        <div key={item.id} className="h-full">
                            <NewsCard item={item} variant="standard" />
                        </div>
                    ))}
                </div>
            </div>
        )}
      </motion.div>
    </div>
  )
}

