'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { GlobalNav } from '@/components/global-nav'
import { TrendingUp, BarChart3, ArrowRight, Eye, Zap, Sparkles, Send, Globe, Star, MousePointerClick, LineChart, Wallet, Section, Archive, Search, Calendar, Tag, CheckSquare, Newspaper } from 'lucide-react'
import { motion } from 'framer-motion'
import Lenis from "lenis";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

const slideInVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'markets'>('dashboard')
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/30">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex size-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/70">
              <TrendingUp className="size-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              CripterDex
            </span>
          </Link>
          <div className="hidden md:block">
            <GlobalNav />
          </div>
          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <Button className="bg-primary hover:bg-primary/90">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 overflow-hidden">
        {/* Decorative gradient orbs */}
        <div className="absolute top-1/4 -left-48 size-96 bg-primary/20 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-1/4 -right-48 size-96 bg-primary/20 rounded-full blur-3xl opacity-20" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center w-full relative z-10"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-6 inline-block rounded-full bg-primary/10 px-4 py-2"
          >
            <span className="text-sm font-medium text-primary">Welcome to CripterDex</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6"
          >
            Your gateway to cryptocurrency{' '}
            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
              markets and news
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mx-auto max-w-2xl text-lg text-muted-foreground mb-8"
          >
            Track real-time cryptocurrency prices, analyze market trends, get latest news and manage your watchlist. Stay informed with market data and insights.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Link href="/dashboard">
              <Button size="lg" className="bg-primary hover:bg-primary/90 gap-2">
                Open Dashboard <ArrowRight className="size-4" />
              </Button>
            </Link>
            <Link href="/markets">
              <Button size="lg" variant="outline" className="bg-transparent gap-2">
                Explore Markets <Eye className="size-4" />
              </Button>
            </Link>
          </motion.div>

          

          {/* App Screenshot */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="max-w-5xl mx-auto"
          >
            <div className="relative group">
              <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-primary/40 to-primary/20 blur-2xl group-hover:blur-3xl transition-all duration-300" />
              <div className="relative rounded-2xl border-2 border-border bg-card shadow-2xl overflow-hidden ring-4 ring-primary/20">
                {/* Window Frame */}
                <div className="flex items-center gap-2 px-4 py-3 bg-white/5 backdrop-blur-md border-b border-white/5">
                  <div className="flex gap-1.5">
                    <div className="size-3 rounded-full bg-red-500/70" />
                    <div className="size-3 rounded-full bg-yellow-500/70" />
                    <div className="size-3 rounded-full bg-green-500/70" />
                  </div>
                  
                </div>

                {/* Screenshot Content */}
                <div className=" bg-background">
                  <img 
                    src="/ss1.png" 
                    alt="App Interface" 
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Feature Showcase - Interactive Tabs */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Powerful Features</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to track and analyze cryptocurrency markets
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex justify-center gap-4 mb-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab('dashboard')}
            className={`px-6 py-3 rounded-full font-semibold transition-all ${
              activeTab === 'dashboard'
                ? 'bg-primary text-primary-foreground shadow-lg'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            <div className="flex items-center gap-2">
              <LineChart className="size-4" />
              Dashboard
            </div>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab('markets')}
            className={`px-6 py-3 rounded-full font-semibold transition-all ${
              activeTab === 'markets'
                ? 'bg-primary text-primary-foreground shadow-lg'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            <div className="flex items-center gap-2">
              <TrendingUp className="size-4" />
              Markets
            </div>
          </motion.button>
        </div>

        {/* Mockups */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          {activeTab === 'dashboard' ? (
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">
                  Real-Time Market Overview
                </h3>
                <ul className="space-y-4 mb-8">
                  {[
                    { icon: LineChart, text: 'Live price charts and market data' },
                    { icon: TrendingUp, text: 'Track top performing cryptocurrencies' },
                    { icon: Zap, text: 'Real-time updates every 60 seconds' },
                    { icon: BarChart3, text: 'Market cap and volume analytics' },
                  ].map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="flex items-center gap-3 text-foreground"
                    >
                      <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
                        <item.icon className="size-4 text-primary" />
                      </div>
                      <span>{item.text}</span>
                    </motion.li>
                  ))}
                </ul>
                <Link href="/dashboard">
                  <Button className="bg-primary hover:bg-primary/90 gap-2">
                    Open Dashboard <ArrowRight className="size-4" />
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative"
              >
                <div className="relative group">
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary/20 to-primary/10 blur-xl group-hover:blur-2xl transition-all duration-300" />
                  <div className="relative rounded-2xl border border-border bg-card p-6 shadow-xl overflow-hidden">
                    {/* Window Frame */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex gap-1.5">
                        <div className="size-3 rounded-full bg-red-500/50" />
                        <div className="size-3 rounded-full bg-yellow-500/50" />
                        <div className="size-3 rounded-full bg-green-500/50" />
                      </div>
                    </div>

                    {/* Dashboard Content */}
                    <div className="bg-background">
                       <img 
                        src="/ss2.png" 
                        alt="Dashboard Interface" 
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative lg:order-2"
              >
                <div className="relative group">
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary/20 to-primary/10 blur-xl group-hover:blur-2xl transition-all duration-300" />
                  <div className="relative rounded-2xl border border-border bg-card p-6 shadow-xl overflow-hidden">
                    {/* Window Frame */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex gap-1.5">
                        <div className="size-3 rounded-full bg-red-500/50" />
                        <div className="size-3 rounded-full bg-yellow-500/50" />
                        <div className="size-3 rounded-full bg-green-500/50" />
                      </div>
                    </div>

                    {/* Markets Content */}
                     <div className="bg-background">
                       <img 
                        src="/ss3.png" 
                        alt="Markets Interface" 
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="lg:order-1"
              >
                <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">
                  Explore All Markets
                </h3>
                <ul className="space-y-4 mb-8">
                  {[
                    { icon: TrendingUp, text: 'Browse thousands of cryptocurrencies' },
                    { icon: Star, text: 'Add coins to your watchlist' },
                    { icon: BarChart3, text: 'Sort by price, volume, and market cap' },
                    { icon: Sparkles, text: 'Discover trending coins' },
                  ].map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="flex items-center gap-3 text-foreground"
                    >
                      <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
                        <item.icon className="size-4 text-primary" />
                      </div>
                      <span>{item.text}</span>
                    </motion.li>
                  ))}
                </ul>
                <Link href="/markets">
                  <Button className="bg-primary hover:bg-primary/90 gap-2">
                    Browse Markets <ArrowRight className="size-4" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          )}
        </motion.div>
      </section>

      {/* Benefits Section - Redesigned Bento Grid */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-4">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 backdrop-blur-sm"
            >
              <Sparkles className="size-4 text-primary" />
              <span className="text-sm font-semibold text-primary">Why CripterDex?</span>
            </motion.div>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Track crypto, stay{' '}
            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
              informed
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Built for traders and investors who need real-time market data
          </p>
        </motion.div>

        <div className="grid md:grid-cols-6 gap-4 md:gap-6">
          {/* Large Feature Card - Easy Setup */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="md:col-span-4 md:row-span-2 relative group overflow-hidden rounded-3xl border border-border/50 bg-gradient-to-br from-card via-primary/5 to-primary/10 p-8 md:p-12 hover:border-primary/50 shadow-lg hover:shadow-2xl shadow-primary/10 opacity-0"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-transparent opacity-30 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute -top-24 -right-24 size-48 bg-primary/30 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
            
            <div className="relative z-10">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                className="inline-flex items-center justify-center size-16 rounded-2xl bg-gradient-to-br from-primary to-primary/70 mb-6 shadow-lg shadow-primary/25"
              >
                <Zap className="size-8 text-primary-foreground" />
              </motion.div>
              
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Real-Time Market Data
              </h3>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6 max-w-xl">
                Get instant access to live cryptocurrency prices, charts, and market data. Stay ahead with automatic updates every 60 seconds.
              </p>
              
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 backdrop-blur-sm">
                  <div className="size-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-sm font-medium text-foreground">Live Prices</span>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 backdrop-blur-sm">
                  <div className="size-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-sm font-medium text-foreground">Auto Updates</span>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 backdrop-blur-sm">
                  <div className="size-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-sm font-medium text-foreground">Market Insights</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Watchlist Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true, margin: "-50px" }}
            className="md:col-span-2 relative group overflow-hidden rounded-3xl border border-border/50 bg-gradient-to-br from-card to-amber-500/10 p-8 hover:border-amber-500/50 shadow-lg hover:shadow-xl shadow-amber-500/10 opacity-0"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/15 via-transparent to-transparent opacity-30 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute -top-12 -right-12 size-24 bg-amber-500/30 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
            
            <div className="relative z-10">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center justify-center size-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 mb-4 shadow-lg shadow-amber-500/25"
              >
                <Star className="size-6 text-white" />
              </motion.div>
              
              <h3 className="text-xl font-bold text-foreground mb-3">
                Your Watchlist
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Save and track your favorite cryptocurrencies all in one place.
              </p>
            </div>
          </motion.div>

          {/* Charts Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true, margin: "-50px" }}
            className="md:col-span-2 relative group overflow-hidden rounded-3xl border border-border/50 bg-gradient-to-br from-card to-purple-500/10 p-8 hover:border-purple-500/50 shadow-lg hover:shadow-xl shadow-purple-500/10 opacity-0"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/15 via-transparent to-transparent opacity-30 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute -bottom-12 -left-12 size-24 bg-purple-500/30 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
            
            <div className="relative z-10">
              <motion.div
                whileHover={{ scale: 1.05, rotate: -5 }}
                className="inline-flex items-center justify-center size-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 mb-4 shadow-lg shadow-purple-500/25"
              >
                <LineChart className="size-6 text-white" />
              </motion.div>
              
              <h3 className="text-xl font-bold text-foreground mb-3">
                Price Charts
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Visualize price movements with interactive charts and historical data.
              </p>
            </div>
          </motion.div>

          {/* Markets Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true, margin: "-50px" }}
            className="md:col-span-3 relative group overflow-hidden rounded-3xl border border-border/50 bg-gradient-to-br from-card to-emerald-500/10 p-8 hover:border-emerald-500/50 shadow-lg hover:shadow-xl shadow-emerald-500/10 opacity-0"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/15 via-transparent to-transparent opacity-30 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center justify-center size-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 mb-4 shadow-lg shadow-emerald-500/25"
              >
                <TrendingUp className="size-6 text-white" />
              </motion.div>
              
              <h3 className="text-xl font-bold text-foreground mb-3">
                Market Trends
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Discover trending coins and identify market opportunities in real-time.
              </p>
            </div>
          </motion.div>

          {/* Free Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true, margin: "-50px" }}
            className="md:col-span-3 relative group overflow-hidden rounded-3xl border border-border/50 bg-gradient-to-br from-card to-blue-500/10 p-8 hover:border-blue-500/50 shadow-lg hover:shadow-xl shadow-blue-500/10 opacity-0"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/15 via-transparent to-transparent opacity-30 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center justify-center size-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 mb-4 shadow-lg shadow-blue-500/25"
              >
                <Star className="size-6 text-white" />
              </motion.div>
              
              <h3 className="text-xl font-bold text-foreground mb-3">
                Watchlist Management
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Curate a personalized list of your favorite assets to track their performance at a glance.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 p-12 text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
            Start tracking crypto markets today
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of crypto enthusiasts tracking real-time prices. Get instant access to live market data.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Open Dashboard
              </Button>
            </Link>
            <Link href="/markets">
              <Button size="lg" variant="outline" className="bg-transparent">
                Explore Markets
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>
       {/* Advanced Features Section - Redesigned with Visual Showcase */}
      <section className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        <div className="absolute top-1/4 left-1/4 size-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 size-96 bg-primary/10 rounded-full blur-3xl" />
        
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 px-4 py-2 backdrop-blur-sm border border-primary/20 mb-6"
            >
              <div className="size-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-semibold text-primary">Powerful Features</span>
            </motion.div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Everything you need to{' '}
              <span className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
                stay productive
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Advanced tools designed to give you an edge in the crypto market
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* News Feed Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              viewport={{ once: true }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative opacity-0"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/50 to-cyan-500/50 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-all duration-500" />
              <div className="relative h-full rounded-2xl border border-border/50 bg-card p-8 backdrop-blur-sm group-hover:border-blue-500/50 transition-all duration-500">
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center size-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/25 group-hover:shadow-blue-500/40 transition-shadow duration-500">
                    <Newspaper className="size-7 text-white" />
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-blue-500 transition-colors duration-300">
                  Global News Aggregator
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Stay ahead with curated news from top crypto publishers. Filter by source and category to find what matters most.
                </p>
                
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-500">
                    Live Feed
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-500">
                    Top Sources
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-500">
                    Market Impacts
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Market Analysis Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
              viewport={{ once: true }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative opacity-0"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-500/50 to-purple-500/50 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-all duration-500" />
              <div className="relative h-full rounded-2xl border border-border/50 bg-card p-8 backdrop-blur-sm group-hover:border-violet-500/50 transition-all duration-500">
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center size-14 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 shadow-lg shadow-violet-500/25 group-hover:shadow-violet-500/40 transition-shadow duration-500">
                     <BarChart3 className="size-7 text-white" />
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-violet-500 transition-colors duration-300">
                  Deep Market Analysis
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Dive deep into token metrics, volume data, and price history. Interactive charts help you visualize market trends clearly.
                </p>
                
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-500">
                    Volume
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-500">
                    Market Cap
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-500">
                    Trends
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Cross Platform Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              viewport={{ once: true }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative opacity-0"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-rose-500/50 to-pink-500/50 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-all duration-500" />
              <div className="relative h-full rounded-2xl border border-border/50 bg-card p-8 backdrop-blur-sm group-hover:border-rose-500/50 transition-all duration-500">
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center size-14 rounded-xl bg-gradient-to-br from-rose-500 to-pink-500 shadow-lg shadow-rose-500/25 group-hover:shadow-rose-500/40 transition-shadow duration-500">
                     <Globe className="size-7 text-white" />
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-rose-500 transition-colors duration-300">
                  Cross-Platform Access
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Access your dashboard from anywhere. Fully responsive design ensures seamless experience on desktop, tablet, and mobile.
                </p>
                
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-rose-500/10 px-3 py-1 text-xs font-medium text-rose-500">
                    Desktop
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-rose-500/10 px-3 py-1 text-xs font-medium text-rose-500">
                    Mobile
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-rose-500/10 px-3 py-1 text-xs font-medium text-rose-500">
                    Tablet
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Additional Feature Highlights */}
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Zap, label: 'Live Sync', desc: 'Real-time updates' },
              { icon: Search, label: 'Symbol Search', desc: 'Find assets instantly' },
              { icon: LineChart, label: 'Historical Data', desc: '7-30 day history' },
              { icon: Tag, label: 'Categories', desc: 'DeFi, NFT, Gaming' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center text-center p-6 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 opacity-0"
              >
                <div className="inline-flex items-center justify-center size-12 rounded-lg bg-primary/10 mb-3">
                  <item.icon className="size-5 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground mb-1">{item.label}</h4>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-20 bg-muted/50">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          {/* Newsletter Section */}
          <div className="mb-12 max-w-md mx-auto text-center">
            <h3 className="text-xl font-bold text-foreground mb-2">Stay Updated</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Get crypto market alerts and price notifications.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg bg-background border border-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Send className="size-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <Link href="/" className="flex items-center gap-2 mb-4">
                <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
                  <TrendingUp className="size-5 text-primary" />
                </div>
                <span className="text-lg font-bold text-foreground">CripterDex</span>
              </Link>
              <p className="text-sm text-muted-foreground">
                Your crypto market companion.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/markets" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Markets
                  </Link>
                </li>
                <li>
                  <Link href="/watchlist" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Watchlist
                  </Link>
                </li>
                <li>
                  <Link href="/news" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    News
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-sm text-muted-foreground">
                © 2026 CripterDex. All rights reserved.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <span className="sr-only">Twitter</span>
                  <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-7.097 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <span className="sr-only">GitHub</span>
                  <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.603-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.914.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.578.688.48C19.138 20.195 22 16.44 22 12.017 22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
