'use client'

import { useLinksStore } from '@/hooks/use-links-store'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Link2, BarChart3, MousePointerClick, Eye, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { GlobalNav } from '@/components/global-nav'
import { motion } from 'framer-motion'

export default function AnalyticsPage() {
  const { links } = useLinksStore()

  const totalClicks = links.reduce((sum, link) => sum + link.clicks, 0)
  const totalLinks = links.length
  const activeLinks = links.filter(link => link.isActive).length

  const sortedByClicks = [...links].sort((a, b) => b.clicks - a.clicks)
  const topLinks = sortedByClicks.slice(0, 5)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex size-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/70">
              <Link2 className="size-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              LinkNest
            </span>
          </Link>
          <div className="hidden md:block">
            <GlobalNav />
          </div>
          <Link href="/links">
            <Button variant="outline" size="sm">
              Back to Links
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Analytics</h1>
          <p className="text-muted-foreground">Track your link performance</p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <MousePointerClick className="size-6 text-primary" />
                </div>
              </div>
              <div className="text-3xl font-bold text-foreground mb-1">{totalClicks}</div>
              <div className="text-sm text-muted-foreground">Total Clicks</div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-lg bg-blue-500/10">
                  <Link2 className="size-6 text-blue-500" />
                </div>
              </div>
              <div className="text-3xl font-bold text-foreground mb-1">{totalLinks}</div>
              <div className="text-sm text-muted-foreground">Total Links</div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-lg bg-green-500/10">
                  <Eye className="size-6 text-green-500" />
                </div>
              </div>
              <div className="text-3xl font-bold text-foreground mb-1">{activeLinks}</div>
              <div className="text-sm text-muted-foreground">Active Links</div>
            </Card>
          </motion.div>
        </div>

        {/* Top Performing Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="size-5 text-primary" />
              <h2 className="text-xl font-bold text-foreground">Top Performing Links</h2>
            </div>

            {topLinks.length === 0 ? (
              <div className="text-center py-12">
                <BarChart3 className="size-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No click data yet</p>
                <p className="text-sm text-muted-foreground mt-2">Start sharing your links to see analytics</p>
              </div>
            ) : (
              <div className="space-y-4">
                {topLinks.map((link, index) => {
                  const maxClicks = Math.max(...topLinks.map(l => l.clicks), 1)
                  const percentage = (link.clicks / maxClicks) * 100

                  return (
                    <motion.div
                      key={link.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                      className="space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary">
                            {index + 1}
                          </div>
                          <div>
                            <div className="font-semibold text-foreground">{link.title}</div>
                            <a 
                              href={link.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-xs text-muted-foreground hover:text-primary transition-colors"
                            >
                              {link.url.length > 40 ? link.url.substring(0, 40) + '...' : link.url}
                            </a>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-foreground">{link.clicks}</div>
                          <div className="text-xs text-muted-foreground">clicks</div>
                        </div>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                          className="h-full bg-gradient-to-r from-primary to-primary/70"
                        />
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            )}
          </Card>
        </motion.div>

        {/* Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-8 grid gap-6 md:grid-cols-2"
        >
          <Card className="p-6">
            <h3 className="font-semibold text-foreground mb-4">Quick Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Average clicks per link</span>
                <span className="font-semibold text-foreground">
                  {totalLinks > 0 ? (totalClicks / totalLinks).toFixed(1) : '0'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Most clicked link</span>
                <span className="font-semibold text-foreground">
                  {topLinks[0] ? topLinks[0].title : 'N/A'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Inactive links</span>
                <span className="font-semibold text-foreground">
                  {totalLinks - activeLinks}
                </span>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5">
            <h3 className="font-semibold text-foreground mb-2">Pro Tip</h3>
            <p className="text-sm text-muted-foreground">
              Share your LinkNest page in your social media bios to get more clicks! The more visible your link, the better your analytics will be.
            </p>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
