'use client'

import React, { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { TrendingUp, TrendingDown, Star, Search } from 'lucide-react'
import { fetchCryptoList, formatCurrency, formatLargeNumber, formatPercentage } from '@/lib/crypto-api'
import { Cryptocurrency } from '@/lib/types'
import { useWatchlistStore } from '@/hooks/use-watchlist-store'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { LineChart, Line, AreaChart, Area, ResponsiveContainer } from 'recharts'

export default function MarketsPage() {
  const [cryptos, setCryptos] = useState<Cryptocurrency[]>([])
  const [filteredCryptos, setFilteredCryptos] = useState<Cryptocurrency[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(1)
  const { watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlistStore()

  useEffect(() => {
    loadMarkets()
  }, [page])

  useEffect(() => {
    if (searchQuery) {
      const filtered = cryptos.filter(
        (crypto) =>
          crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setFilteredCryptos(filtered)
    } else {
      setFilteredCryptos(cryptos)
    }
  }, [searchQuery, cryptos])

  const loadMarkets = async () => {
    setLoading(true)
    const data = await fetchCryptoList(page, 50)
    setCryptos(data)
    setFilteredCryptos(data)
    setLoading(false)
  }

  const toggleWatchlist = (crypto: Cryptocurrency) => {
    if (isInWatchlist(crypto.id)) {
      removeFromWatchlist(crypto.id)
    } else {
      addToWatchlist(crypto)
    }
  }

  return (
    <div className="flex-1 flex flex-col space-y-6 p-6 md:p-10 pt-8">

      {/* Search & Filters */}
      <div className="flex items-center gap-4 py-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search coins..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-10 text-base shadow-sm"
          />
        </div>
      </div>

      {/* Markets Table */}
      <Card className="shadow-md">
        <CardContent className="p-0">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent h-12 bg-muted/30">
                  <TableHead className="w-[60px] text-sm font-bold pl-6">#</TableHead>
                  <TableHead className="text-sm font-bold">Coin</TableHead>
                  <TableHead className="text-right text-sm font-bold">Price</TableHead>
                  <TableHead className="text-right text-sm font-bold">24h Change</TableHead>
                  <TableHead className="text-right text-sm font-bold hidden md:table-cell">Market Cap</TableHead>
                  <TableHead className="text-right text-sm font-bold hidden lg:table-cell">Volume (24h)</TableHead>
                  <TableHead className="text-right text-sm font-bold pr-6">Watch</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i} className="h-16">
                      <TableCell className="pl-6"><Skeleton className="h-4 w-4" /></TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Skeleton className="h-8 w-8 rounded-full" />
                          <div className="space-y-1">
                            <Skeleton className="h-4 w-24" />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right"><Skeleton className="h-4 w-20 ml-auto" /></TableCell>
                      <TableCell className="text-right"><Skeleton className="h-4 w-16 ml-auto" /></TableCell>
                      <TableCell className="text-right hidden md:table-cell"><Skeleton className="h-4 w-24 ml-auto" /></TableCell>
                      <TableCell className="text-right hidden lg:table-cell"><Skeleton className="h-4 w-24 ml-auto" /></TableCell>
                      <TableCell className="text-right pr-6"><Skeleton className="h-8 w-8 ml-auto" /></TableCell>
                    </TableRow>
                  ))
                ) : filteredCryptos.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-32 text-center text-muted-foreground text-lg">
                      No results found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCryptos.map((crypto) => {
                    const isUp = crypto.price_change_percentage_24h >= 0
                    const inWatchlist = isInWatchlist(crypto.id)
                    return (
                      <TableRow key={crypto.id} className="cursor-pointer hover:bg-muted/50 transition-colors h-16 text-base">
                        <TableCell className="text-sm font-medium text-muted-foreground w-[60px] pl-6">
                          {crypto.market_cap_rank}
                        </TableCell>
                        <TableCell>
                           <Link href={`/coin/${crypto.id}`} className="flex items-center gap-4 py-1">
                             <img src={crypto.image} alt={crypto.name} className="h-9 w-9 rounded-full shadow-sm" />
                             <div className="flex flex-col gap-0.5">
                               <span className="text-base font-semibold leading-none">{crypto.name}</span>
                               <span className="text-sm text-muted-foreground uppercase tracking-wide">{crypto.symbol}</span>
                             </div>
                           </Link>
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          <Link href={`/coin/${crypto.id}`} className="block py-1">
                          {formatCurrency(crypto.current_price)}
                          </Link>
                        </TableCell>
                        <TableCell className="text-right">
                          <Link href={`/coin/${crypto.id}`} className="block py-1">
                          <div className={`text-sm font-medium px-2.5 py-1 rounded-full inline-flex items-center gap-1.5 ${
                            isUp ? 'text-green-600 bg-green-500/10' : 'text-red-600 bg-red-500/10'
                          }`}>
                            {isUp ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
                            {formatPercentage(crypto.price_change_percentage_24h)}
                          </div>
                          </Link>
                        </TableCell>
                        <TableCell className="text-right text-muted-foreground hidden md:table-cell">
                          <Link href={`/coin/${crypto.id}`} className="block py-1">
                          {formatLargeNumber(crypto.market_cap)}
                          </Link>
                        </TableCell>
                        <TableCell className="text-right text-muted-foreground hidden lg:table-cell">
                          <Link href={`/coin/${crypto.id}`} className="block py-1">
                          {formatLargeNumber(crypto.total_volume)}
                          </Link>
                        </TableCell>
                        <TableCell className="text-right pr-6">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="hover:text-amber-400 hover:bg-amber-400/10 h-9 w-9"
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleWatchlist(crypto)
                            }}
                          >
                            <Star className={`h-5 w-5 ${inWatchlist ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground'}`} />
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      {/* Pagination */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Previous
        </Button>
        <div className="flex-1 text-center text-xs text-muted-foreground">
            Page {page}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage(page + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
