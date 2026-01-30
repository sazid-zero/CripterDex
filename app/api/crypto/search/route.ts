import { NextRequest, NextResponse } from 'next/server'
import { MOCK_CRYPTO_LIST } from '@/lib/mock-data'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('query')

  if (!query) {
    return NextResponse.json([])
  }

  try {
    const response = await fetch(`https://api.coingecko.com/api/v3/search?query=${query}`, {
       headers: {
        'Accept': 'application/json',
       },
       next: { revalidate: 300 }
    })

    if (!response.ok) {
        throw new Error('API Error')
    }

    const data = await response.json()
    // Returns { coins: [...], exchanges: [...], ... }
    return NextResponse.json(data.coins || [])
  } catch (error) {
     console.warn('Search API failed, using mock data')
     const lowerQuery = query.toLowerCase()
     const filtered = MOCK_CRYPTO_LIST.filter(coin => 
        coin.name.toLowerCase().includes(lowerQuery) || 
        coin.symbol.toLowerCase().includes(lowerQuery)
     ).map(coin => ({
         id: coin.id,
         name: coin.name,
         symbol: coin.symbol,
         market_cap_rank: coin.market_cap_rank,
         thumb: coin.image,
         large: coin.image
     }))
     return NextResponse.json(filtered)
  }
}
