'use client'

import { useState } from 'react'
import { useLinksStore } from '@/hooks/use-links-store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Link2, Plus, Trash2, GripVertical, ExternalLink, Eye, Copy, Check, Palette, Share2 } from 'lucide-react'
import Link from 'next/link'
import { GlobalNav } from '@/components/global-nav'
import { toast } from 'sonner'
import { Toaster } from '@/components/ui/sonner'
import { PreviewWithTemplate } from '@/components/preview-templates'
import type { SocialLink, TemplateStyle } from '@/lib/types'

const SOCIAL_PLATFORMS = [
  { value: 'twitter', label: 'Twitter' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'facebook', label: 'Facebook' },
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'youtube', label: 'YouTube' },
  { value: 'tiktok', label: 'TikTok' },
  { value: 'github', label: 'GitHub' },
  { value: 'discord', label: 'Discord' },
  { value: 'twitch', label: 'Twitch' },
  { value: 'spotify', label: 'Spotify' },
] as const

export default function LinksPage() {
  const { 
    links, 
    addLink, 
    updateLink, 
    deleteLink, 
    toggleLinkActive, 
    profile,
    updateProfile,
    addSocialLink,
    updateSocialLink,
    deleteSocialLink,
    toggleSocialActive,
  } = useLinksStore()
  
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSocialDialogOpen, setIsSocialDialogOpen] = useState(false)
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false)
  const [editingLink, setEditingLink] = useState<string | null>(null)
  const [editingSocial, setEditingSocial] = useState<string | null>(null)
  const [linkTitle, setLinkTitle] = useState('')
  const [linkUrl, setLinkUrl] = useState('')
  const [socialPlatform, setSocialPlatform] = useState<string>('twitter')
  const [socialUrl, setSocialUrl] = useState('')
  const [copied, setCopied] = useState(false)
  const [profileForm, setProfileForm] = useState({
    displayName: profile.displayName,
    username: profile.username,
    bio: profile.bio,
    avatarUrl: profile.avatarUrl,
  })

  const sortedLinks = [...links].sort((a, b) => a.order - b.order)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!linkTitle || !linkUrl) return

    if (editingLink) {
      updateLink(editingLink, { title: linkTitle, url: linkUrl })
      toast.success('Link updated successfully!')
    } else {
      addLink({ title: linkTitle, url: linkUrl })
      toast.success('Link added successfully!')
    }

    setIsDialogOpen(false)
    setLinkTitle('')
    setLinkUrl('')
    setEditingLink(null)
  }

  const handleSocialSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!socialPlatform || !socialUrl) return

    if (editingSocial) {
      updateSocialLink(editingSocial, { 
        platform: socialPlatform as any, 
        url: socialUrl 
      })
      toast.success('Social link updated!')
    } else {
      addSocialLink({ 
        platform: socialPlatform as any, 
        url: socialUrl, 
        isActive: true 
      })
      toast.success('Social link added!')
    }

    setIsSocialDialogOpen(false)
    setSocialPlatform('twitter')
    setSocialUrl('')
    setEditingSocial(null)
  }

  const handleEdit = (id: string) => {
    const link = links.find(l => l.id === id)
    if (link) {
      setLinkTitle(link.title)
      setLinkUrl(link.url)
      setEditingLink(id)
      setIsDialogOpen(true)
    }
  }

  const handleEditSocial = (id: string) => {
    const social = profile.socialLinks.find(s => s.id === id)
    if (social) {
      setSocialPlatform(social.platform)
      setSocialUrl(social.url)
      setEditingSocial(id)
      setIsSocialDialogOpen(true)
    }
  }

  const handleDelete = (id: string) => {
    deleteLink(id)
    toast.success('Link deleted!')
  }

  const handleDeleteSocial = (id: string) => {
    deleteSocialLink(id)
    toast.success('Social link deleted!')
  }

  const handleCopyUrl = () => {
    const url = `${window.location.origin}/preview`
    navigator.clipboard.writeText(url)
    setCopied(true)
    toast.success('Link copied to clipboard!')
    setTimeout(() => setCopied(false), 2000)
  }

  const handleTemplateChange = (template: TemplateStyle) => {
    updateProfile({ templateStyle: template })
    toast.success('Template updated!')
  }

  const handleLinkClick = (id: string, url: string) => {
    window.open(url, '_blank')
  }

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateProfile(profileForm)
    setIsProfileDialogOpen(false)
    toast.success('Profile updated!')
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error('Image size should be less than 2MB')
        return
      }
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileForm({ ...profileForm, avatarUrl: reader.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  const openProfileDialog = () => {
    setProfileForm({
      displayName: profile.displayName,
      username: profile.username,
      bio: profile.bio,
      avatarUrl: profile.avatarUrl,
    })
    setIsProfileDialogOpen(true)
  }

  return (
    <div className="min-h-screen bg-background">
      <Toaster />
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-8xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex size-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/70">
              <Link2 className="size-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              CripterDex
            </span>
          </Link>
          <div className="hidden md:block">
            <GlobalNav />
          </div>
          <div className="flex items-center gap-3">
            <Link href="/preview" target="_blank">
              <Button variant="outline" size="sm" className="gap-2">
                <Eye className="size-4" />
                <span className="hidden sm:inline">Preview</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content - Side by Side on Large Screens */}
      <div className="mx-auto max-w-8xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_0.55fr] gap-8 items-start">
          {/* Left Side - Editor */}
          <div className="space-y-6">
            {/* Profile Card */}
            <Card className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-2">Profile Settings</h2>
                  <p className="text-sm text-muted-foreground">Edit your name, bio, and photo</p>
                </div>
                <Button onClick={openProfileDialog} variant="outline" size="sm" className="gap-2">
                  <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit
                </Button>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 border border-border">
                <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl overflow-hidden flex-shrink-0">
                  {profile.avatarUrl ? (
                    <img src={profile.avatarUrl} alt={profile.displayName} className="size-full object-cover" />
                  ) : (
                    profile.displayName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-foreground truncate">{profile.displayName}</h3>
                  <p className="text-sm text-muted-foreground truncate">@{profile.username}</p>
                  {profile.bio && (
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{profile.bio}</p>
                  )}
                </div>
              </div>
            </Card>
            {/* Template Selector */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Palette className="size-5 text-primary" />
                <h2 className="text-xl font-bold text-foreground">Choose Template</h2>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {(['classic', 'modern', 'minimal', 'gradient'] as TemplateStyle[]).map((template) => (
                  <button
                    key={template}
                    onClick={() => handleTemplateChange(template)}
                    className={`p-4 rounded-lg border-2 transition-all text-left capitalize ${
                      profile.templateStyle === template
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="font-semibold text-foreground">{template}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {template === 'classic' && 'Linktree style'}
                      {template === 'modern' && 'Card-based'}
                      {template === 'minimal' && 'Clean & Simple'}
                      {template === 'gradient' && 'Bold & Colorful'}
                    </div>
                  </button>
                ))}
              </div>
            </Card>

            {/* Social Links Card */}
            <Card className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Share2 className="size-5 text-primary" />
                    <h2 className="text-xl font-bold text-foreground">Social Links</h2>
                  </div>
                  <p className="text-sm text-muted-foreground">Add your social media profiles</p>
                </div>
                <Button onClick={() => setIsSocialDialogOpen(true)} size="sm" className="gap-2">
                  <Plus className="size-4" />
                  Add
                </Button>
              </div>

              {(!profile.socialLinks || profile.socialLinks.length === 0) ? (
                <div className="text-center py-8 text-muted-foreground text-sm">
                  No social links yet
                </div>
              ) : (
                <div className="space-y-2">
                  {profile.socialLinks.map((social) => (
                    <div key={social.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium capitalize">{social.platform}</span>
                          {!social.isActive && (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-background text-muted-foreground">
                              Hidden
                            </span>
                          )}
                        </div>
                        <a 
                          href={social.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-xs text-muted-foreground hover:text-primary transition-colors truncate block"
                        >
                          {social.url}
                        </a>
                      </div>
                      <div className="flex items-center gap-1">
                        <Switch
                          checked={social.isActive}
                          onCheckedChange={() => toggleSocialActive(social.id)}
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8"
                          onClick={() => handleEditSocial(social.id)}
                        >
                          <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8 text-destructive hover:text-destructive"
                          onClick={() => handleDeleteSocial(social.id)}
                        >
                          <Trash2 className="size-3.5" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            {/* Links Management Card */}
            <Card className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">Your Links</h2>
                  <p className="text-muted-foreground">Manage your links and share your page</p>
                </div>
                <Button onClick={() => setIsDialogOpen(true)} className="gap-2">
                  <Plus className="size-4" />
                  Add Link
                </Button>
              </div>

              {/* Share URL */}
              <div className="flex gap-2 p-4 rounded-lg bg-muted/50 border border-border mb-6">
                <Input 
                  value={`${typeof window !== 'undefined' ? window.location.origin : ''}/preview`}
                  readOnly
                  className="flex-1"
                />
                <Button onClick={handleCopyUrl} variant="outline" size="icon">
                  {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
                </Button>
                <Link href="/preview" target="_blank">
                  <Button variant="outline" size="icon">
                    <ExternalLink className="size-4" />
                  </Button>
                </Link>
              </div>

              {/* Links List */}
              <div className="space-y-3">
                {sortedLinks.length === 0 ? (
                  <div className="p-12 text-center border-2 border-dashed rounded-lg">
                    <Link2 className="size-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">No links yet</h3>
                    <p className="text-muted-foreground mb-4">Add your first link to get started</p>
                    <Button onClick={() => setIsDialogOpen(true)} className="gap-2">
                      <Plus className="size-4" />
                      Add Your First Link
                    </Button>
                  </div>
                ) : (
                  sortedLinks.map((link) => (
                    <div key={link.id} className="p-4 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-4">
                        <GripVertical className="size-5 text-muted-foreground cursor-move" />
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-foreground truncate">{link.title}</h3>
                            {!link.isActive && (
                              <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground whitespace-nowrap">
                                Hidden
                              </span>
                            )}
                          </div>
                          <a 
                            href={link.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 truncate"
                          >
                            <span className="truncate">{link.url}</span>
                            <ExternalLink className="size-3 flex-shrink-0" />
                          </a>
                          <p className="text-xs text-muted-foreground mt-1">
                            {link.clicks} clicks
                          </p>
                        </div>

                        <div className="flex items-center gap-2 flex-shrink-0">
                          <Switch
                            checked={link.isActive}
                            onCheckedChange={() => toggleLinkActive(link.id)}
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(link.id)}
                          >
                            <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(link.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </Card>
          </div>

          {/* Right Side - Live Preview (Hidden on mobile/tablet, visible on lg+) */}
          <div className="hidden lg:block sticky top-24">
            <div className="mx-auto" style={{ maxWidth: '400px' }}>
              <div className="rounded-2xl border-2 border-border shadow-xl overflow-hidden bg-background">
                <div className="h-[calc(100vh-8rem)] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  <PreviewWithTemplate 
                    profile={profile} 
                    links={links} 
                    onLinkClick={handleLinkClick}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit Link Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingLink ? 'Edit Link' : 'Add New Link'}</DialogTitle>
            <DialogDescription>
              {editingLink ? 'Update your link details' : 'Add a new link to your page'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Link Title</Label>
              <Input
                id="title"
                value={linkTitle}
                onChange={(e) => setLinkTitle(e.target.value)}
                placeholder="My Portfolio"
                required
              />
            </div>
            <div>
              <Label htmlFor="url">URL</Label>
              <Input
                id="url"
                type="url"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="https://example.com"
                required
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => {
                setIsDialogOpen(false)
                setLinkTitle('')
                setLinkUrl('')
                setEditingLink(null)
              }}>
                Cancel
              </Button>
              <Button type="submit">
                {editingLink ? 'Update' : 'Add'} Link
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Add/Edit Social Link Dialog */}
      <Dialog open={isSocialDialogOpen} onOpenChange={setIsSocialDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingSocial ? 'Edit Social Link' : 'Add Social Link'}</DialogTitle>
            <DialogDescription>
              {editingSocial ? 'Update your social media link' : 'Add a social media link to your page'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSocialSubmit} className="space-y-4">
            <div>
              <Label htmlFor="platform">Platform</Label>
              <Select value={socialPlatform} onValueChange={setSocialPlatform}>
                <SelectTrigger>
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  {SOCIAL_PLATFORMS.map((platform) => (
                    <SelectItem key={platform.value} value={platform.value}>
                      {platform.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="social-url">Profile URL</Label>
              <Input
                id="social-url"
                type="url"
                value={socialUrl}
                onChange={(e) => setSocialUrl(e.target.value)}
                placeholder="https://twitter.com/username"
                required
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => {
                setIsSocialDialogOpen(false)
                setSocialPlatform('twitter')
                setSocialUrl('')
                setEditingSocial(null)
              }}>
                Cancel
              </Button>
              <Button type="submit">
                {editingSocial ? 'Update' : 'Add'} Social Link
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Profile Dialog */}
      <Dialog open={isProfileDialogOpen} onOpenChange={setIsProfileDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
              Update your profile information
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleProfileSubmit} className="space-y-4">
            <div>
              <Label>Profile Photo</Label>
              <div className="flex items-center gap-4 mt-2">
                <div className="size-20 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl overflow-hidden flex-shrink-0">
                  {profileForm.avatarUrl ? (
                    <img src={profileForm.avatarUrl} alt="Avatar" className="size-full object-cover" />
                  ) : (
                    profileForm.displayName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
                  )}
                </div>
                <div className="flex-1">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="cursor-pointer"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Max 2MB (JPG, PNG, GIF)</p>
                  {profileForm.avatarUrl && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setProfileForm({ ...profileForm, avatarUrl: '' })}
                      className="mt-1 h-7 text-xs"
                    >
                      Remove photo
                    </Button>
                  )}
                </div>
              </div>
            </div>
            <div>
              <Label htmlFor="displayName">Display Name</Label>
              <Input
                id="displayName"
                value={profileForm.displayName}
                onChange={(e) => setProfileForm({ ...profileForm, displayName: e.target.value })}
                placeholder="John Doe"
                required
              />
            </div>
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={profileForm.username}
                onChange={(e) => setProfileForm({ ...profileForm, username: e.target.value })}
                placeholder="johndoe"
                required
              />
            </div>
            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={profileForm.bio}
                onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                placeholder="Welcome to my link page!"
                rows={3}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setIsProfileDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                Save Changes
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
