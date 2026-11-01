'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { Logo } from '@/components/layout/logo'
import { ThemeToggle } from '@/components/layout/theme-toggle'
import { navItems } from '@/lib/site'

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="container-site flex h-[68px] items-center justify-between gap-6">
        <Logo />

        <nav aria-label="Main navigation" className="hidden md:block">
          <ul className="flex gap-7 text-[15px] font-medium">
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="text-muted-foreground transition-colors hover:text-foreground">
                  {item.label}
                </a>
              </li>
            ))}
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
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="block py-2 text-muted-foreground hover:text-foreground" onClick={() => setOpen(false)}>
                  {item.label}
                </a>
              </li>
            ))}
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
