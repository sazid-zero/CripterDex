// Cryptocurrency Types
export interface Cryptocurrency {
  id: string
  symbol: string
  name: string
  image: string
  current_price: number
  market_cap: number
  market_cap_rank: number
  fully_diluted_valuation: number | null
  total_volume: number
  high_24h: number
  low_24h: number
  price_change_24h: number
  price_change_percentage_24h: number
  market_cap_change_24h: number
  market_cap_change_percentage_24h: number
  circulating_supply: number
  total_supply: number | null
  max_supply: number | null
  ath: number
  ath_change_percentage: number
  ath_date: string
  atl: number
  atl_change_percentage: number
  atl_date: string
  last_updated: string
  sparkline_in_7d?: {
    price: number[]
  }
  price_change_percentage_7d_in_currency?: number
  description?: string
  links?: {
    homepage?: string[]
    blockchain_site?: string[]
    official_forum_url?: string[]
    chat_url?: string[]
    announcement_url?: string[]
    twitter_screen_name?: string
    facebook_username?: string
    telegram_channel_identifier?: string
    subreddit_url?: string
    repos_url?: {
      github?: string[]
    }
  }
}

export interface CryptoChartData {
  time: number
  value: number
}

export interface MarketStats {
  total_market_cap: number
  total_volume: number
  market_cap_percentage: Record<string, number>
  market_cap_change_percentage_24h_usd: number
}

export interface WatchlistItem {
  id: string
  cryptocurrency: Cryptocurrency
  addedAt: Date
  alertPrice?: number
}

export interface PortfolioHolding {
  id: string
  cryptocurrencyId: string
  symbol: string
  name: string
  amount: number
  purchasePrice: number
  currentPrice: number
  purchaseDate: Date
}

export interface TrendingCoin {
  id: string
  coin_id: number
  name: string
  symbol: string
  market_cap_rank: number
  thumb: string
  small: string
  large: string
  slug: string
  price_btc: number
  score: number
}

export interface NewsItem {
  id: string
  title: string
  description: string
  url: string
  source: string
  published_at: string
  image_url?: string
  categories: string[]
}
