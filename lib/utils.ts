import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date)
}

export function formatChartDate(timestamp: number, range: string | number): string {
  const date = new Date(timestamp)
  const r = String(range)
  if (r === '0.04' || r === '1' || r === '1H' || r === '1D') {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  } else if (r === '7' || r === '30' || r === '90' || r === '1W' || r === '1M' || r === '3M' || r === '3D') {
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' })
  } else {
    return date.toLocaleDateString([], { month: 'short', year: '2-digit' })
  }
}

export function copyToClipboard(text: string): Promise<void> {
  return navigator.clipboard.writeText(text)
}

export function generateAxisTicks(data: { timestamp: number }[], range: string | number): number[] | undefined {
  if (!data || data.length === 0) return undefined
  const r = String(range)
  
  // Sort data just in case? Usually API returns sorted.
  const timestamps = data.map(d => d.timestamp)
  const min = Math.min(...timestamps)
  const max = Math.max(...timestamps)

  if (r === '7' || r === '1W') {
    const ticks = []
    const day = 24 * 60 * 60 * 1000
    // Try to start from a "nice" time if possible? 
    // Assuming min is close to now-7d. 
    for (let t = min; t <= max; t += day) {
      ticks.push(t)
    }
    return ticks
  }
  
  if (r === '30' || r === '1M') {
      const ticks = []
      const step = 5 * 24 * 60 * 60 * 1000
      for (let t = min; t <= max; t += step) ticks.push(t)
      return ticks
  }

  if (r === '3' || r === '3D') {
      const ticks = []
      const step = 12 * 60 * 60 * 1000
      for (let t = min; t <= max; t += step) ticks.push(t)
      return ticks
  }

  return undefined
}
