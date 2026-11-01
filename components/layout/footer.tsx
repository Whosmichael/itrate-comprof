import { Logo } from '@/components/layout/logo'
import { site } from '@/lib/site'

export function Footer() {
  return (
    <footer className="border-t border-border py-8 text-sm text-muted-foreground">
      <div className="container-site flex flex-wrap items-center justify-between gap-4">
        <Logo className="text-xl text-foreground" />
        <span>
          © {new Date().getFullYear()} {site.name}. {site.tagline}.
        </span>
        <span className="font-mono text-xs">site v1.0</span>
      </div>
    </footer>
  )
}
