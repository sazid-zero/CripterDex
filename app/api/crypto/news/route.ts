import { NextResponse } from 'next/server'

const MOCK_NEWS = [
  {
    id: '1',
    title: 'Bitcoin Surges Past $45k as Institutional Adoption Grows',
    description: 'The world\'s largest cryptocurrency has seen a significant rally this week, driven by renewed interest from major financial institutions and the approval of new ETFs.',
    url: 'https://coindesk.com',
    source: 'CoinDesk',
    published_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    image_url: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?q=80&w=2069&auto=format&fit=crop',
    categories: ['Bitcoin', 'Market']
  },
  {
    id: '2',
    title: 'Ethereum Layer 2 Solutions Reach Record Total Value Locked',
    description: 'Scaling solutions for Ethereum are seeing unprecedented growth as users seek lower fees and faster transaction times.',
    url: 'https://cointelegraph.com',
    source: 'CoinTelegraph',
    published_at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
    image_url: 'https://images.unsplash.com/photo-1622790698141-94e30457ef12?q=80&w=2072&auto=format&fit=crop',
    categories: ['Ethereum', 'DeFi']
  },
  {
    id: '3',
    title: 'Regulatory Framework for Stablecoins Proposed by Central Bank',
    description: 'New guidelines aim to provide clarity and consumer protection in the rapidly evolving stablecoin market.',
    url: 'https://bloomberg.com',
    source: 'Bloomberg Crypto',
    published_at: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(), // 12 hours ago
    image_url: 'https://images.unsplash.com/photo-1605792657660-596af9009e82?q=80&w=2002&auto=format&fit=crop',
    categories: ['Regulation', 'Stablecoins']
  },
  {
    id: '4',
    title: 'Web3 Gaming Sector Shows Resilience Despite Market Volatility',
    description: 'Blockchain-based games continue to attract users and investment, signaling a long-term shift in the gaming industry.',
    url: 'https://decrypt.co',
    source: 'Decrypt',
    published_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    image_url: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?q=80&w=1974&auto=format&fit=crop',
    categories: ['Gaming', 'Web3']
  },
  {
    id: '5',
    title: 'New DeFi Protocol Promises Higher Yields with Lower Risk',
    description: 'A novel algorithmic approach to yield farming claims to solve the issue of impermanent loss for liquidity providers.',
    url: 'https://theblock.co',
    source: 'The Block',
    published_at: new Date(Date.now() - 1000 * 60 * 60 * 28).toISOString(), // 28 hours ago
    image_url: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2032&auto=format&fit=crop',
    categories: ['DeFi', 'Technology']
  },
  {
    id: '6',
    title: 'NFT Market Volume Rebouds in Q1 2026',
    description: 'After a quiet period, digital collectibles are seeing a resurgence in trading volume, led by blue-chip collections and utility-based NFTs.',
    url: 'https://nftnow.com',
    source: 'NFT Now',
    published_at: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(), // 36 hours ago
    image_url: 'https://images.unsplash.com/photo-1620321023374-d1a68fddadb3?q=80&w=2048&auto=format&fit=crop',
    categories: ['NFT', 'Market']
  }
]

export async function GET() {
  try {
    // Fetch from CryptoCompare Public News API
    const response = await fetch('https://min-api.cryptocompare.com/data/v2/news/?lang=EN', {
      next: { revalidate: 300 } // Revalidate every 5 minutes
    })

    if (!response.ok) {
      throw new Error(`External API error: ${response.status}`)
    }

    const data = await response.json()

    if (!data.Data || !Array.isArray(data.Data)) {
         throw new Error('Invalid API response format')
    }

    const newsItems = data.Data.map((item: any) => ({
      id: item.id,
      title: item.title,
      description: item.body,
      url: item.url,
      source: item.source_info?.name || item.source,
      published_at: new Date(item.published_on * 1000).toISOString(),
      image_url: item.imageurl,
      categories: item.tags ? item.tags.split('|').slice(0, 3) : ['Crypto']
    })).filter((item: any) => !item.source.toLowerCase().includes('investing.com'))

    return NextResponse.json(newsItems)
  } catch (error) {
    console.error('Error fetching real news, falling back to mock:', error)
    return NextResponse.json(MOCK_NEWS)
  }
}
