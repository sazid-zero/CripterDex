'use client'

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { usePathname } from "next/navigation"
import { Calendar, Clock } from "lucide-react"
import { useEffect, useState } from "react"

export function AppHeader() {
  const pathname = usePathname()
  const pathSegments = pathname.split('/').filter(Boolean)
  const [date, setDate] = useState<Date | null>(null)

  useEffect(() => {
    setDate(new Date())
    const timer = setInterval(() => setDate(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b bg-background/95 backdrop-blur px-4 sticky top-0 z-10 transition-all duration-200 ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            {pathSegments.length > 0 && <BreadcrumbSeparator className="hidden md:block" />}
            {pathSegments.map((segment, index) => {
              const isLast = index === pathSegments.length - 1
              const href = `/${pathSegments.slice(0, index + 1).join('/')}`
              const label = segment.charAt(0).toUpperCase() + segment.slice(1)
              
              return (
                <div key={href} className="flex items-center gap-1.5">
                  <BreadcrumbItem>
                    {isLast ? (
                      <BreadcrumbPage>{label}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink href={href}>{label}</BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                  {!isLast && <BreadcrumbSeparator className="hidden md:block" />}
                </div>
              )
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex items-center gap-4 text-sm text-muted-foreground mr-4">
        {date && (
            <>
                <div className="flex items-center gap-2 hidden md:flex">
                    <Calendar className="h-4 w-4" />
                    <span>{date.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <div className="flex items-center gap-2 pl-4 border-l hidden md:flex">
                    <Clock className="h-4 w-4" />
                    <span>{date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
            </>
        )}
      </div>
    </header>
  )
}
