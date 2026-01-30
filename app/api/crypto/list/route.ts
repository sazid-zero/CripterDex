import { NextRequest, NextResponse } from 'next/server'
import { MOCK_CRYPTO_LIST } from '@/lib/mock-data'

const COINGECKO_API = 'https://api.coingecko.com/api/v3'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const page = searchParams.get('page') || '1'
  const perPage = searchParams.get('per_page') || '50'
  const order = searchParams.get('order') || 'market_cap_desc'

  try {
    const response = await fetch(
      `${COINGECKO_API}/coins/markets?vs_currency=usd&order=${order}&per_page=${perPage}&page=${page}&sparkline=true&price_change_percentage=7d`,
      {
        headers: {
          'Accept': 'application/json',
        },
        next: { revalidate: 300 } // Cache for 5 minutes
      }
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.warn(`CoinGecko API error (using mock data): ${response.status} ${errorText}`)
      // Fallback to mock data on error (e.g. Rate Limit 429)
      return NextResponse.json(MOCK_CRYPTO_LIST)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching crypto list (using mock data):', error)
    return NextResponse.json(MOCK_CRYPTO_LIST)
  }
}
