import { Logo } from '@/components/layout/logo'
import { MaturingWord } from '@/components/sections/maturing-word'
import { site } from '@/lib/site'

export function Footer() {
  return (
    <footer className="border-t border-border py-8 text-sm text-muted-foreground">
      <div className="container-site flex flex-wrap items-center justify-between gap-4">
        <Logo className="text-xl" />
        <span>
          © {new Date().getFullYear()} <MaturingWord word={site.name} className="font-display" />. {site.tagline}.
        </span>
        <span className="font-mono text-xs">site v1.0</span>
      </div>
    </footer>
  )
}
