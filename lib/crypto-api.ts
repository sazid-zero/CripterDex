import { Cryptocurrency, MarketStats, TrendingCoin } from './types'

export async function fetchCryptoList(
  page: number = 1,
  perPage: number = 50,
  order: string = 'market_cap_desc'
): Promise<Cryptocurrency[]> {
  try {
    const response = await fetch(
      `/api/crypto/list?page=${page}&per_page=${perPage}&order=${order}`
    )
    if (!response.ok) throw new Error('Failed to fetch crypto data')
    return await response.json()
  } catch (error) {
    console.error('Error fetching crypto list:', error)
    return []
  }
}

export async function fetchCryptoDetails(id: string): Promise<any> {
  try {
    const response = await fetch(`/api/crypto/details?id=${id}`)
    if (!response.ok) throw new Error('Failed to fetch crypto details')
    return await response.json()
  } catch (error) {
    console.error('Error fetching crypto details:', error)
    return null
  }
}

export async function fetchMarketChart(
  id: string,
  days: number | string = 7
): Promise<{ timestamp: number; price: number }[]> {
  try {
    const response = await fetch(`/api/crypto/chart/${id}?days=${days}`)
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        console.error('Market chart fetch failed:', response.status, errorData)
        throw new Error(errorData.details || 'Failed to fetch market chart')
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching market chart:', error)
    return []
  }
}

export async function fetchGlobalMarketData(): Promise<MarketStats | null> {
  try {
    const response = await fetch('/api/crypto/global')
    if (!response.ok) throw new Error('Failed to fetch global market data')
    return await response.json()
  } catch (error) {
    console.error('Error fetching global market data:', error)
    return null
  }
}

export async function fetchTrendingCoins(): Promise<TrendingCoin[]> {
  try {
    const response = await fetch('/api/crypto/trending')
    if (!response.ok) throw new Error('Failed to fetch trending coins')
    return await response.json()
  } catch (error) {
    console.error('Error fetching trending coins:', error)
    return []
  }
}

export async function searchCryptos(query: string): Promise<any[]> {
  try {
    const response = await fetch(`/api/crypto/search?query=${query}`)
    if (!response.ok) throw new Error('Failed to search cryptos')
    return await response.json()
  } catch (error) {
    console.error('Error searching cryptos:', error)
    return []
  }
}

export async function fetchCryptoNews(): Promise<import('./types').NewsItem[]> {
  try {
    const response = await fetch('/api/crypto/news')
    if (!response.ok) throw new Error('Failed to fetch news')
    return await response.json()
  } catch (error) {
    console.error('Error fetching news:', error)
    return []
  }
}

export function formatCurrency(value: number | undefined | null): string {
  if (value === undefined || value === null || isNaN(value)) return '$0.00'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

export function formatLargeNumber(value: number | undefined | null): string {
  if (value === undefined || value === null || isNaN(value)) return '$0.00'
  if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`
  if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`
  if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`
  if (value >= 1e3) return `$${(value / 1e3).toFixed(2)}K`
  return formatCurrency(value)
}

export function formatPercentage(value: number | undefined | null): string {
  if (value === undefined || value === null || isNaN(value)) return 'N/A'
  return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`
}
