import { NextRequest, NextResponse } from 'next/server'
import { generateMockChartData } from '@/lib/mock-data'

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params
    const coinId = params.id
    const { searchParams } = new URL(request.url)
    const days = searchParams.get('days') || '7'
    
    // Check if we need to return mock data immediately due to consistent rate limits
    // In a production app, we might use a flag or Redis cache here
    
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`,
        { next: { revalidate: 300 } } // Increased cache time to 5m to avoid rate limits
      )

      if (!response.ok) {
        const errorText = await response.text()
        console.warn(`CoinGecko API error (using mock data): ${response.status} ${errorText}`)
        // Return mock data for valid fallback
        return NextResponse.json(generateMockChartData(days))
      }

      const data = await response.json()
      
      // Transform data for chart
      const chartData = data.prices.map((point: [number, number]) => ({
        timestamp: point[0],
        price: point[1]
      }))

      return NextResponse.json(chartData)
    } catch (fetchError) {
      console.warn('Fetch failed, using mock data:', fetchError)
      return NextResponse.json(generateMockChartData(days))
    }
  } catch (error) {
    console.error('Error fetching chart data:', error)
    // Even in outer catch, return something valid
    const { searchParams } = new URL(request.url)
    const days = searchParams.get('days') || '7'
    return NextResponse.json(generateMockChartData(days))
  }
}
