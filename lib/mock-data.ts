
import { Cryptocurrency } from './types'

export const MOCK_CRYPTO_LIST: Cryptocurrency[] = [
  {
    id: 'bitcoin',
    symbol: 'btc',
    name: 'Bitcoin',
    image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
    current_price: 65432,
    market_cap: 1200000000000,
    market_cap_rank: 1,
    fully_diluted_valuation: 1300000000000,
    total_volume: 35000000000,
    high_24h: 66000,
    low_24h: 64000,
    price_change_24h: 1200,
    price_change_percentage_24h: 1.8,
    market_cap_change_24h: 20000000000,
    market_cap_change_percentage_24h: 1.6,
    circulating_supply: 19500000,
    total_supply: 21000000,
    max_supply: 21000000,
    ath: 73700,
    ath_change_percentage: -11.2,
    ath_date: '2024-03-14T00:00:00.000Z',
    atl: 67.81,
    atl_change_percentage: 95000,
    atl_date: '2013-07-06T00:00:00.000Z',
    last_updated: new Date().toISOString(),
    sparkline_in_7d: {
      price: Array.from({ length: 168 }, () => 64000 + Math.random() * 2000)
    },
    price_change_percentage_7d_in_currency: 4.5
  },
  {
    id: 'ethereum',
    symbol: 'eth',
    name: 'Ethereum',
    image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
    current_price: 3450,
    market_cap: 400000000000,
    market_cap_rank: 2,
    fully_diluted_valuation: null,
    total_volume: 15000000000,
    high_24h: 3500,
    low_24h: 3350,
    price_change_24h: 80,
    price_change_percentage_24h: 2.3,
    market_cap_change_24h: 8000000000,
    market_cap_change_percentage_24h: 2.1,
    circulating_supply: 120000000,
    total_supply: 120000000,
    max_supply: null,
    ath: 4878,
    ath_change_percentage: -29.2,
    ath_date: '2021-11-10T00:00:00.000Z',
    atl: 0.43,
    atl_change_percentage: 800000,
    atl_date: '2015-10-20T00:00:00.000Z',
    last_updated: new Date().toISOString(),
    sparkline_in_7d: {
      price: Array.from({ length: 168 }, () => 3300 + Math.random() * 300)
    },
    price_change_percentage_7d_in_currency: 8.2
  },
  {
    id: 'solana',
    symbol: 'sol',
    name: 'Solana',
    image: 'https://assets.coingecko.com/coins/images/4128/large/solana.png',
    current_price: 145,
    market_cap: 65000000000,
    market_cap_rank: 5,
    fully_diluted_valuation: 75000000000,
    total_volume: 3000000000,
    high_24h: 148,
    low_24h: 140,
    price_change_24h: 3.5,
    price_change_percentage_24h: 2.4,
    market_cap_change_24h: 1500000000,
    market_cap_change_percentage_24h: 2.3,
    circulating_supply: 443000000,
    total_supply: 572000000,
    max_supply: null,
    ath: 259,
    ath_change_percentage: -44,
    ath_date: '2021-11-06T00:00:00.000Z',
    atl: 0.5,
    atl_change_percentage: 28000,
    atl_date: '2020-05-11T00:00:00.000Z',
    last_updated: new Date().toISOString(),
    sparkline_in_7d: {
      price: Array.from({ length: 168 }, () => 140 + Math.random() * 10)
    },
    price_change_percentage_7d_in_currency: 12.5
  },
  {
    id: 'ripple',
    symbol: 'xrp',
    name: 'XRP',
    image: 'https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png',
    current_price: 0.62,
    market_cap: 34000000000,
    market_cap_rank: 6,
    fully_diluted_valuation: 62000000000,
    total_volume: 1200000000,
    high_24h: 0.63,
    low_24h: 0.60,
    price_change_24h: 0.01,
    price_change_percentage_24h: 1.6,
    market_cap_change_24h: 500000000,
    market_cap_change_percentage_24h: 1.5,
    circulating_supply: 55000000000,
    total_supply: 100000000000,
    max_supply: 100000000000,
    ath: 3.40,
    ath_change_percentage: -81,
    ath_date: '2018-01-07T00:00:00.000Z',
    atl: 0.002,
    atl_change_percentage: 26000,
    atl_date: '2014-05-22T00:00:00.000Z',
    last_updated: new Date().toISOString(),
    sparkline_in_7d: {
      price: Array.from({ length: 168 }, () => 0.60 + Math.random() * 0.05)
    },
    price_change_percentage_7d_in_currency: -2.1
  },
  {
    id: 'dogecoin',
    symbol: 'doge',
    name: 'Dogecoin',
    image: 'https://assets.coingecko.com/coins/images/5/large/dogecoin.png',
    current_price: 0.16,
    market_cap: 23000000000,
    market_cap_rank: 8,
    fully_diluted_valuation: null,
    total_volume: 1800000000,
    high_24h: 0.17,
    low_24h: 0.15,
    price_change_24h: 0.008,
    price_change_percentage_24h: 5.2,
    market_cap_change_24h: 1200000000,
    market_cap_change_percentage_24h: 5.1,
    circulating_supply: 143000000000,
    total_supply: 143000000000,
    max_supply: null,
    ath: 0.73,
    ath_change_percentage: -78,
    ath_date: '2021-05-08T00:00:00.000Z',
    atl: 0.00008,
    atl_change_percentage: 180000,
    atl_date: '2015-05-06T00:00:00.000Z',
    last_updated: new Date().toISOString(),
    sparkline_in_7d: {
      price: Array.from({ length: 168 }, () => 0.15 + Math.random() * 0.03)
    },
    price_change_percentage_7d_in_currency: 8.4
  }
];

export function generateMockChartData(days: number | string): { timestamp: number; price: number }[] {
  const d = days === 'max' ? 365 : Number(days) || 7;
  const now = Date.now();
  const dataPoints = 100;
  const data = [];
  let price = 50000 + Math.random() * 10000;

  for (let i = dataPoints; i >= 0; i--) {
    const time = now - (i * d * 24 * 60 * 60 * 1000) / dataPoints;
    price = price + (Math.random() - 0.5) * 1000;
    data.push({
      timestamp: time,
      price: Math.max(0, price)
    });
  }
  return data;
}
