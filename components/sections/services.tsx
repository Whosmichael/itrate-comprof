import { Reveal } from '@/components/motion/reveal'
import { SectionHead } from './section-head'

const extras = ['Local SEO', 'Google Business Profile', 'PDF company profile', 'Booking system', 'Simple web app']
const pages = ['Home & about us', 'Services / products pages', 'Gallery & portfolio', 'Contact, map, WhatsApp']

const card =
  'h-full rounded-xl border border-border bg-surface p-8 transition-[transform,box-shadow,border-color] duration-500 hover:-translate-y-1 hover:border-accent/30 hover:shadow-[0_24px_50px_-30px_rgba(58,91,217,0.35)]'
const tag = 'font-mono text-xs text-muted-foreground'

export function Services() {
  return (
    <section id="services" className="section scroll-mt-20">
      <div className="container-site">
        <SectionHead eyebrow="Services" title="Everything your business needs to look professional online." />

        <div className="grid gap-4 lg:grid-cols-6">
          <Reveal className="min-w-0 lg:col-span-4">
            <article className={`${card} relative grid content-between gap-10 overflow-hidden bg-[linear-gradient(140deg,var(--accent-soft),var(--surface)_70%)]`}>
              <div aria-hidden className="absolute -top-24 -right-24 size-64 rounded-full bg-accent/10 blur-3xl" />
              <div className="relative grid gap-3.5">
                <span className="font-mono text-xs text-accent">Core service</span>
                <h3 className="text-[clamp(26px,3vw,36px)] font-bold">Company Profile Website</h3>
                <p className="max-w-[46ch] text-muted-foreground">
                  Your official website: who you are, what you offer, and how to reach you. Built from scratch around
                  your business, not an off-the-shelf template.
                </p>
              </div>
              <ul className="relative grid gap-x-5 gap-y-2.5 text-[15px] sm:grid-cols-2">
                {pages.map((i) => (
                  <li key={i} className="flex items-center gap-2.5">
                    <span aria-hidden className="size-1.5 rounded-full bg-accent" />
                    {i}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>

          <Reveal className="min-w-0 lg:col-span-2" delay={0.1}>
            <article className={`${card} grid content-center gap-3`}>
              <span className={tag}>Campaigns</span>
              <h3 className="text-[21px] font-bold">Landing Page</h3>
              <p className="text-[15px] text-muted-foreground">
                One focused page for a promo, product launch, or event, built to get visitors to contact you.
              </p>
            </article>
          </Reveal>

          <Reveal className="min-w-0 lg:col-span-6" delay={0.15}>
            <article className={`${card} flex flex-wrap items-center justify-between gap-x-8 gap-y-5`}>
              <div className="grid max-w-[520px] gap-2">
                <span className={tag}>Care & add-ons</span>
                <h3 className="text-[21px] font-bold">Domain, hosting, and regular updates</h3>
                <p className="text-[15px] text-muted-foreground">
                  We handle the technical side. You just send changes over WhatsApp.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {extras.map((e) => (
                  <span
                    key={e}
                    className="rounded-full border border-accent/15 bg-accent-soft px-3 py-1.5 text-[13px] font-medium text-accent"
                  >
                    {e}
                  </span>
                ))}
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
