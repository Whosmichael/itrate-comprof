import { Logo } from '@/components/layout/logo'
import { Wordmark } from '@/components/layout/wordmark'
import { site } from '@/lib/site'

export function Footer() {
  return (
    <footer className="border-t border-border py-8 text-sm text-muted-foreground">
      <div className="container-site flex flex-wrap items-center justify-between gap-4">
        <Logo className="text-xl" />
        <span>
          © {new Date().getFullYear()} <Wordmark className="group" /> {site.tagline}.
        </span>
        <span className="flex items-center gap-5">
          <a href={site.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
            Instagram @{site.instagram}
          </a>
          <span className="font-mono text-xs">site v1.0</span>
        </span>
      </div>
    </footer>
  )
}
