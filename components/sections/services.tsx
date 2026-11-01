'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import { Reveal } from '@/components/motion/reveal'
import { cn } from '@/lib/utils'
import { AutomationScene, MaintainScene, SearchScene, SystemScene } from './pillar-visuals'
import { SectionHead } from './section-head'

type Pillar = {
  name: string
  problem: string
  answer: string
  builds: string[]
  url: string
  Scene: () => React.JSX.Element
}

const pillars: Pillar[] = [
  {
    name: 'Get found online',
    problem: 'Customers can’t find us.',
    answer: 'We put your business where people search, and make it easy to choose you and get in touch.',
    builds: ['Company profile websites', 'Landing pages', 'Product catalogs', 'Google Business Profile', 'Local SEO'],
    url: 'search',
    Scene: SearchScene,
  },
  {
    name: 'Run your business',
    problem: 'Everything lives in chats and Excel.',
    answer: 'We build a simple system around how you already work, so orders, bookings, and stock stop getting lost.',
    builds: ['Booking & reservations', 'Inventory & orders', 'Simple CRM', 'Admin dashboards', 'Internal tools'],
    url: 'admin.yourbusiness.id',
    Scene: SystemScene,
  },
  {
    name: 'Work smarter with AI',
    problem: 'We retype the same things every day.',
    answer: 'We set up small automations that read, sort, and report for you, and hand you the result on WhatsApp.',
    builds: ['WhatsApp auto-replies', 'Data entry from documents', 'Automatic reports', 'Connecting your apps'],
    url: 'automations',
    Scene: AutomationScene,
  },
  {
    name: 'Keep it running',
    problem: 'Who fixes it when it breaks?',
    answer: 'We do. We host it, back it up, keep it secure, and keep improving it every month. You message us like a teammate.',
    builds: ['Hosting & domain', 'Backups & security', 'Fixes & updates', 'Monthly improvements', 'Support on WhatsApp'],
    url: 'status',
    Scene: MaintainScene,
  },
]

function Panel({ index }: { index: number }) {
  const p = pillars[index]
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-background shadow-[0_40px_80px_-40px_rgba(22,26,38,0.35)]">
      <div className="flex items-center gap-2 border-b border-border bg-surface px-4 py-2.5">
        {[0, 1, 2].map((i) => (
          <span key={i} className="size-2.5 rounded-full bg-border" />
        ))}
        <span className="ml-2 flex-1 truncate font-mono text-[11px] text-muted-foreground">{p.url}</span>
        <span className="font-mono text-[11px] text-accent">
          {String(index + 1).padStart(2, '0')}/{String(pillars.length).padStart(2, '0')}
        </span>
      </div>
      <div className="relative h-[450px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -12, filter: 'blur(6px)' }}
            transition={{ duration: 0.4 }}
          >
            <p.Scene />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

function PillarCopy({ p, i, active, onActive }: { p: Pillar; i: number; active: boolean; onActive: (i: number) => void }) {
  const ref = useRef<HTMLDivElement>(null)
  // Becomes active when it crosses the middle band of the viewport.
  const inView = useInView(ref, { margin: '-45% 0px -45% 0px' })
  useEffect(() => {
    if (inView) onActive(i)
  }, [inView, i, onActive])

  return (
    <div ref={ref} className="lg:flex lg:min-h-[62vh] lg:items-center">
      <motion.div
        className="grid gap-5"
        animate={{ opacity: active ? 1 : 0.3 }}
        transition={{ duration: 0.5 }}
      >
        <span className="font-mono text-xs tracking-[0.08em] text-accent uppercase">{p.name}</span>
        <h3 className="text-[clamp(30px,3.6vw,48px)] font-bold">{p.problem}</h3>
        <p className="max-w-[46ch] text-[17px] text-muted-foreground">{p.answer}</p>
        <div className="grid gap-2.5">
          <span className="font-mono text-[11px] tracking-[0.08em] text-muted-foreground uppercase">We build</span>
          {/* Each item gets a highlighter sweep, left to right, when the pillar is in focus */}
          <ul className="flex max-w-[56ch] flex-wrap gap-x-1.5 gap-y-2 text-[15px] leading-snug font-medium">
            {p.builds.map((b, k) => (
              <li
                key={b}
                className="rounded-[3px] bg-[linear-gradient(color-mix(in_srgb,var(--accent)_17%,transparent),color-mix(in_srgb,var(--accent)_17%,transparent))] bg-left bg-no-repeat px-1.5 py-0.5 text-foreground transition-[background-size] duration-500 ease-out [box-decoration-break:clone]"
                style={{
                  backgroundSize: active ? '100% 100%' : '0% 100%',
                  transitionDelay: active ? `${150 + k * 90}ms` : '0ms',
                }}
              >
                {b}
              </li>
            ))}
          </ul>
        </div>
        {/* Mobile and tablet: the scene sits under its copy */}
        <div className="mt-2 lg:hidden">
          <Panel index={i} />
        </div>
      </motion.div>
    </div>
  )
}

export function Services() {
  const [active, setActive] = useState(0)

  return (
    <section id="services" className="section scroll-mt-20">
      <div className="container-site">
        <SectionHead
          eyebrow="What we do"
          title="Enabling your business with tech."
          lead="Tell us the problem. We pick the right tool, build it, ship it, and stay to keep it working."
        />

        <div className="grid gap-16 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
          {/* Left: the four problems, with a progress rail */}
          <div className="relative grid gap-16 lg:gap-0 lg:pl-10">
            <span aria-hidden className="absolute top-0 bottom-0 left-0 hidden w-px bg-border lg:block" />
            <motion.span
              aria-hidden
              className="absolute top-0 left-0 hidden w-px bg-accent lg:block"
              animate={{ height: `${((active + 1) / pillars.length) * 100}%` }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />
            {pillars.map((p, i) => (
              <PillarCopy key={p.name} p={p} i={i} active={active === i} onActive={setActive} />
            ))}
          </div>

          {/* Right: sticky live panel (desktop) */}
          <div className="hidden lg:block">
            <Reveal className="sticky top-[calc(50vh-260px)]">
              <Panel index={active} />
              <div className="mt-5 flex justify-center gap-2">
                {pillars.map((p, i) => (
                  <span
                    key={p.name}
                    className={cn(
                      'h-1.5 rounded-full transition-all duration-500',
                      i === active ? 'w-8 bg-accent' : 'w-1.5 bg-border',
                    )}
                  />
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
