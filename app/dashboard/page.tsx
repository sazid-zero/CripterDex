'use client'

import React, { useEffect, useState } from 'react'
import { useToast } from '@/hooks/use-toast'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { TrendingUp, TrendingDown, DollarSign, Activity, BarChart3, ArrowRight, Flame, PieChart, CandlestickChart, LineChart } from 'lucide-react'
import { fetchCryptoList, fetchGlobalMarketData, fetchTrendingCoins, fetchMarketChart, formatCurrency, formatLargeNumber, formatPercentage } from '@/lib/crypto-api'
import { Cryptocurrency, MarketStats, TrendingCoin } from '@/lib/types'
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar } from 'recharts'
import { formatChartDate } from '@/lib/utils'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useIsMobile } from '@/components/ui/use-mobile'

export default function DashboardPage() {
  const { toast } = useToast()
  const [topCryptos, setTopCryptos] = useState<Cryptocurrency[]>([])
  const [marketStats, setMarketStats] = useState<MarketStats | null>(null)
  const [trendingCoins, setTrendingCoins] = useState<TrendingCoin[]>([])
  const [loading, setLoading] = useState(true)
  const [dashboardChartData, setDashboardChartData] = useState<{timestamp: number, price: number}[]>([])
  const [selectedCurrency, setSelectedCurrency] = useState('bitcoin')
  const [timeRange, setTimeRange] = useState('7')
  const [chartType, setChartType] = useState<'area' | 'bar'>('area')
  const [isChartLoading, setIsChartLoading] = useState(false)
  const isMobile = useIsMobile()

  useEffect(() => {
    loadDashboardData()
  }, [])

  useEffect(() => {
    loadChartData()
  }, [selectedCurrency, timeRange])

  const loadChartData = async () => {
    setIsChartLoading(true)
    try {
        const data = await fetchMarketChart(selectedCurrency, timeRange)
        setDashboardChartData(data)
    } catch (error) {
        console.error("Failed to load chart data", error)
        toast({
            title: "Error",
            description: "Failed to load chart data. Using mock data.",
            variant: "destructive",
        })
    } finally {
        setIsChartLoading(false)
    }
  }

  const loadDashboardData = async () => {
    setLoading(true)
    try {
      const [cryptos, stats, trending] = await Promise.all([
        fetchCryptoList(1, 10),
        fetchGlobalMarketData(),
        fetchTrendingCoins()
      ])
      
      setTopCryptos(cryptos)
      setMarketStats(stats)
      setTrendingCoins(trending.slice(0, 5))
      // Chart data loaded in separate effect
    } catch (error) {
      console.error(error)
      toast({
        title: "Error",
        description: "Failed to load market data. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const marketCapChange = marketStats?.market_cap_change_percentage_24h_usd || 0
  const isPositive = marketCapChange >= 0

  const selectedCoinData = topCryptos.find(c => c.id === selectedCurrency)

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-4"
      >
        {/* Top Stats Row */}
        <div className="grid grid-cols-2 gap-2 md:gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium">Total Market Cap</CardTitle>
              <div className="rounded-lg bg-primary/10 p-2 text-primary">
                 <DollarSign className="h-3 w-3 sm:h-4 sm:w-4" />
              </div>
            </CardHeader>
            <CardContent>
              {loading ? <Skeleton className="h-7 w-20" /> : (
                <>
                  <div className="text-lg sm:text-2xl font-bold">{marketStats ? formatLargeNumber(marketStats.total_market_cap) : '$0'}</div>
                  <p className="text-[10px] sm:text-xs text-muted-foreground flex items-center mt-1">
                    {isPositive ? <TrendingUp className="mr-1 h-3 w-3 text-green-500" /> : <TrendingDown className="mr-1 h-3 w-3 text-red-500" />}
                    <span className={isPositive ? 'text-green-500' : 'text-red-500'}>
                      {formatPercentage(marketCapChange)}
                    </span>
                    <span className="ml-1 hidden sm:inline">from yesterday</span>
                  </p>
                </>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium">24h Volume</CardTitle>
              <div className="rounded-lg bg-primary/10 p-2 text-primary">
                 <Activity className="h-3 w-3 sm:h-4 sm:w-4" />
              </div>
            </CardHeader>
            <CardContent>
              {loading ? <Skeleton className="h-7 w-20" /> : (
                <>
                  <div className="text-lg sm:text-2xl font-bold">{marketStats ? formatLargeNumber(marketStats.total_volume) : '$0'}</div>
                  <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">Total volume</p>
                </>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium">BTC Dominance</CardTitle>
              <div className="rounded-lg bg-primary/10 p-2 text-primary">
                 <StartIcon className="h-3 w-3 sm:h-4 sm:w-4" /> 
              </div>
            </CardHeader>
            <CardContent>
              {loading ? <Skeleton className="h-7 w-20" /> : (
                <>
                  <div className="text-lg sm:text-2xl font-bold">{marketStats ? `${marketStats.market_cap_percentage.btc.toFixed(1)}%` : '0%'}</div>
                  <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">Market share</p>
                </>
              )}
            </CardContent>
          </Card>
          <Card>
             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium">ETH Dominance</CardTitle>
              <div className="rounded-lg bg-primary/10 p-2 text-primary">
                 <PieChart className="h-3 w-3 sm:h-4 sm:w-4" />
              </div>
            </CardHeader>
             <CardContent>
              {loading ? <Skeleton className="h-7 w-20" /> : (
                <>
                  <div className="text-lg sm:text-2xl font-bold">{marketStats ? `${marketStats.market_cap_percentage.eth.toFixed(1)}%` : '0%'}</div>
                  <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">Market share</p>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Main Content Areas */}
        <div className="grid gap-2 md:gap-4 md:grid-cols-2 lg:grid-cols-7">
          {/* Main Chart */}
          <Card className="col-span-4">
            <CardHeader>
              <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <CardTitle className="flex items-center gap-2">
                        {selectedCoinData ? (
                            <>
                                <Avatar className="h-6 w-6">
                                    <AvatarImage src={selectedCoinData.image} />
                                    <AvatarFallback>{selectedCoinData.symbol[0]}</AvatarFallback>
                                </Avatar>
                                {selectedCoinData.name} Price
                            </>
                        ) : 'Stats'}
                    </CardTitle>
                    <CardDescription>
                        Market performance overview
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                      <Tabs value={chartType} onValueChange={(v) => setChartType(v as any)} className="w-[100px]">
                        <TabsList className="grid w-full grid-cols-2 h-9">
                            <TabsTrigger value="area" className="px-2">
                                <LineChart className="h-4 w-4" />
                            </TabsTrigger>
                            <TabsTrigger value="bar" className="px-2">
                                <CandlestickChart className="h-4 w-4" />
                            </TabsTrigger>
                        </TabsList>
                      </Tabs>
                     <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
                        <SelectTrigger className="w-[130px] h-9">
                            <SelectValue placeholder="Select Coin" />
                        </SelectTrigger>
                        <SelectContent>
                            {topCryptos.map(c => (
                                <SelectItem key={c.id} value={c.id}>
                                    <div className="flex items-center gap-2">
                                        <img src={c.image} alt={c.name} className="w-4 h-4 rounded-full" />
                                        <span>{c.symbol.toUpperCase()}</span>
                                    </div>
                                </SelectItem>
                            ))}
                            {topCryptos.length === 0 && <SelectItem value="bitcoin">Bitcoin</SelectItem>}
                        </SelectContent>
                     </Select>
                      <Select value={timeRange} onValueChange={setTimeRange}>
                        <SelectTrigger className="w-[100px] h-9">
                            <SelectValue placeholder="Range" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="1">24 Hour</SelectItem>
                            <SelectItem value="7">7 Days</SelectItem>
                            <SelectItem value="30">30 Days</SelectItem>
                            <SelectItem value="90">3 Months</SelectItem>
                            <SelectItem value="365">1 Year</SelectItem>
                        </SelectContent>
                     </Select>
                  </div>
              </div>
            </CardHeader>
            <CardContent className="pl-0 sm:pl-2">
              <div className="h-[200px] sm:h-[350px] w-full relative">
                 {(isChartLoading) && (
                      <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-[1px] z-10 rounded-lg transition-all duration-300">
                        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                      </div>
                    )}
                 {loading ? <Skeleton className="h-full w-full" /> : (
                  <ResponsiveContainer width="100%" height="100%">
                    {chartType === 'area' ? (
                        <AreaChart data={dashboardChartData}>
                        <defs>
                            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <XAxis 
                            dataKey="timestamp" 
                            tickFormatter={(val) => formatChartDate(val, timeRange)}
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickCount={timeRange === '1' ? 6 : timeRange === '7' ? 7 : 5}
                            minTickGap={50}
                            fontSize={isMobile ? 10 : 12}
                            stroke="var(--muted-foreground)"
                        />
                        <YAxis 
                            tickFormatter={(value) => `$${value.toLocaleString()}`}
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            width={60}
                            fontSize={isMobile ? 10 : 12}
                            domain={['auto', 'auto']}
                            stroke="var(--muted-foreground)"
                        />
                        <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="4 4" />
                        <Tooltip 
                            contentStyle={{ borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'var(--background)' }}
                            labelFormatter={(value) => new Date(value).toLocaleString()}
                            formatter={(value: number) => [formatCurrency(value), 'Price']}
                        />
                        <Area
                            type="monotone"
                            dataKey="price"
                            stroke="var(--primary)"
                            strokeWidth={2}
                            fill="url(#colorPrice)"
                            style={{ filter: "drop-shadow(0px 0px 20px var(--primary))" }}
                        />
                        </AreaChart>
                    ) : (
                        <BarChart data={dashboardChartData}>
                            <XAxis 
                                dataKey="timestamp" 
                                tickFormatter={(val) => formatChartDate(val, timeRange)}
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                tickCount={timeRange === '1' ? 6 : timeRange === '7' ? 7 : 5}
                                minTickGap={50}
                                fontSize={isMobile ? 10 : 12}
                                stroke="var(--muted-foreground)"
                            />
                             <YAxis 
                                tickFormatter={(value) => `$${value.toLocaleString()}`}
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                width={60}
                                fontSize={isMobile ? 10 : 12}
                                domain={['auto', 'auto']}
                                stroke="var(--muted-foreground)"
                            />
                            <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="4 4" />
                            <Tooltip 
                                cursor={{fill: 'transparent'}}
                                contentStyle={{ borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'var(--background)' }}
                                labelFormatter={(value) => new Date(value).toLocaleString()}
                                formatter={(value: number) => [formatCurrency(value), 'Price']}
                            />
                            <Bar dataKey="price" fill="var(--primary)" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    )}
                  </ResponsiveContainer>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Trending Coins */}
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Flame className="h-4 w-4 text-orange-500" />
                Trending Coins
              </CardTitle>
              <CardDescription>
                Most searched in the last 24h
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {loading ? Array(5).fill(0).map((_, i) => <Skeleton key={i} className="h-12 w-full" />) : (
                  trendingCoins.map((coin) => (
                    <Link key={coin.id} href={`/coin/${coin.id}`}>
                      <div className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-lg transition-colors">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={coin.thumb} alt={coin.name} />
                            <AvatarFallback>{coin.symbol[0].toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div className="grid gap-1">
                            <p className="text-sm font-medium leading-none">{coin.name}</p>
                            <p className="text-xs text-muted-foreground">{coin.symbol}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                           <span className="text-sm text-muted-foreground">#{coin.market_cap_rank}</span>
                        </div>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Assets Table */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <div>
              <CardTitle className="text-xl">Top Cryptocurrencies</CardTitle>
              <CardDescription className="text-sm mt-1">
                The top 10 cryptocurrencies by market cap
              </CardDescription>
            </div>
            <Link href="/markets">
              <Button variant="ghost" className="h-9 text-sm">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
             <Table>
              <TableHeader>
                <TableRow className="h-12 bg-muted/30 hover:bg-transparent">
                  <TableHead className="w-[60px] text-sm font-bold pl-6">#</TableHead>
                  <TableHead className="text-sm font-bold">Asset</TableHead>
                  <TableHead className="text-right text-sm font-bold">Price</TableHead>
                  <TableHead className="text-right text-sm font-bold">Change (24h)</TableHead>
                  <TableHead className="text-right text-sm font-bold hidden md:table-cell pr-6">Market Cap</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                    Array(5).fill(0).map((_, i) => (
                      <TableRow key={i} className="h-16">
                        <TableCell className="pl-6"><Skeleton className="h-4 w-4" /></TableCell>
                        <TableCell><Skeleton className="h-8 w-32" /></TableCell>
                        <TableCell><Skeleton className="h-4 w-20 ml-auto" /></TableCell>
                        <TableCell><Skeleton className="h-4 w-16 ml-auto" /></TableCell>
                        <TableCell className="pr-6"><Skeleton className="h-4 w-24 ml-auto" /></TableCell>
                      </TableRow>
                    ))
                ) : (
                  topCryptos.map((crypto) => {
                     const isUp = crypto.price_change_percentage_24h >= 0
                     return (
                      <TableRow key={crypto.id} className="cursor-pointer hover:bg-muted/50 transition-colors h-16 text-base" onClick={() => window.location.href = `/coin/${crypto.id}`}>
                        <TableCell className="font-medium text-muted-foreground pl-6 text-sm">{crypto.market_cap_rank}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-4 py-1">
                             <Avatar className="h-9 w-9 border border-border/50 shadow-sm">
                                <AvatarImage src={crypto.image} />
                                <AvatarFallback>{crypto.symbol[0]}</AvatarFallback>
                             </Avatar>
                             <div className="flex flex-col gap-0.5">
                                 <span className="text-base font-semibold leading-none">{crypto.name}</span>
                                 <span className="text-sm text-muted-foreground uppercase tracking-wide">{crypto.symbol}</span>
                             </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-right font-medium">{formatCurrency(crypto.current_price)}</TableCell>
                        <TableCell className="text-right">
                           <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-sm font-medium gap-1.5 ${isUp ? 'text-green-600 bg-green-500/10' : 'text-red-600 bg-red-500/10'}`}>
                             {isUp ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
                             {formatPercentage(crypto.price_change_percentage_24h)}
                           </div>
                        </TableCell>
                        <TableCell className="text-right hidden md:table-cell text-muted-foreground pr-6 text-sm">
                          {formatLargeNumber(crypto.market_cap)}
                        </TableCell>
                      </TableRow>
                    )
                  })
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

function StartIcon(props: any) {
    return (
        <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        >
        <path d="M12 2v20" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
    )
}
