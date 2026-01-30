'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Link, UserProfile, SocialLink } from '@/lib/types'

interface LinksStore {
  links: Link[]
  profile: UserProfile
  addLink: (link: Omit<Link, 'id' | 'createdAt' | 'updatedAt' | 'clicks' | 'order'>) => void
  updateLink: (id: string, link: Partial<Link>) => void
  deleteLink: (id: string) => void
  reorderLinks: (links: Link[]) => void
  toggleLinkActive: (id: string) => void
  incrementLinkClicks: (id: string) => void
  updateProfile: (profile: Partial<UserProfile>) => void
  addSocialLink: (social: Omit<SocialLink, 'id'>) => void
  updateSocialLink: (id: string, social: Partial<SocialLink>) => void
  deleteSocialLink: (id: string) => void
  toggleSocialActive: (id: string) => void
}

const defaultProfile: UserProfile = {
  username: 'mylinks',
  displayName: 'My Name',
  bio: 'Welcome to my link page!',
  avatarUrl: '',
  theme: 'light',
  primaryColor: '#0ea5e9',
  secondaryColor: '#06b6d4',
  fontFamily: 'Inter',
  templateStyle: 'classic',
  socialLinks: [],
}

export const useLinksStore = create<LinksStore>()(
  persist(
    (set) => ({
      links: [],
      profile: defaultProfile,
      
      addLink: (link) =>
        set((state) => {
          const newLink: Link = {
            ...link,
            id: Date.now().toString(),
            order: state.links.length,
            clicks: 0,
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          }
          return { links: [...state.links, newLink] }
        }),

      updateLink: (id, updatedLink) =>
        set((state) => ({
          links: state.links.map((link) =>
            link.id === id
              ? { ...link, ...updatedLink, updatedAt: new Date() }
              : link
          ),
        })),

      deleteLink: (id) =>
        set((state) => ({
          links: state.links.filter((link) => link.id !== id),
        })),

      reorderLinks: (reorderedLinks) =>
        set(() => ({
          links: reorderedLinks.map((link, index) => ({
            ...link,
            order: index,
            updatedAt: new Date(),
          })),
        })),

      toggleLinkActive: (id) =>
        set((state) => ({
          links: state.links.map((link) =>
            link.id === id
              ? { ...link, isActive: !link.isActive, updatedAt: new Date() }
              : link
          ),
        })),

      incrementLinkClicks: (id) =>
        set((state) => ({
          links: state.links.map((link) =>
            link.id === id
              ? { ...link, clicks: link.clicks + 1 }
              : link
          ),
        })),

      updateProfile: (updatedProfile) =>
        set((state) => ({
          profile: { 
            ...state.profile, 
            socialLinks: state.profile.socialLinks || [],
            templateStyle: state.profile.templateStyle || 'classic',
            ...updatedProfile 
          },
        })),

      addSocialLink: (social) =>
        set((state) => ({
          profile: {
            ...state.profile,
            socialLinks: [
              ...state.profile.socialLinks,
              { ...social, id: Date.now().toString() },
            ],
          },
        })),

      updateSocialLink: (id, updatedSocial) =>
        set((state) => ({
          profile: {
            ...state.profile,
            socialLinks: state.profile.socialLinks.map((s) =>
              s.id === id ? { ...s, ...updatedSocial } : s
            ),
          },
        })),

      deleteSocialLink: (id) =>
        set((state) => ({
          profile: {
            ...state.profile,
            socialLinks: state.profile.socialLinks.filter((s) => s.id !== id),
          },
        })),

      toggleSocialActive: (id) =>
        set((state) => ({
          profile: {
            ...state.profile,
            socialLinks: state.profile.socialLinks.map((s) =>
              s.id === id ? { ...s, isActive: !s.isActive } : s
            ),
          },
        })),
    }),
    {
      name: 'linknest-storage',
    }
  )
)
