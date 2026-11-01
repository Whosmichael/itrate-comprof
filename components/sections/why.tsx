import { Clock, KeyRound, LifeBuoy, MessageCircle } from 'lucide-react'
import { Reveal } from '@/components/motion/reveal'
import { SectionHead } from './section-head'

const reasons = [
  { icon: Clock, title: 'Ship fast', text: 'Version one goes live first, so you get value sooner.' },
  { icon: MessageCircle, title: 'Plain language', text: 'No confusing tech jargon. We explain every step.' },
  { icon: KeyRound, title: 'Yours to keep', text: 'Domain, content, and access are in your name. Nothing is locked in.' },
  { icon: LifeBuoy, title: 'We stay', text: 'Other vendors disappear after launch. We keep it running and improving.' },
]

export function Why() {
  return (
    <section className="section border-y border-border bg-surface">
      <div className="container-site">
        <SectionHead eyebrow="Why itrate" title="Made for small businesses, not corporations." />
        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((r, i) => (
            <Reveal key={r.title} delay={i * 0.08} className="group grid min-w-0 content-start gap-3">
              <span className="grid size-11 place-items-center rounded-lg bg-accent-soft text-accent transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-[-6deg]">
                <r.icon className="size-5" />
              </span>
              <h3 className="mt-2 text-[21px] font-bold">{r.title}</h3>
              <p className="text-[15px] text-muted-foreground">{r.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
