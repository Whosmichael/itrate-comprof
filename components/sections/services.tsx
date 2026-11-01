import { Bot, Globe, LayoutDashboard, LifeBuoy, type LucideIcon } from 'lucide-react'
import { Reveal } from '@/components/motion/reveal'
import { cn } from '@/lib/utils'
import { SectionHead } from './section-head'

type Pillar = {
  icon: LucideIcon
  title: string
  problem: string
  text: string
  items: string[]
  highlight?: boolean
}

const pillars: Pillar[] = [
  {
    icon: Globe,
    title: 'Get found online',
    problem: '“Customers can’t find us, or don’t trust what they find.”',
    text: 'A professional presence that makes it easy to choose you and contact you.',
    items: ['Company profile websites', 'Landing pages', 'Product catalogs', 'Google Business Profile', 'Local SEO'],
  },
  {
    icon: LayoutDashboard,
    title: 'Run your business',
    problem: '“Everything lives in WhatsApp chats and Excel.”',
    text: 'Custom systems built around how you already work, so nothing gets lost.',
    items: ['Booking & reservations', 'Inventory & orders', 'Simple CRM', 'Admin dashboards', 'Internal tools'],
  },
  {
    icon: Bot,
    title: 'Work smarter with AI',
    problem: '“We spend hours on the same repetitive tasks.”',
    text: 'Simple automations that take the routine work off your plate.',
    items: ['WhatsApp auto-replies', 'Data entry from documents', 'Automatic reports', 'Content help', 'Connecting your apps'],
  },
  {
    icon: LifeBuoy,
    title: 'Keep it running',
    problem: '“Who fixes it when something breaks?”',
    text: 'We don’t disappear after launch. We host it, look after it, and keep improving it.',
    items: ['Hosting & domain', 'Backups & security', 'Fixes & updates', 'Monthly improvements', 'Support on WhatsApp'],
    highlight: true,
  },
]

export function Services() {
  return (
    <section id="services" className="section scroll-mt-20">
      <div className="container-site">
        <SectionHead
          eyebrow="What we do"
          title="One team for every part of your tech."
          lead="Tell us the problem. We pick the right tool, build it, ship it, and stay to keep it working."
        />

        <div className="grid gap-4 md:grid-cols-2">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={(i % 2) * 0.1} className="min-w-0">
              <article
                className={cn(
                  'group relative grid h-full content-start gap-5 overflow-hidden rounded-xl border p-8 transition-[transform,box-shadow,border-color] duration-500 hover:-translate-y-1 hover:shadow-[0_24px_50px_-30px_rgba(58,91,217,0.35)]',
                  p.highlight
                    ? 'border-accent/25 bg-[linear-gradient(140deg,var(--accent-soft),var(--surface)_75%)]'
                    : 'border-border bg-surface hover:border-accent/30',
                )}
              >
                <div aria-hidden className="absolute -top-20 -right-20 size-48 rounded-full bg-accent/0 blur-3xl transition-colors duration-700 group-hover:bg-accent/10" />
                <div className="relative flex items-center gap-3">
                  <span className="grid size-11 place-items-center rounded-lg bg-accent-soft text-accent transition-transform duration-500 group-hover:-rotate-6">
                    <p.icon className="size-5" />
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <div className="relative grid gap-2.5">
                  <h3 className="text-[clamp(22px,2.4vw,28px)] font-bold">{p.title}</h3>
                  <p className="text-[15px] text-muted-foreground italic">{p.problem}</p>
                  <p className="text-[15px]">{p.text}</p>
                </div>
                <ul className="relative flex flex-wrap gap-2">
                  {p.items.map((it) => (
                    <li
                      key={it}
                      className="rounded-full border border-accent/15 bg-accent-soft px-3 py-1.5 text-[13px] font-medium text-accent"
                    >
                      {it}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
