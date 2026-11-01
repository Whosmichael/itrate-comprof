'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Menu, MessageCircle, X } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { Logo } from '@/components/layout/logo'
import { ThemeToggle } from '@/components/layout/theme-toggle'
import { navItems, whatsappLink } from '@/lib/site'
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
          {/* cn() so "hidden" really wins over the button's own inline-flex on phones; the CTA lives in the sidebar there */}
          <a href="#contact" className={cn(buttonVariants(), 'hidden sm:inline-flex')}>
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

      <MobileSidebar open={open} onClose={() => setOpen(false)} active={active} />
    </header>
  )
}

/** Phone/tablet menu: a panel that slides in from the right, with the consultation CTA always in it. */
function MobileSidebar({ open, onClose, active }: { open: boolean; onClose: () => void; active: string | null }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  if (!mounted) return null
  // Rendered into <body>: the header's backdrop blur would otherwise trap a fixed panel inside it.
  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="md:hidden">
          <motion.div
            className="fixed inset-0 z-[60] bg-[rgba(12,15,23,0.35)] backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-y-0 right-0 z-[70] flex w-[min(340px,86vw)] flex-col border-l border-border bg-background shadow-[0_0_60px_rgba(12,15,23,0.25)]"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 380, damping: 38 }}
          >
            <div className="flex h-[68px] items-center justify-between border-b border-border px-5">
              <Logo />
              <button type="button" className="-mr-2 p-2" aria-label="Close menu" onClick={onClose}>
                <X className="size-6" />
              </button>
            </div>

            <nav aria-label="Mobile navigation" className="px-3 py-4">
              <ul className="grid gap-1">
                {navItems.map((item, i) => {
                  const isActive = active === item.href.slice(1)
                  return (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.06 + i * 0.04 }}
                    >
                      <a
                        href={item.href}
                        aria-current={isActive ? 'location' : undefined}
                        className={cn(
                          'flex items-center justify-between rounded-lg px-3 py-3 text-[17px] font-medium',
                          isActive ? 'bg-accent-soft text-accent' : 'text-foreground hover:bg-accent-soft/60',
                        )}
                        onClick={onClose}
                      >
                        {item.label}
                        <ArrowRight className="size-4 opacity-40" />
                      </a>
                    </motion.li>
                  )
                })}
              </ul>
            </nav>

            <div className="mt-auto grid gap-3 border-t border-border p-5">
              <div className="grid gap-1">
                <span className="font-mono text-[11px] tracking-[0.08em] text-accent uppercase">Free consultation</span>
                <p className="text-[14px] text-muted-foreground">Tell us what’s slowing you down. No commitment.</p>
              </div>
              <a href="#contact" className={buttonVariants({ className: 'w-full' })} onClick={onClose}>
                Free Consultation
              </a>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-border px-4 py-2.5 text-[14px] font-medium hover:border-accent/40"
              >
                <MessageCircle className="size-4 text-[#1f9d6b]" />
                Chat on WhatsApp
              </a>
              <div className="flex items-center justify-between pt-1 text-[13px] text-muted-foreground">
                <span>Theme</span>
                <ThemeToggle />
              </div>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
