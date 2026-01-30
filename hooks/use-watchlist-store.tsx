'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { WatchlistItem, Cryptocurrency } from '@/lib/types'

interface WatchlistStore {
  watchlist: WatchlistItem[]
  addToWatchlist: (crypto: Cryptocurrency) => void
  removeFromWatchlist: (id: string) => void
  isInWatchlist: (id: string) => boolean
  updateAlertPrice: (id: string, alertPrice: number) => void
}

export const useWatchlistStore = create<WatchlistStore>()(
  persist(
    (set, get) => ({
      watchlist: [],
      
      addToWatchlist: (crypto) => {
        const exists = get().watchlist.find((item) => item.id === crypto.id)
        if (!exists) {
          set((state) => ({
            watchlist: [
              ...state.watchlist,
              {
                id: crypto.id,
                cryptocurrency: crypto,
                addedAt: new Date(),
              },
            ],
          }))
        }
      },
      
      removeFromWatchlist: (id) => {
        set((state) => ({
          watchlist: state.watchlist.filter((item) => item.id !== id),
        }))
      },
      
      isInWatchlist: (id) => {
        return get().watchlist.some((item) => item.id === id)
      },
      
      updateAlertPrice: (id, alertPrice) => {
        set((state) => ({
          watchlist: state.watchlist.map((item) =>
            item.id === id ? { ...item, alertPrice } : item
          ),
        }))
      },
    }),
    {
      name: 'watchlist-storage',
    }
  )
)
