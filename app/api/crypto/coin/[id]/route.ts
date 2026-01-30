import { NextRequest, NextResponse } from 'next/server'
import { MOCK_CRYPTO_LIST } from '@/lib/mock-data'

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params
    const coinId = params.id
    
    console.log('Fetching coin data for:', coinId)
    
    // Fetch detailed coin data and fallback to mock if API fails (Rate Limit etc.)
    try {
        const response = await fetch(
            `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&community_data=false&developer_data=false&sparkline=true`,
            { next: { revalidate: 300 } }
        )

        if (!response.ok) {
            console.warn(`API failed for ${coinId}, falling back to mock data`)
            const mockCoin = MOCK_CRYPTO_LIST.find(c => c.id === coinId) || MOCK_CRYPTO_LIST[0]
            return NextResponse.json(mockCoin)
        }

        const data = await response.json()
        
        // Transform the data to match our Cryptocurrency interface
        const transformed = {
          id: data.id,
          symbol: data.symbol,
          name: data.name,
          image: data.image?.large || data.image?.small,
          current_price: data.market_data?.current_price?.usd,
          market_cap: data.market_data?.market_cap?.usd,
          market_cap_rank: data.market_cap_rank,
          total_volume: data.market_data?.total_volume?.usd,
          high_24h: data.market_data?.high_24h?.usd,
          low_24h: data.market_data?.low_24h?.usd,
          price_change_24h: data.market_data?.price_change_24h,
          price_change_percentage_24h: data.market_data?.price_change_percentage_24h,
          price_change_percentage_7d_in_currency: data.market_data?.price_change_percentage_7d,
          price_change_percentage_1h_in_currency: data.market_data?.price_change_percentage_1h_in_currency?.usd,
          price_change_percentage_30d_in_currency: data.market_data?.price_change_percentage_30d,
          price_change_percentage_1y_in_currency: data.market_data?.price_change_percentage_1y,
          circulating_supply: data.market_data?.circulating_supply,
          total_supply: data.market_data?.total_supply,
          max_supply: data.market_data?.max_supply,
          ath: data.market_data?.ath?.usd,
          ath_date: data.market_data?.ath_date?.usd,
          atl: data.market_data?.atl?.usd,
          atl_date: data.market_data?.atl_date?.usd,
          sparkline_in_7d: data.market_data?.sparkline_7d,
          description: data.description?.en,
          links: data.links
        }
        
        return NextResponse.json(transformed)
    } catch (e) {
        console.warn(`Fetch error for ${coinId}, using mock:`, e)
        const mockCoin = MOCK_CRYPTO_LIST.find(c => c.id === coinId) || MOCK_CRYPTO_LIST[0]
        return NextResponse.json(mockCoin)
    }
  } catch (error) {
    console.error('Error fetching coin data:', error)
    return NextResponse.json(MOCK_CRYPTO_LIST[0])
  }
}
