import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { SectionHead } from './section-head'

const packages = [
  {
    name: 'Starter',
    for: 'For businesses getting their first website.',
    features: ['One-page landing page', 'WhatsApp button & location map', 'Mobile-friendly', 'Domain setup help'],
    popular: false,
  },
  {
    name: 'Business',
    for: 'A complete company profile for small businesses.',
    features: [
      'Up to 5 pages',
      'Custom design for your brand',
      'Gallery / portfolio',
      'Basic SEO & Google Business Profile',
      'First-year domain & hosting',
    ],
    popular: true,
  },
  {
    name: 'Care',
    for: 'Monthly plan once your site is live.',
    features: ['Monthly content updates', 'Hosting, backups, security', 'Simple visitor report', 'Priority on new features'],
    popular: false,
  },
]

export function Pricing() {
  return (
    <section id="packages" className="scroll-mt-20 pb-[clamp(64px,9vw,112px)]">
      <div className="container-site">
        <SectionHead
          eyebrow="Packages"
          title="Pick the right starting point."
          lead="Pricing depends on what you need. Contact us for a quote."
        />
        <div className="grid gap-4 lg:grid-cols-3">
          {packages.map((p) => (
            <article
              key={p.name}
              className={cn(
                'grid min-w-0 grid-rows-[auto_auto_1fr_auto] gap-4.5 rounded-md border bg-surface p-7.5',
                p.popular ? 'border-2 border-accent' : 'border-border',
              )}
            >
              <div className="grid gap-1.5">
                {p.popular && (
                  <span className="justify-self-start rounded bg-accent px-2 py-1 font-mono text-[11px] tracking-[0.08em] text-accent-foreground uppercase">
                    Most popular
                  </span>
                )}
                <h3 className="text-[21px] font-bold">{p.name}</h3>
                <span className="text-[15px] text-muted-foreground">{p.for}</span>
              </div>
              <span className="font-mono text-sm font-semibold">Contact us</span>
              <ul className="grid content-start gap-2.5 text-[15px]">
                {p.features.map((f) => (
                  <li key={f} className="grid grid-cols-[20px_1fr] gap-1.5">
                    <span aria-hidden className="font-bold text-accent">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a href="#contact" className={buttonVariants({ size: 'lg', variant: p.popular ? 'default' : 'outline' })}>
                Ask about {p.name}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
