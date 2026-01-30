import { NextResponse } from 'next/server'

const COINGECKO_API = 'https://api.coingecko.com/api/v3'

export async function GET() {
  try {
    const response = await fetch(`${COINGECKO_API}/global`, {
      headers: {
        'Accept': 'application/json',
      },
      next: { revalidate: 300 } // Cache for 5 minutes
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.warn(`CoinGecko API error (using mock data): ${response.status} ${errorText}`)
      // Fallback Mock Data
      return NextResponse.json({
        total_market_cap: 2500000000000,
        total_volume: 80000000000,
        market_cap_percentage: { btc: 52.5, eth: 16.8 },
        market_cap_change_percentage_24h_usd: 1.25
      })
    }

    const result = await response.json()
    const data = result.data
    
    // Format the response to match our types - extract USD values
    const formattedData = {
      total_market_cap: data.total_market_cap?.usd || 0,
      total_volume: data.total_volume?.usd || 0,
      market_cap_percentage: data.market_cap_percentage || {},
      market_cap_change_percentage_24h_usd: data.market_cap_change_percentage_24h_usd || 0
    }
    
    return NextResponse.json(formattedData)
  } catch (error) {
    console.error('Error fetching global market data:', error)
    // Fallback Mock Data
    return NextResponse.json({
        total_market_cap: 2500000000000,
        total_volume: 80000000000,
        market_cap_percentage: { btc: 52.5, eth: 16.8 },
        market_cap_change_percentage_24h_usd: 1.25
      })
  }
}
