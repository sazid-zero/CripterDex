'use client'

import { UserProfile, Link, SocialLink } from '@/lib/types'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'
import { 
  Twitter, 
  Instagram, 
  Facebook, 
  Linkedin, 
  Youtube, 
  Github,
  Music,
  MessageCircle,
  Twitch
} from 'lucide-react'
import { SiTiktok } from 'react-icons/si'

interface PreviewTemplateProps {
  profile: UserProfile
  links: Link[]
  onLinkClick: (id: string, url: string) => void
}

const getSocialIcon = (platform: string, className?: string) => {
  const iconClass = className || 'size-5'
  switch (platform) {
    case 'twitter': return <Twitter className={iconClass} />
    case 'instagram': return <Instagram className={iconClass} />
    case 'facebook': return <Facebook className={iconClass} />
    case 'linkedin': return <Linkedin className={iconClass} />
    case 'youtube': return <Youtube className={iconClass} />
    case 'github': return <Github className={iconClass} />
    case 'tiktok': return <SiTiktok className={iconClass} />
    case 'discord': return <MessageCircle className={iconClass} />
    case 'twitch': return <Twitch className={iconClass} />
    case 'spotify': return <Music className={iconClass} />
    default: return null
  }
}

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

// Classic Template (Linktree style)
export const ClassicTemplate = ({ profile, links, onLinkClick }: PreviewTemplateProps) => {
  const activeSocials = (profile.socialLinks || []).filter(s => s.isActive)
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/10 via-background to-background">
      <div className="mx-auto max-w-2xl px-3 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6"
        >
          {/* Avatar */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="mb-4 flex justify-center"
          >
            <Avatar className="size-16 border-2 border-background shadow-lg">
              <AvatarImage src={profile.avatarUrl} />
              <AvatarFallback className="bg-gradient-to-br from-primary to-primary/70 text-primary-foreground text-lg font-bold">
                {getInitials(profile.displayName)}
              </AvatarFallback>
            </Avatar>
          </motion.div>

          {/* Name & Username */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl font-bold text-foreground mb-1"
          >
            {profile.displayName}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-sm text-muted-foreground mb-3"
          >
            @{profile.username}
          </motion.p>

          {/* Bio */}
          {profile.bio && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-sm text-foreground max-w-md mx-auto mb-4"
            >
              {profile.bio}
            </motion.p>
          )}

          {/* Social Links */}
          {activeSocials.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex justify-center gap-2 mb-6"
            >
              {activeSocials.map((social, index) => (
                <motion.a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-center justify-center size-9 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-all hover:scale-110"
                >
                  {getSocialIcon(social.platform, 'size-4')}
                </motion.a>
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="space-y-3"
        >
          {links.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <p className="text-sm text-muted-foreground">No links available yet</p>
            </motion.div>
          ) : (
            links.map((link, index) => (
              <motion.div
                key={link.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
              >
                <Button
                  onClick={() => onLinkClick(link.id, link.url)}
                  variant="outline"
                  className="w-full h-11 text-sm font-medium hover:scale-105 transition-all shadow-sm hover:shadow-md"
                >
                  {link.title}
                </Button>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </div>
  )
}

// Modern Template (Card-based)
export const ModernTemplate = ({ profile, links, onLinkClick }: PreviewTemplateProps) => {
  const activeSocials = (profile.socialLinks || []).filter(s => s.isActive)
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-950 dark:via-purple-950 dark:to-gray-950">
      <div className="mx-auto max-w-2xl px-3 py-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-2xl p-5 border border-gray-200/50 dark:border-gray-800/50"
        >
          <div className="text-center mb-6">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", bounce: 0.5 }}
              className="mb-4 flex justify-center"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-500 via-pink-500 to-blue-500 rounded-full blur-lg opacity-50"></div>
                <Avatar className="size-18 border-2 border-white dark:border-gray-900 shadow-xl relative">
                  <AvatarImage src={profile.avatarUrl} />
                  <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white text-lg font-bold">
                    {getInitials(profile.displayName)}
                  </AvatarFallback>
                </Avatar>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-1"
            >
              {profile.displayName}
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-sm text-gray-600 dark:text-gray-400 mb-3"
            >
              @{profile.username}
            </motion.p>

            {profile.bio && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-sm text-gray-700 dark:text-gray-300 max-w-md mx-auto mb-4"
              >
                {profile.bio}
              </motion.p>
            )}

            {/* Social Links */}
            {activeSocials.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex justify-center gap-2 flex-wrap mb-6"
              >
                {activeSocials.map((social) => (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center size-9 rounded-lg bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 hover:from-purple-600 hover:via-pink-600 hover:to-blue-600 text-white transition-all hover:scale-110 shadow-lg"
                  >
                    {getSocialIcon(social.platform, 'size-4')}
                  </a>
                ))}
              </motion.div>
            )}
          </div>

          {/* Links */}
          <div className="space-y-2">
            {links.map((link, index) => (
              <motion.div
                key={link.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                onClick={() => onLinkClick(link.id, link.url)}
                className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 hover:from-purple-500/20 hover:via-pink-500/20 hover:to-blue-500/20 p-[2px] cursor-pointer transition-all"
              >
                <div className="bg-white dark:bg-gray-900 rounded-xl p-3 flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">{link.title}</span>
                  <ExternalLink className="size-4 text-gray-400 group-hover:text-purple-500 transition-colors" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// Minimal Template (Clean & Simple)
export const MinimalTemplate = ({ profile, links, onLinkClick }: PreviewTemplateProps) => {
  const activeSocials = (profile.socialLinks || []).filter(s => s.isActive)
  
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="mx-auto max-w-xl px-3 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-5"
          >
            <Avatar className="size-14 mx-auto border border-gray-200 dark:border-gray-800">
              <AvatarImage src={profile.avatarUrl} />
              <AvatarFallback className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-base font-bold">
                {getInitials(profile.displayName)}
              </AvatarFallback>
            </Avatar>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg font-bold text-gray-900 dark:text-white mb-1 tracking-tight"
          >
            {profile.displayName}
          </motion.h1>

          {profile.bio && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xs text-gray-600 dark:text-gray-400 max-w-sm mx-auto mb-6"
            >
              {profile.bio}
            </motion.p>
          )}

          {/* Social Links */}
          {activeSocials.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex justify-center gap-3 mb-8"
            >
              {activeSocials.map((social) => (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  {getSocialIcon(social.platform, 'size-5')}
                </a>
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* Links */}
        <div className="space-y-4">
          {links.map((link, index) => (
            <motion.div
              key={link.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              onClick={() => onLinkClick(link.id, link.url)}
              className="group cursor-pointer"
            >
              <div className="flex items-center justify-between py-2.5 border-b border-gray-200 dark:border-gray-800 group-hover:border-gray-900 dark:group-hover:border-white transition-colors">
                <span className="text-sm font-medium text-gray-900 dark:text-white">{link.title}</span>
                <ExternalLink className="size-3.5 text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Gradient Template (Bold & Colorful)
export const GradientTemplate = ({ profile, links, onLinkClick }: PreviewTemplateProps) => {
  const activeSocials = (profile.socialLinks || []).filter(s => s.isActive)
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600">
      <div className="mx-auto max-w-2xl px-3 py-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6"
        >
          <motion.div
            initial={{ scale: 0, rotate: 180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", bounce: 0.6 }}
            className="mb-5 flex justify-center"
          >
            <Avatar className="size-20 border-2 border-white shadow-2xl">
              <AvatarImage src={profile.avatarUrl} />
              <AvatarFallback className="bg-white text-purple-600 text-xl font-bold">
                {getInitials(profile.displayName)}
              </AvatarFallback>
            </Avatar>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-extrabold text-white mb-2 drop-shadow-lg"
          >
            {profile.displayName}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-sm text-white/90 mb-3"
          >
            @{profile.username}
          </motion.p>

          {profile.bio && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-sm text-white/90 max-w-md mx-auto mb-5"
            >
              {profile.bio}
            </motion.p>
          )}

          {/* Social Links */}
          {activeSocials.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex justify-center gap-2 flex-wrap mb-6"
            >
              {activeSocials.map((social) => (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center size-10 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white transition-all hover:scale-110 shadow-lg"
                >
                  {getSocialIcon(social.platform, 'size-5')}
                </a>
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="space-y-3"
        >
          {links.map((link, index) => (
            <motion.div
              key={link.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              onClick={() => onLinkClick(link.id, link.url)}
              className="group cursor-pointer"
            >
              <div className="bg-white/95 backdrop-blur-sm hover:bg-white rounded-xl p-4 shadow-xl hover:shadow-2xl transition-all group-hover:scale-105 flex items-center justify-between">
                <span className="font-bold text-gray-900 text-sm">{link.title}</span>
                <ExternalLink className="size-4 text-gray-600 group-hover:text-purple-600 transition-colors" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

// Main wrapper component that selects the template
export const PreviewWithTemplate = ({ profile, links, onLinkClick }: PreviewTemplateProps) => {
  const activeLinks = links.filter(l => l.isActive).sort((a, b) => a.order - b.order)

  switch (profile.templateStyle) {
    case 'modern':
      return <ModernTemplate profile={profile} links={activeLinks} onLinkClick={onLinkClick} />
    case 'minimal':
      return <MinimalTemplate profile={profile} links={activeLinks} onLinkClick={onLinkClick} />
    case 'gradient':
      return <GradientTemplate profile={profile} links={activeLinks} onLinkClick={onLinkClick} />
    case 'classic':
    default:
      return <ClassicTemplate profile={profile} links={activeLinks} onLinkClick={onLinkClick} />
  }
}
