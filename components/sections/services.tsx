'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import { Reveal } from '@/components/motion/reveal'
import { cn } from '@/lib/utils'
import { Bot, LifeBuoy } from 'lucide-react'
import { AutomationScene, NumbersScene, SearchScene, SellScene } from './pillar-visuals'
import { SectionHead } from './section-head'
import { Backdrop } from '@/components/layout/backdrop'

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
    name: 'Get customers',
    problem: 'Customers can’t find us.',
    answer: 'We put your business where people search, and make it easy to choose you and get in touch.',
    builds: ['Company profiles', 'Personal & CV websites', 'Landing pages', 'Google Business Profile', 'Local SEO'],
    url: 'kopisenja.id',
    Scene: SearchScene,
  },
  {
    name: 'Sell & keep customers',
    problem: 'Orders and payments are all manual chat.',
    answer: 'We turn chats into a simple ordering and payment flow, then follow up so customers come back.',
    builds: ['Product catalogs', 'Online ordering & booking', 'QRIS & payment links', 'WhatsApp ordering', 'Follow-ups & reviews', 'Simple CRM'],
    url: 'orders.yourbusiness.id',
    Scene: SellScene,
  },
  {
    name: 'Run the business',
    problem: 'Stock, orders, and money live in Excel.',
    answer: 'We build a simple system around how you already work, and automate the retyping.',
    builds: ['Inventory & orders', 'Sales recording & invoices', 'Staff schedules', 'Data entry from documents', 'Internal tools'],
    url: 'admin.yourbusiness.id',
    Scene: AutomationScene,
  },
  {
    name: 'Know your numbers',
    problem: 'We don’t know what’s actually making money.',
    answer: 'We pull your sales, stock, and costs into one clear view, and send you a summary every day.',
    builds: ['Dashboards', 'Automatic daily reports', 'Sales & stock insights', 'Reports on WhatsApp'],
    url: 'insights.yourbusiness.id',
    Scene: NumbersScene,
  },
]

function Panel({ index }: { index: number }) {
  const p = pillars[index]
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-background shadow-[0_40px_80px_-40px_rgba(var(--shadow),0.35)]">
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

/** Items with a highlighter sweep, left to right, once they scroll into view. */
function Highlights({ items }: { items: string[] }) {
  const ref = useRef<HTMLUListElement>(null)
  const on = useInView(ref, { once: true, margin: '0px 0px -15% 0px' })
  return (
    <ul ref={ref} className="flex flex-wrap gap-x-1.5 gap-y-2 text-[14.5px] leading-snug font-medium">
      {items.map((b, k) => (
        <li
          key={b}
          className="rounded-[3px] bg-[linear-gradient(color-mix(in_srgb,var(--accent)_17%,transparent),color-mix(in_srgb,var(--accent)_17%,transparent))] bg-left bg-no-repeat px-1.5 py-0.5 transition-[background-size] duration-500 ease-out"
          style={{ backgroundSize: on ? '100% 100%' : '0% 100%', transitionDelay: on ? `${200 + k * 90}ms` : '0ms' }}
        >
          {b}
        </li>
      ))}
    </ul>
  )
}

/** 30 days of uptime that fill in when seen. Illustrative. */
function UptimeStrip() {
  const ref = useRef<HTMLDivElement>(null)
  const on = useInView(ref, { once: true, margin: '0px 0px -15% 0px' })
  return (
    <div ref={ref} className="mt-1 grid gap-2 rounded-lg border border-border bg-surface/80 p-3.5">
      <div className="flex items-center justify-between text-[12px]">
        <span className="font-semibold">Uptime · last 30 days</span>
        <span className="flex items-center gap-1.5 font-mono text-[11px] text-ok">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-ok opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-ok" />
          </span>
          all systems normal
        </span>
      </div>
      <div className="flex h-7 items-end gap-[3px]">
        {Array.from({ length: 30 }, (_, i) => (
          <motion.span
            key={i}
            className={cn('h-full flex-1 origin-bottom rounded-[2px]', i === 11 ? 'bg-[#e8a33a]' : 'bg-ok/70')}
            initial={{ scaleY: 0 }}
            animate={on ? { scaleY: 1 } : undefined}
            transition={{ delay: 0.3 + i * 0.025, duration: 0.35 }}
          />
        ))}
      </div>
    </div>
  )
}

export function Services() {
  const [active, setActive] = useState(0)

  return (
    <section id="services" className="section relative isolate scroll-mt-20">
      <Backdrop variant="grid" side="right" />
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

        {/* Promises that apply to every pillar */}
        <div className="mt-[clamp(56px,8vw,96px)] grid gap-4 md:grid-cols-[1fr_1.25fr]">
          <Reveal className="min-w-0">
            <article className="group grid h-full content-start gap-4 rounded-xl border border-border bg-surface p-7 transition-[border-color,transform] duration-500 hover:-translate-y-0.5 hover:border-accent/30">
              <div className="flex items-center gap-3">
                <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent transition-transform duration-500 group-hover:-rotate-6">
                  <Bot className="size-5" />
                </span>
                <span className="font-mono text-[10.5px] tracking-[0.08em] text-muted-foreground uppercase">In everything we build</span>
              </div>
              <h3 className="text-[22px] font-bold">AI built in where it saves you time</h3>
              <p className="text-[15px] text-muted-foreground">
                Wherever a task is repetitive, we let AI handle it, and you stay in control of what goes out.
              </p>
              <Highlights items={['WhatsApp auto-replies', 'Reading documents', 'Automatic reports', 'Connecting your apps']} />
            </article>
          </Reveal>

          <Reveal className="min-w-0" delay={0.1}>
            <article className="group grid h-full content-start gap-4 rounded-xl border border-accent/25 bg-[linear-gradient(140deg,var(--accent-soft),var(--surface)_70%)] p-7 transition-transform duration-500 hover:-translate-y-0.5">
              <div className="flex items-center gap-3">
                <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-surface text-accent transition-transform duration-500 group-hover:-rotate-6">
                  <LifeBuoy className="size-5" />
                </span>
                <span className="font-mono text-[10.5px] tracking-[0.08em] text-muted-foreground uppercase">After launch, every month</span>
              </div>
              <h3 className="text-[22px] font-bold">We keep it running and improving</h3>
              <p className="text-[15px] text-muted-foreground">
                Other vendors disappear after launch. We stay: we host it, protect it, fix what breaks, and ship improvements.
                You message us on WhatsApp like a teammate.
              </p>
              <Highlights items={['Hosting & domain', 'Backups & security', 'Fixes & updates', 'Monthly improvements', 'Support on WhatsApp']} />
              <UptimeStrip />
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
