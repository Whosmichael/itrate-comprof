'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { Logo } from '@/components/layout/logo'
import { ThemeToggle } from '@/components/layout/theme-toggle'
import { navItems } from '@/lib/site'
import { cn } from '@/lib/utils'

/**
 * Which nav section the reader is in: the last section whose top has passed a line
 * 40% down the viewport, as long as that section is still under the line.
 */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const line = window.innerHeight * 0.4
      let current: string | null = null
      for (const id of ids) {
        const el = document.getElementById(id)
        if (!el) continue
        const r = el.getBoundingClientRect()
        if (r.top <= line && r.bottom > line) current = id
      }
      setActive(current)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [ids])

  return active
}

const sectionIds = navItems.map((n) => n.href.slice(1))

export function Navbar() {
  const [open, setOpen] = useState(false)
  const active = useActiveSection(sectionIds)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="container-site flex h-[68px] items-center justify-between gap-6">
        <Logo />

        <nav aria-label="Main navigation" className="hidden md:block">
          <ul className="flex gap-1 text-[15px] font-medium">
            {navItems.map((item) => {
              const isActive = active === item.href.slice(1)
              return (
                <li key={item.href} className="relative">
                  {/* Highlighter that slides to the section you're reading */}
                  {isActive && (
                    <motion.span
                      layoutId="nav-highlight"
                      aria-hidden
                      className="absolute inset-0 rounded-full bg-accent-soft"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <a
                    href={item.href}
                    aria-current={isActive ? 'location' : undefined}
                    className={cn(
                      'relative block rounded-full px-3.5 py-1.5 transition-colors',
                      isActive ? 'text-accent' : 'text-muted-foreground hover:text-foreground',
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a href="#contact" className={buttonVariants({ className: 'hidden sm:inline-flex' })}>
            Free Consultation
          </a>
          <button
            type="button"
            className="p-2 md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {open && (
        <nav aria-label="Mobile navigation" className="border-t border-border md:hidden">
          <ul className="container-site grid gap-1 py-4">
            {navItems.map((item) => {
              const isActive = active === item.href.slice(1)
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={isActive ? 'location' : undefined}
                    className={cn(
                      'block rounded-md px-3 py-2',
                      isActive ? 'bg-accent-soft text-accent' : 'text-muted-foreground hover:text-foreground',
                    )}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </a>
                </li>
              )
            })}
            <li className="pt-2">
              <a href="#contact" className={buttonVariants({ className: 'w-full' })} onClick={() => setOpen(false)}>
                Free Consultation
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
