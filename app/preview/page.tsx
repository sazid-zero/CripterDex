'use client'

import { useEffect } from 'react'
import { useLinksStore } from '@/hooks/use-links-store'
import { PreviewWithTemplate } from '@/components/preview-templates'

export default function PreviewPage() {
  const { links, profile, incrementLinkClicks, updateProfile } = useLinksStore()

  // Ensure profile has all required fields on mount
  useEffect(() => {
    if (!profile.templateStyle) {
      updateProfile({ templateStyle: 'classic' })
    }
    if (!profile.socialLinks) {
      updateProfile({ socialLinks: [] })
    }
  }, [])

  const handleLinkClick = (id: string, url: string) => {
    incrementLinkClicks(id)
    window.open(url, '_blank')
  }

  return (
    <div className="scale-125 origin-top">
      <PreviewWithTemplate profile={profile} links={links} onLinkClick={handleLinkClick} />
    </div>
  )
}
