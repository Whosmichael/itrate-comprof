import { SectionHead } from './section-head'

const card = 'grid min-w-0 content-start gap-3 rounded-md border border-border bg-surface p-7'
const tag = 'font-mono text-xs text-muted-foreground'

const extras = ['Local SEO', 'Google Business Profile', 'PDF company profile', 'Booking system', 'Simple web app']

export function Services() {
  return (
    <section id="services" className="section scroll-mt-20">
      <div className="container-site">
        <SectionHead eyebrow="Services" title="Everything your business needs to look professional online." />

        <div className="grid gap-4 lg:grid-cols-6">
          <article className="grid min-w-0 content-between gap-8 rounded-md bg-accent p-9 text-accent-foreground lg:col-span-4">
            <div className="grid gap-3.5">
              <span className="font-mono text-xs opacity-75">Core service</span>
              <h3 className="text-[clamp(26px,3vw,36px)] font-bold">Company Profile Website</h3>
              <p className="max-w-[46ch] opacity-85">
                Your official website: who you are, what you offer, and how to reach you. Built from scratch around
                your business, not an off-the-shelf template.
              </p>
            </div>
            <ul className="grid gap-x-5 gap-y-2.5 text-[15px] sm:grid-cols-2">
              {['Home & about us', 'Services / products pages', 'Gallery & portfolio', 'Contact, map, WhatsApp'].map(
                (i) => (
                  <li key={i}>
                    <span className="opacity-70">→ </span>
                    {i}
                  </li>
                ),
              )}
            </ul>
          </article>

          <article className={`${card} content-center lg:col-span-2`}>
            <span className={tag}>Campaigns</span>
            <h3 className="text-[21px] font-bold">Landing Page</h3>
            <p className="text-[15px] text-muted-foreground">
              One focused page for a promo, product launch, or event, built to get visitors to contact you.
            </p>
          </article>

          <article className="flex min-w-0 flex-wrap items-center justify-between gap-x-8 gap-y-4 rounded-md border border-border bg-surface p-7 lg:col-span-6">
            <div className="grid max-w-[520px] gap-2">
              <span className={tag}>Care & add-ons</span>
              <h3 className="text-[21px] font-bold">Domain, hosting, and regular updates</h3>
              <p className="text-[15px] text-muted-foreground">
                We handle the technical side. You just send changes over WhatsApp.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {extras.map((e) => (
                <span key={e} className="rounded-full bg-accent-soft px-3 py-1.5 text-[13px] font-medium text-accent">
                  {e}
                </span>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
