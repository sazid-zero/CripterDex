'use client'

import React, { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { TrendingUp, TrendingDown, Star, Trash2, Plus, ArrowRight } from 'lucide-react'
import { formatCurrency, formatLargeNumber, formatPercentage, fetchCryptoList } from '@/lib/crypto-api'
import { Cryptocurrency } from '@/lib/types'
import { useWatchlistStore } from '@/hooks/use-watchlist-store'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'

export default function WatchlistPage() {
  const { watchlist, removeFromWatchlist } = useWatchlistStore()
  const [updatedPrices, setUpdatedPrices] = useState<Record<string, Cryptocurrency>>({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (watchlist.length > 0) {
      updatePrices()
      // Update prices every 60 seconds
      const interval = setInterval(updatePrices, 60000)
      return () => clearInterval(interval)
    }
  }, [watchlist])

  const updatePrices = async () => {
    if (watchlist.length === 0) return
    
    setLoading(true)
    // Fetch updated data for all coins in watchlist
    const allCryptos = await fetchCryptoList(1, 250)
    const priceMap: Record<string, Cryptocurrency> = {}
    
    watchlist.forEach((item) => {
      const updated = allCryptos.find((c) => c.id === item.id)
      if (updated) {
        priceMap[item.id] = updated
      }
    })
    
    setUpdatedPrices(priceMap)
    setLoading(false)
  }

  const getCryptoData = (id: string): Cryptocurrency => {
    return updatedPrices[id] || watchlist.find((w) => w.id === id)?.cryptocurrency!
  }

  return (
    <div className="flex flex-col space-y-4 p-1 md:p-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-end mb-4">
          <Link href="/markets">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Coins
            </Button>
          </Link>
        </div>

        {watchlist.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <div className="rounded-full bg-muted p-6 mb-4">
                <Star className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Your watchlist is empty
              </h3>
              <p className="text-muted-foreground mb-6 text-sm text-center max-w-sm">
                Start building your watchlist by adding cryptocurrencies from the markets page.
              </p>
              <Link href="/markets">
                <Button>Browse Markets</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="h-12 bg-muted/30 hover:bg-transparent">
                      <TableHead className="w-[60px] text-sm font-bold pl-6">#</TableHead>
                      <TableHead className="text-sm font-bold">Asset</TableHead>
                      <TableHead className="text-right text-sm font-bold">Price</TableHead>
                      <TableHead className="text-right text-sm font-bold">Change (24h)</TableHead>
                      <TableHead className="text-right text-sm font-bold hidden md:table-cell">Market Cap</TableHead>
                      <TableHead className="text-right text-sm font-bold hidden lg:table-cell">Volume (24h)</TableHead>
                      <TableHead className="text-right text-sm font-bold pr-6">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading && Object.keys(updatedPrices).length === 0 ? (
                         Array(watchlist.length || 3).fill(0).map((_, i) => (
                          <TableRow key={i} className="h-10">
                             <TableCell className="pl-2"><Skeleton className="h-4 w-4" /></TableCell>
                             <TableCell><Skeleton className="h-8 w-32" /></TableCell>
                             <TableCell className="text-right"><Skeleton className="h-4 w-20 ml-auto" /></TableCell>
                             <TableCell className="text-right"><Skeleton className="h-4 w-16 ml-auto" /></TableCell>
                             <TableCell className="hidden md:table-cell text-right"><Skeleton className="h-4 w-24 ml-auto" /></TableCell>
                             <TableCell className="hidden lg:table-cell text-right"><Skeleton className="h-4 w-24 ml-auto" /></TableCell>
                             <TableCell className="pr-6 text-right"><Skeleton className="h-8 w-8 ml-auto" /></TableCell>
                          </TableRow>
                         ))
                    ) : (
                     watchlist.map((item) => {
                      const crypto = getCryptoData(item.id)
                      if (!crypto) return null
                      const isUp = crypto.price_change_percentage_24h >= 0
                      return (
                        <TableRow key={crypto.id} className="cursor-pointer hover:bg-muted/50 transition-colors h-10 text-xs sm:text-base" onClick={() => window.location.href = `/coin/${crypto.id}`}>
                          <TableCell className="font-medium text-muted-foreground pl-2 text-xs sm:text-sm">
                            {crypto.market_cap_rank}
                          </TableCell>
                           <TableCell>
                            <div className="flex items-center gap-2 py-1">
                               <Avatar className="h-6 w-6 sm:h-9 sm:w-9 border border-border/50 shadow-sm">
                                  <AvatarImage src={crypto.image} />
                                  <AvatarFallback>{crypto.symbol[0]}</AvatarFallback>
                               </Avatar>
                               <div className="flex flex-col gap-0">
                                 <span className="text-xs sm:text-base font-semibold leading-none">{crypto.name}</span>
                                 <span className="text-[10px] sm:text-sm text-muted-foreground uppercase tracking-wide">{crypto.symbol}</span>
                               </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-right font-medium text-xs sm:text-base">
                            {formatCurrency(crypto.current_price)}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] sm:text-sm font-medium gap-1 ${
                              isUp ? 'text-green-600 bg-green-500/10' : 'text-red-600 bg-red-500/10'
                            }`}>
                              {isUp ? <TrendingUp className="h-3 w-3 sm:h-3.5 sm:w-3.5" /> : <TrendingDown className="h-3 w-3 sm:h-3.5 sm:w-3.5" />}
                              {formatPercentage(crypto.price_change_percentage_24h)}
                            </div>
                          </TableCell>
                          <TableCell className="text-right hidden md:table-cell text-muted-foreground text-sm">
                            {formatLargeNumber(crypto.market_cap)}
                          </TableCell>
                          <TableCell className="text-right hidden lg:table-cell text-muted-foreground text-sm">
                            {formatLargeNumber(crypto.total_volume)}
                          </TableCell>
                          <TableCell className="text-right pr-2 sm:pr-6">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={(e) => {
                                  e.stopPropagation()
                                  removeFromWatchlist(crypto.id)
                              }}
                              className="h-8 w-8 text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      )
                    })
                   )}
                  </TableBody>
                </Table>
            </CardContent>
          </Card>
        )}
      </motion.div>
    </div>
  )
}