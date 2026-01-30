'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
import { TrendingUp, TrendingDown, ArrowLeft, Star, Globe, Twitter, ExternalLink, Activity, DollarSign, BarChart3, Clock } from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

import { formatCurrency, formatLargeNumber, formatPercentage } from '@/lib/crypto-api'
import { formatChartDate, generateAxisTicks } from '@/lib/utils'
import { Cryptocurrency } from '@/lib/types'
import { useWatchlistStore } from '@/hooks/use-watchlist-store'

export default function CoinDetailPage() {
  const params = useParams()
  const coinId = params.id as string
  const [crypto, setCrypto] = useState<Cryptocurrency | null>(null)
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState('7')
  const [chartData, setChartData] = useState<any[]>([])
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlistStore()

  useEffect(() => {
    loadCoinData()
  }, [coinId, timeRange])

  const loadCoinData = async () => {
    try {
      setLoading(true)
      
      const [detailRes, chartRes] = await Promise.all([
          fetch(`/api/crypto/coin/${coinId}`),
          fetch(`/api/crypto/chart/${coinId}?days=${timeRange}`)
      ])
      
      const detailData = await detailRes.json()
      const chartDataRes = await chartRes.json()
      
      setCrypto(detailData)
      setChartData(chartDataRes)
    } catch (error) {
      console.error('Error loading coin data:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleWatchlist = () => {
    if (!crypto) return
    if (isInWatchlist(crypto.id)) {
      removeFromWatchlist(crypto.id)
    } else {
      addToWatchlist(crypto)
    }
  }

  const timeRanges = [
    { label: '1D', value: '1' },
    { label: '7D', value: '7' },
    { label: '1M', value: '30' },
    { label: '3M', value: '90' },
    { label: '1Y', value: '365' },
    { label: 'All', value: 'max' }
  ]

  if (loading) {
     return (
        <div className="flex-1 space-y-4 p-8 pt-6">
           <Skeleton className="h-12 w-[200px]" />
           <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
             <Skeleton className="col-span-2 h-[400px]" />
             <Skeleton className="h-[400px]" />
           </div>
        </div>
     )
  }

  if (!crypto) return <div>Coin not found</div>

  const isUp = (crypto.price_change_percentage_24h || 0) >= 0
  const inWatchlist = isInWatchlist(crypto.id)

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-4"
      >
        <div className="flex items-center justify-between">
           <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                 <img src={crypto.image} alt={crypto.name} className="h-8 w-8 rounded-full" />
                 <h2 className="text-2xl font-bold tracking-tight">{crypto.name}</h2>
                 <Badge variant="outline">{crypto.symbol.toUpperCase()}</Badge>
                 <Badge variant="secondary">#{crypto.market_cap_rank}</Badge>
              </div>
           </div>
           <Button
              variant={inWatchlist ? 'default' : 'outline'}
              size="sm"
              onClick={toggleWatchlist}
              className="gap-2"
            >
              <Star className={`h-4 w-4 ${inWatchlist ? 'fill-current' : ''}`} />
              {inWatchlist ? 'Watchlist' : 'Watch'}
            </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
           {/* Main Content Column */}
           <div className="col-span-2 space-y-4">
             <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                 <div className="space-y-1">
                    <CardTitle className="text-base font-normal text-muted-foreground">Current Price</CardTitle>
                    <div className="flex items-baseline space-x-2">
                       <span className="text-3xl font-bold">{formatCurrency(crypto.current_price)}</span>
                       <span className={`flex items-center text-sm font-medium ${isUp ? 'text-green-500' : 'text-red-500'}`}>
                          {isUp ? <TrendingUp className="mr-1 h-4 w-4" /> : <TrendingDown className="mr-1 h-4 w-4" />}
                          {formatPercentage(crypto.price_change_percentage_24h)}
                       </span>
                    </div>
                 </div>
                 <div className="flex items-center space-x-1">
                    {timeRanges.map((range) => (
                        <Button
                          key={range.value}
                          variant={timeRange === range.value ? 'secondary' : 'ghost'}
                          size="sm"
                          onClick={() => setTimeRange(range.value)}
                          className="h-8 text-xs"
                        >
                          {range.label}
                        </Button>
                      ))}
                 </div>
              </CardHeader>
              <CardContent>
                 <div className="h-[350px] w-full mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={chartData}>
                        <defs>
                          <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={isUp ? '#22c55e' : '#ef4444'} stopOpacity={0.3}/>
                            <stop offset="95%" stopColor={isUp ? '#22c55e' : '#ef4444'} stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="4 4" />
                        <XAxis 
                          dataKey="timestamp" 
                          tickFormatter={(val) => formatChartDate(val, timeRange)}
                          axisLine={false}
                          tickLine={false}
                          tickMargin={8}
                          minTickGap={30}
                          fontSize={12}
                          stroke="var(--muted-foreground)"
                        />
                        <YAxis 
                          domain={['auto', 'auto']}
                          axisLine={false}
                          tickLine={false}
                          tickMargin={8}
                          tickFormatter={(value) => `$${value.toLocaleString()}`}
                          fontSize={12}
                          stroke="var(--muted-foreground)"
                          orientation="right"
                        />
                        <Tooltip 
                            contentStyle={{ borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'var(--background)' }}
                            labelFormatter={(value) => new Date(value).toLocaleString()}
                            formatter={(value: number) => [formatCurrency(value), 'Price']}
                        />
                        <Area
                          type="monotone"
                          dataKey="price"
                          stroke={isUp ? '#22c55e' : '#ef4444'}
                          strokeWidth={3}
                          fill="url(#colorPrice)"
                          style={{ filter: `drop-shadow(0px 0px 20px ${isUp ? '#22c55e' : '#ef4444'})` }}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                 </div>
              </CardContent>
           </Card>

           {/* About Section */}
           {crypto.description && (
             <Card>
               <CardHeader>
                 <CardTitle>About {crypto.name}</CardTitle>
               </CardHeader>
               <CardContent>
                 <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground" dangerouslySetInnerHTML={{ __html: crypto.description }} />
               </CardContent>
             </Card>
           )}

           {/* Resources Section */}
           {crypto.links && (
            <Card>
              <CardHeader>
                <CardTitle>Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {crypto.links.homepage && crypto.links.homepage[0] && (
                    <Link href={crypto.links.homepage[0]} target="_blank">
                      <Button variant="outline" size="sm" className="gap-2 h-8">
                        <Globe className="h-3.5 w-3.5" /> Website
                      </Button>
                    </Link>
                  )}
                  {crypto.links.blockchain_site && crypto.links.blockchain_site[0] && (
                    <Link href={crypto.links.blockchain_site[0]} target="_blank">
                      <Button variant="outline" size="sm" className="gap-2 h-8">
                        <ExternalLink className="h-3.5 w-3.5" /> Explorer
                      </Button>
                    </Link>
                  )}
                  {crypto.links.twitter_screen_name && (
                    <Link href={`https://twitter.com/${crypto.links.twitter_screen_name}`} target="_blank">
                      <Button variant="outline" size="sm" className="gap-2 h-8">
                        <Twitter className="h-3.5 w-3.5" /> Twitter
                      </Button>
                    </Link>
                  )}
                  {crypto.links.repos_url?.github && crypto.links.repos_url.github[0] && (
                    <Link href={crypto.links.repos_url.github[0]} target="_blank">
                      <Button variant="outline" size="sm" className="gap-2 h-8">
                         <div className="h-3.5 w-3.5 flex items-center justify-center font-bold">G</div> GitHub
                      </Button>
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>
           )}
           </div>

           {/* Details Column */}
           <div className="space-y-4">
              <Card>
                 <CardHeader>
                    <CardTitle>Market Stats</CardTitle>
                 </CardHeader>
                 <CardContent className="grid gap-4">
                    <div className="flex items-center justify-between">
                       <div className="flex items-center text-sm text-muted-foreground">
                          <div className="rounded-lg bg-primary/10 p-2 text-primary mr-3">
                             <Activity className="h-4 w-4" />
                          </div>
                          Market Cap
                       </div>
                       <div className="font-medium">{formatLargeNumber(crypto.market_cap)}</div>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                       <div className="flex items-center text-sm text-muted-foreground">
                          <div className="rounded-lg bg-primary/10 p-2 text-primary mr-3">
                             <BarChart3 className="h-4 w-4" />
                          </div>
                          Volume (24h)
                       </div>
                       <div className="font-medium">{formatLargeNumber(crypto.total_volume)}</div>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                       <div className="flex items-center text-sm text-muted-foreground">
                          <div className="rounded-lg bg-primary/10 p-2 text-primary mr-3">
                             <DollarSign className="h-4 w-4" />
                          </div>
                          High (24h)
                       </div>
                       <div className="font-medium text-green-500">{formatCurrency(crypto.high_24h)}</div>
                    </div>
                    <Separator />
                     <div className="flex items-center justify-between">
                       <div className="flex items-center text-sm text-muted-foreground">
                          <div className="rounded-lg bg-primary/10 p-2 text-primary mr-3">
                             <DollarSign className="h-4 w-4" />
                          </div>
                          Low (24h)
                       </div>
                       <div className="font-medium text-red-500">{formatCurrency(crypto.low_24h)}</div>
                    </div>
                 </CardContent>
              </Card>

              <Card>
                 <CardHeader>
                    <CardTitle>Supply Information</CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-4">
                     <div>
                        <div className="text-sm font-medium mb-1">Circulating Supply</div>
                        <div className="text-2xl font-bold">{formatLargeNumber(crypto.circulating_supply)}</div>
                        <div className="h-2 w-full bg-secondary mt-2 rounded-full overflow-hidden">
                           <div 
                              className="h-full bg-primary" 
                              style={{ width: `${(crypto.circulating_supply / (crypto.total_supply || crypto.circulating_supply)) * 100}%` }}
                           />
                        </div>
                     </div>
                     <div className="grid grid-cols-2 gap-4 pt-2">
                        <div>
                           <div className="text-xs text-muted-foreground">Total Supply</div>
                           <div className="font-medium text-sm">{formatLargeNumber(crypto.total_supply)}</div>
                        </div>
                        <div>
                           <div className="text-xs text-muted-foreground">Max Supply</div>
                           <div className="font-medium text-sm">{crypto.max_supply ? formatLargeNumber(crypto.max_supply) : '∞'}</div>
                        </div>
                     </div>
                 </CardContent>
              </Card>

              <Card>
                 <CardHeader>
                    <CardTitle>Historical Performance</CardTitle>
                 </CardHeader>
                 <CardContent className="grid gap-4">
                    <div className="flex items-center justify-between">
                       <div className="flex items-center text-sm text-muted-foreground">
                          <TrendingUp className="mr-2 h-4 w-4 text-green-500" /> All-Time High
                       </div>
                       <div className="text-right">
                          <div className="font-medium">{formatCurrency(crypto.ath)}</div>
                          <div className="text-xs text-muted-foreground">{crypto.ath_date ? new Date(crypto.ath_date).toLocaleDateString() : '-'}</div>
                       </div>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                       <div className="flex items-center text-sm text-muted-foreground">
                          <TrendingDown className="mr-2 h-4 w-4 text-red-500" /> All-Time Low
                       </div>
                       <div className="text-right">
                          <div className="font-medium">{formatCurrency(crypto.atl)}</div>
                          <div className="text-xs text-muted-foreground">{crypto.atl_date ? new Date(crypto.atl_date).toLocaleDateString() : '-'}</div>
                       </div>
                    </div>
                 </CardContent>
              </Card>
           </div>
        </div>
      </motion.div>
    </div>
  )
}
