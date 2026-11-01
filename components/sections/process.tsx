'use client'

import { useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import { Compass, PencilRuler, Rocket, RotateCw, Wrench, type LucideIcon } from 'lucide-react'
import { Reveal } from '@/components/motion/reveal'
import { cn } from '@/lib/utils'
import { SectionHead } from './section-head'

type Step = { title: string; icon: LucideIcon; doText: string; get: string; you: string }

const steps: Step[] = [
  {
    title: 'Discover',
    icon: Compass,
    doText: 'We learn how your business works today. Already using some tools? We review them and advise on what to improve.',
    get: 'A short plan with our recommendation',
    you: 'Tell us how you work and what’s slowing you down.',
  },
  {
    title: 'Design',
    icon: PencilRuler,
    doText: 'We design how it will look and work, before any code is written.',
    get: 'A clickable preview you can try',
    you: 'Review it and tell us what to change.',
  },
  {
    title: 'Build',
    icon: Wrench,
    doText: 'We build it to run fast and reliably, on every device your team uses.',
    get: 'A working version you can test',
    you: 'Try it with real tasks and flag anything odd.',
  },
  {
    title: 'Ship',
    icon: Rocket,
    doText: 'It goes live, and we walk you and your team through it.',
    get: 'A live product, plus a walkthrough for your team',
    you: 'Start using it.',
  },
  {
    title: 'Iterate',
    icon: RotateCw,
    doText: 'We watch what works and improve what we’ve built based on your input.',
    get: 'Regular improvements, shipped as new versions',
    you: 'Tell us what you need next.',
  },
]

const N = steps.length
// Ring geometry (SVG units)
const C = 200
const R = 150
const angleOf = (i: number) => -90 + (360 / N) * i // first step at the top
const pointAt = (deg: number, r = R) => {
  const rad = (deg * Math.PI) / 180
  return { x: C + r * Math.cos(rad), y: C + r * Math.sin(rad) }
}

function StepDetail({ step, i }: { step: Step; i: number }) {
  return (
    <div className="grid gap-4">
      <div className="flex items-center gap-3">
        <span className="grid size-10 place-items-center rounded-lg bg-accent-soft text-accent">
          <step.icon className="size-5" />
        </span>
        <h3 className="text-[clamp(26px,2.6vw,34px)] font-bold">{step.title}</h3>
        <span className="font-mono text-xs text-accent">
          {String(i + 1).padStart(2, '0')} / {String(N).padStart(2, '0')}
        </span>
      </div>
      <p className="max-w-[48ch] text-[15px] text-muted-foreground">{step.doText}</p>
      <dl className="grid max-w-[48ch] gap-3 text-[14px]">
        <div className="grid gap-1 rounded-lg border border-accent/25 bg-accent-soft px-3.5 py-2.5">
          <dt className="font-mono text-[10.5px] tracking-[0.08em] text-accent uppercase">You get</dt>
          <dd className="font-semibold">{step.get}</dd>
        </div>
        <div className="grid gap-1 px-3.5">
          <dt className="font-mono text-[10.5px] tracking-[0.08em] text-muted-foreground uppercase">Your part</dt>
          <dd>{step.you}</dd>
        </div>
      </dl>
      {i === N - 1 && (
        <p className="flex items-center gap-2 px-3.5 font-mono text-[12px] text-muted-foreground">
          <RotateCw className="size-3.5 text-accent" /> Then back to Discover, for v1.1
        </p>
      )}
    </div>
  )
}

function Ring({ progress, active }: { progress: MotionValue<number>; active: number }) {
  const angle = useTransform(progress, (p) => -90 + p * 360)
  const dotX = useTransform(angle, (a) => pointAt(a).x)
  const dotY = useTransform(angle, (a) => pointAt(a).y)
  // Progress arc colors run along the ring: young at the start, mature at the dot.
  const sweep = useTransform(progress, (p) => `${Math.max(0, p) * 360}deg`)
  const arc = useMotionTemplate`conic-gradient(from 0deg, var(--m0) 0deg, var(--m1) calc(${sweep} * 0.55), var(--m2) ${sweep}, transparent ${sweep})`

  return (
    <div className="relative aspect-square w-full max-w-[min(540px,68vh)]">
      {/* Track */}
      <svg viewBox="0 0 400 400" className="absolute inset-0 size-full" aria-hidden>
        <circle cx={C} cy={C} r={R} fill="none" stroke="var(--line)" strokeWidth="10" />
      </svg>
      {/* Progress arc: a conic gradient clipped to the ring (radius 150/200 of the box, 10 wide) */}
      <motion.div
        aria-hidden
        className="absolute inset-0 rounded-full [mask-image:radial-gradient(farthest-side,transparent_calc(72.5%-0.5px),#000_72.5%,#000_77.5%,transparent_calc(77.5%+0.5px))]"
        style={{ backgroundImage: arc }}
      />
      <svg viewBox="0 0 400 400" className="absolute inset-0 size-full overflow-visible" aria-hidden>
        <defs>
          <filter id="loop-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" />
          </filter>
        </defs>
        {/* Step nodes */}
        {steps.map((s, i) => {
          const p = pointAt(angleOf(i))
          const reached = i <= active
          return (
            <g key={s.title}>
              {i === active && (
                <motion.circle
                  cx={p.x}
                  cy={p.y}
                  r="26"
                  fill="var(--accent)"
                  initial={{ opacity: 0.35, scale: 0.6 }}
                  animate={{ opacity: 0, scale: 1.4 }}
                  transition={{ duration: 1.6, repeat: Infinity }}
                  style={{ transformOrigin: `${p.x}px ${p.y}px` }}
                />
              )}
              <circle
                cx={p.x}
                cy={p.y}
                r="19"
                fill={reached ? 'var(--accent)' : 'var(--surface)'}
                stroke={reached ? 'var(--accent)' : 'var(--line)'}
                strokeWidth="3"
                style={{ transition: 'fill .4s, stroke .4s' }}
              />
            </g>
          )
        })}
        {/* Travelling dot */}
        <motion.circle cx={dotX} cy={dotY} r="10" fill="var(--accent)" filter="url(#loop-glow)" opacity="0.7" />
        <motion.circle cx={dotX} cy={dotY} r="6" fill="var(--surface)" stroke="var(--accent)" strokeWidth="3" />
      </svg>

      {/* Step icons inside the nodes */}
      {steps.map((s, i) => {
        const p = pointAt(angleOf(i))
        const reached = i <= active
        return (
          <motion.span
            key={`icon-${s.title}`}
            aria-hidden
            className={cn(
              'absolute grid -translate-x-1/2 -translate-y-1/2 place-items-center transition-colors duration-300',
              reached ? 'text-accent-foreground' : 'text-muted-foreground',
            )}
            style={{ left: `${(p.x / 400) * 100}%`, top: `${(p.y / 400) * 100}%` }}
            animate={i === active ? { scale: [1, 1.18, 1] } : { scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <s.icon className="size-[18px]" strokeWidth={2.2} />
          </motion.span>
        )
      })}

      {/* Step labels around the ring */}
      {steps.map((s, i) => {
        const p = pointAt(angleOf(i), R + 52)
        return (
          <span
            key={s.title}
            className={cn(
              'absolute flex -translate-x-1/2 -translate-y-1/2 items-baseline gap-1.5 font-display text-[15px] whitespace-nowrap transition-colors duration-300',
              i === active ? 'font-bold text-foreground' : i < active ? 'text-foreground/70' : 'text-muted-foreground',
            )}
            style={{ left: `${(p.x / 400) * 100}%`, top: `${(p.y / 400) * 100}%` }}
          >
            <span className="font-mono text-[10px] font-normal text-accent">{String(i + 1).padStart(2, '0')}</span>
            {s.title}
          </span>
        )
      })}

      {/* Center: the active step */}
      <div className="absolute inset-[24%] grid place-items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="grid justify-items-center gap-2 text-center"
            initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -10, filter: 'blur(6px)' }}
            transition={{ duration: 0.35 }}
          >
            {(() => {
              const Icon = steps[active].icon
              return (
                <motion.span
                  className="mb-1 grid size-14 place-items-center rounded-2xl bg-accent-soft text-accent"
                  initial={{ rotate: -20, scale: 0.7 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 16 }}
                >
                  <Icon className="size-7" />
                </motion.span>
              )
            })()}
            <span className="font-mono text-[11px] text-accent">
              {String(active + 1).padStart(2, '0')} / {String(N).padStart(2, '0')}
            </span>
            <span className="font-display text-[clamp(28px,3vw,40px)] leading-none font-extrabold">{steps[active].title}</span>
            {active === N - 1 ? (
              <span className="mt-1 flex items-center gap-1.5 font-mono text-[12px] text-muted-foreground">
                <motion.span animate={{ rotate: 360 }} transition={{ duration: 2.4, repeat: Infinity, ease: 'linear' }}>
                  <RotateCw className="size-3.5 text-accent" />
                </motion.span>
                v1.1 → back to Discover
              </span>
            ) : (
              <span className="mt-1 font-mono text-[12px] text-muted-foreground">
                next: {steps[active + 1].title}
              </span>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export function Process() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 22, restDelta: 0.0005 })
  const [active, setActive] = useState(0)

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    setActive(Math.min(N - 1, Math.max(0, Math.floor(p * N * 0.999))))
  })

  // Scroll the page so the chosen step is in focus.
  function goTo(i: number) {
    const el = ref.current
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY
    const travel = el.offsetHeight - window.innerHeight
    window.scrollTo({ top: top + travel * ((i + 0.5) / N), behavior: 'smooth' })
  }

  return (
    <section id="process" className="scroll-mt-20 bg-background">
      {/* Desktop: the loop pins in place and is driven by scroll */}
      <div ref={ref} className="relative hidden lg:block lg:h-[340vh]">
        <div className="sticky top-[68px] flex h-[calc(100vh-68px)] items-center">
          <div className="container-site grid w-full grid-cols-[0.9fr_1.1fr] items-center gap-16">
            <div className="grid content-center gap-7">
              <div className="grid gap-3.5">
                <span className="eyebrow">Process</span>
                <h2 className="text-[clamp(30px,3.4vw,44px)] font-bold">Build. Ship. Iterate. On repeat.</h2>
                <p className="lead">
                  Nothing is finished on launch day. Every project runs through the same loop, then goes round again.
                </p>
              </div>

              <div className="min-h-[290px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <StepDetail step={steps[active]} i={active} />
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="flex flex-wrap gap-2">
                {steps.map((s, i) => (
                  <button
                    key={s.title}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-current={i === active ? 'step' : undefined}
                    className={cn(
                      'inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[13px] font-medium transition-colors',
                      i === active
                        ? 'border-accent bg-accent text-accent-foreground'
                        : 'border-border bg-surface text-muted-foreground hover:text-foreground',
                    )}
                  >
                    <s.icon className="size-3.5" />
                    {s.title}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid place-items-center">
              <Ring progress={progress} active={active} />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile and tablet: the same steps as a list */}
      <div className="section lg:hidden">
        <div className="container-site">
          <SectionHead
            eyebrow="Process"
            title="Build. Ship. Iterate. On repeat."
            lead="Nothing is finished on launch day. Every project runs through the same loop, then goes round again."
          />
          <ol className="relative grid gap-10 border-l border-border pl-8">
            {steps.map((s, i) => (
              <Reveal as="li" key={s.title} className="relative">
                <span className="absolute top-1 -left-[49px] grid size-[34px] place-items-center rounded-full border border-accent/30 bg-surface text-accent">
                  <s.icon className="size-4" />
                </span>
                <StepDetail step={s} i={i} />
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
