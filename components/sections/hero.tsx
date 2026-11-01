import { ArrowRight } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'

const changelog = [
  { v: 'v1.0', text: 'Home, menu, and contact', when: 'week 2' },
  { v: 'v1.1', text: 'Catalog of 102 board games', when: 'month 1' },
  { v: 'v1.2', text: 'Table booking + WhatsApp', when: 'live' },
]

export function Hero() {
  return (
    <section className="pt-[clamp(48px,7vw,96px)] pb-[clamp(56px,8vw,104px)]">
      <div className="container-site grid items-center gap-[clamp(32px,5vw,72px)] lg:grid-cols-[1.05fr_0.95fr]">
        <div className="grid min-w-0 gap-6">
          <span className="eyebrow">Websites for small businesses</span>
          <h1 className="text-[clamp(40px,6.2vw,76px)] font-extrabold">
            Your business website. Launched fast, then <span className="text-accent">always getting better.</span>
          </h1>
          <p className="lead">
            itrate builds company profile websites for Indonesian small businesses. We design, build, and launch the
            first version, then keep improving it with you as your business grows.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="#contact" className={buttonVariants({ size: 'lg' })}>
              Start a Project <ArrowRight />
            </a>
            <a href="#work" className={buttonVariants({ size: 'lg', variant: 'outline' })}>
              See Our Work
            </a>
          </div>
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <span aria-hidden className="size-2 rounded-full bg-ok shadow-[0_0_0_4px_color-mix(in_srgb,var(--ok)_20%,transparent)]" />
            First consultation is free, no commitment.
          </p>
        </div>

        {/* Browser mockup: a site that grows version by version */}
        <div
          className="min-w-0 overflow-hidden rounded-[10px] border border-border bg-surface shadow-[0_30px_60px_-30px_color-mix(in_srgb,var(--accent)_35%,transparent)]"
          aria-label="Illustration of a website growing version by version"
        >
          <div className="flex items-center gap-2.5 border-b border-border px-3.5 py-2.5">
            {[0, 1, 2].map((i) => (
              <span key={i} className="size-2.5 rounded-full bg-border" />
            ))}
            <span className="flex-1 truncate rounded bg-background px-2.5 py-1.5 font-mono text-xs text-muted-foreground">
              polycafe.id/games
            </span>
          </div>
          <div aria-hidden className="grid gap-3 p-5">
            <div className="grid h-[84px] content-center gap-2 rounded bg-accent-soft px-4">
              <div className="h-2.5 w-[58%] rounded-sm bg-border" />
              <div className="h-2.5 w-[40%] rounded-sm bg-border" />
              <div className="h-2.5 w-[34%] rounded-sm bg-accent" />
            </div>
            <div className="grid grid-cols-3 gap-2.5">
              <div className="h-16 rounded bg-background" />
              <div className="h-16 rounded bg-background" />
              <div className="animate-rise h-16 rounded bg-accent-soft outline-2 -outline-offset-2 outline-accent outline-dashed" />
            </div>
          </div>
          <ul className="grid gap-2 border-t border-border px-5 pt-3.5 pb-4.5 font-mono text-[13px] leading-snug">
            {changelog.map((c) => (
              <li key={c.v} className="grid grid-cols-[52px_1fr_auto] items-baseline gap-3">
                <b className="font-medium text-accent">{c.v}</b>
                <span>{c.text}</span>
                {c.when === 'live' ? (
                  <span className="text-[11px] text-ok">● live</span>
                ) : (
                  <span className="text-muted-foreground">{c.when}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
