import { NextResponse } from 'next/server'
import { MOCK_CRYPTO_LIST } from '@/lib/mock-data'

const COINGECKO_API = 'https://api.coingecko.com/api/v3'

export async function GET() {
  try {
    const response = await fetch(`${COINGECKO_API}/search/trending`, {
      headers: {
        'Accept': 'application/json',
      },
      next: { revalidate: 300 } // Cache for 5 minutes
    })

    if (!response.ok) {
        const errorText = await response.text()
        console.warn(`CoinGecko API error (using mock data): ${response.status} ${errorText}`)
        // Fallback to mock trending data
        const mockTrending = MOCK_CRYPTO_LIST.slice(0, 4).map(coin => ({
          item: {
            id: coin.id,
            coin_id: coin.id as number,     // Coerce string id for mock compatibility
            name: coin.name,
            symbol: coin.symbol,
            market_cap_rank: coin.market_cap_rank,
            thumb: coin.image,
            small: coin.image,
            large: coin.image,
            slug: coin.id,
            price_btc: 0.0001,
            score: 0,
            data: {
              price: coin.current_price,
              price_btc: '0.0001',
              price_change_percentage_24h: { usd: coin.price_change_percentage_24h },
              market_cap: coin.market_cap,
              market_cap_btc: '1000',
              total_volume: coin.total_volume,
              total_volume_btc: '100',
              sparkline: coin.image,
              content: null
            }
          }
        }))
        return NextResponse.json(mockTrending.map(item => item.item))
    }

    const data = await response.json()
    return NextResponse.json(data.coins.map((item: any) => item.item))
  } catch (error) {
    console.error('Error fetching trending coins:', error)
     // Fallback to mock trending data
     const mockTrending = MOCK_CRYPTO_LIST.slice(0, 4).map(coin => ({
        // ... (simplified mock item structure for fallback)
        id: coin.id,
        name: coin.name,
        symbol: coin.symbol,
        market_cap_rank: coin.market_cap_rank,
        thumb: coin.image,
        small: coin.image,
        large: coin.image,
        slug: coin.id,
        price_btc: 0.0001,
        score: 0,
        data: {
            price: coin.current_price,
            price_change_percentage_24h: { usd: coin.price_change_percentage_24h }
        }
      }))
    return NextResponse.json(mockTrending)
  }
}
