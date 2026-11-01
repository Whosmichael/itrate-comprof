'use client'

import { useEffect, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type Variants,
} from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'

// Each version adds something to the mock site, like a real client project.
const versions = [
  { v: 'v1.0', text: 'Home, menu, and contact', url: 'polycafe.id' },
  { v: 'v1.1', text: 'Catalog of 102 board games', url: 'polycafe.id/games' },
  { v: 'v1.2', text: 'Table booking + WhatsApp', url: 'polycafe.id/book' },
]
const STEP_MS = 2600
const HOLD_MS = 4200
const EASE = [0.22, 1, 0.36, 1] as const

const plainWords = 'Your business website. Launched fast, then'.split(' ')
const accentWords = 'always getting better.'.split(' ')

const word: Variants = {
  hidden: { opacity: 0, y: '0.45em', filter: 'blur(10px)' },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { delay: 0.15 + i * 0.07, duration: 0.7, ease: EASE },
  }),
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: (delay: number) => ({ opacity: 1, y: 0, transition: { delay, duration: 0.7, ease: EASE } }),
}

const pop = {
  initial: { opacity: 0, scale: 0.6, y: 12 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.9 },
  transition: { type: 'spring' as const, stiffness: 260, damping: 18 },
}

export function Hero() {
  // Only honour reduced motion after mount, so server and first client render match.
  const prefersReduced = useReducedMotion()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const reduce = mounted && !!prefersReduced
  const [stage, setStage] = useState(0)

  // Cycle v1.0 → v1.1 → v1.2, hold, then start again. Reduced motion shows the finished site.
  useEffect(() => {
    if (reduce) {
      setStage(versions.length - 1)
      return
    }
    const t = setTimeout(
      () => setStage((s) => (s + 1) % versions.length),
      stage === versions.length - 1 ? HOLD_MS : STEP_MS,
    )
    return () => clearTimeout(t)
  }, [stage, reduce])

  // Pointer tilt for the mockup.
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-9, 9]), { stiffness: 120, damping: 14 })
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [7, -7]), { stiffness: 120, damping: 14 })

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reduce || e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width - 0.5)
    py.set((e.clientY - r.top) / r.height - 0.5)
  }
  function onLeave() {
    px.set(0)
    py.set(0)
  }

  const initial = reduce ? 'show' : 'hidden'

  return (
    <section className="relative isolate overflow-hidden pt-[clamp(48px,7vw,96px)] pb-[clamp(64px,8vw,104px)]">
      {/* Background: dot grid fading out from the centre, plus two drifting glows */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 [background-image:radial-gradient(var(--line)_1.2px,transparent_1.2px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_70%_60%_at_60%_40%,#000_30%,transparent_75%)]"
      />
      <motion.div
        aria-hidden
        className="absolute top-[-10%] right-[-5%] -z-10 size-[520px] max-w-full rounded-full bg-accent/20 blur-[110px]"
        animate={reduce ? undefined : { x: [0, -60, 30, 0], y: [0, 40, -20, 0], scale: [1, 1.1, 0.95, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden
        className="absolute bottom-[-20%] left-[-10%] -z-10 size-[420px] max-w-full rounded-full bg-ok/10 blur-[110px]"
        animate={reduce ? undefined : { x: [0, 50, -20, 0], y: [0, -30, 20, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="container-site grid items-center gap-[clamp(48px,5vw,72px)] lg:grid-cols-[1.1fr_0.9fr]">
        <div className="grid min-w-0 gap-6">
          <motion.span className="eyebrow" variants={fadeUp} custom={0} initial={initial} animate="show">
            Websites for small businesses
          </motion.span>

          <h1 className="text-[clamp(38px,5vw,64px)] font-extrabold">
            {plainWords.map((w, i) => (
              <motion.span key={i} className="inline-block" variants={word} custom={i} initial={initial} animate="show">
                {w}&nbsp;
              </motion.span>
            ))}
            {accentWords.map((w, i) => (
              <motion.span
                key={`a${i}`}
                className="inline-block"
                variants={word}
                custom={plainWords.length + i}
                initial={initial}
                animate="show"
              >
                {/* Slow shimmer across the accent words */}
                <motion.span
                  className="bg-[linear-gradient(100deg,var(--accent)_25%,color-mix(in_srgb,var(--accent)_40%,var(--ok))_50%,var(--accent)_75%)] bg-[length:250%_100%] bg-clip-text text-transparent"
                  initial={{ backgroundPosition: '100% 0%' }}
                  animate={reduce ? undefined : { backgroundPosition: ['100% 0%', '0% 0%'] }}
                  transition={{ duration: 3.2, delay: 1.2, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
                >
                  {w}
                </motion.span>
                {i < accentWords.length - 1 && ' '}
              </motion.span>
            ))}
          </h1>

          <motion.p className="lead" variants={fadeUp} custom={0.9} initial={initial} animate="show">
            itrate builds company profile websites for Indonesian small businesses. We design, build, and launch the
            first version, then keep improving it with you as your business grows.
          </motion.p>

          <motion.div className="flex flex-wrap gap-3" variants={fadeUp} custom={1.05} initial={initial} animate="show">
            <a href="#contact" className={buttonVariants({ size: 'lg', className: 'group' })}>
              Start a Project <ArrowRight className="transition-transform group-hover:translate-x-1" />
            </a>
            <a href="#work" className={buttonVariants({ size: 'lg', variant: 'outline' })}>
              See Our Work
            </a>
          </motion.div>

          <motion.p
            className="flex items-center gap-2 text-sm text-muted-foreground"
            variants={fadeUp}
            custom={1.2}
            initial={initial}
            animate="show"
          >
            <span aria-hidden className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-ok opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-ok" />
            </span>
            First consultation is free, no commitment.
          </motion.p>
        </div>

        {/* Browser mockup: the site builds itself, version by version */}
        <motion.div
          className="min-w-0 [perspective:1200px]"
          initial={reduce ? false : { opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.35, duration: 0.9, ease: EASE }}
          onPointerMove={onMove}
          onPointerLeave={onLeave}
        >
          <motion.div
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
            className="relative"
            role="img"
            aria-label="Illustration of a website growing version by version"
          >
            <div className="overflow-hidden rounded-[12px] border border-border bg-surface shadow-[0_40px_80px_-30px_color-mix(in_srgb,var(--accent)_40%,transparent)]">
              {/* Browser bar */}
              <div className="relative flex items-center gap-2.5 border-b border-border px-3.5 py-2.5">
                {[0, 1, 2].map((i) => (
                  <span key={i} className="size-2.5 rounded-full bg-border" />
                ))}
                <span className="relative flex-1 overflow-hidden rounded bg-background px-2.5 py-1.5 font-mono text-xs text-muted-foreground">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={versions[stage].url}
                      className="block truncate"
                      initial={{ y: 12, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -12, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {versions[stage].url}
                    </motion.span>
                  </AnimatePresence>
                </span>
                {/* Deploy progress bar, replays on each new version */}
                {!reduce && (
                  <motion.span
                    key={`deploy-${stage}`}
                    aria-hidden
                    className="absolute bottom-[-1px] left-0 h-0.5 bg-accent"
                    initial={{ width: '0%', opacity: 1 }}
                    animate={{ width: '100%', opacity: [1, 1, 0] }}
                    transition={{ width: { duration: 1.1, ease: 'easeOut' }, opacity: { times: [0, 0.8, 1], duration: 1.4 } }}
                  />
                )}
              </div>

              {/* Mock page */}
              <div aria-hidden className="grid gap-3 p-5">
                <div className="grid h-[84px] content-center gap-2 rounded bg-accent-soft px-4">
                  {[58, 40].map((w, i) => (
                    <motion.div
                      key={w}
                      className="h-2.5 rounded-sm bg-border"
                      initial={reduce ? false : { width: 0 }}
                      animate={{ width: `${w}%` }}
                      transition={{ delay: 0.9 + i * 0.15, duration: 0.6, ease: 'easeOut' }}
                    />
                  ))}
                  <motion.div
                    className="h-2.5 rounded-sm bg-accent"
                    initial={reduce ? false : { width: 0 }}
                    animate={{ width: '34%' }}
                    transition={{ delay: 1.2, duration: 0.6, ease: 'easeOut' }}
                  />
                </div>

                {/* Cards: the third one ships in v1.1 */}
                <div className="grid grid-cols-3 gap-2.5">
                  <div className="h-16 rounded bg-background" />
                  <div className="h-16 rounded bg-background" />
                  <div className="relative h-16 rounded outline-1 -outline-offset-1 outline-border outline-dashed">
                    <AnimatePresence>
                      {stage >= 1 && (
                        <motion.div
                          key="card"
                          {...pop}
                          className={`absolute inset-0 grid grid-cols-3 gap-1 rounded p-2 transition-colors duration-500 ${stage === 1 ? 'bg-accent-soft outline-2 -outline-offset-2 outline-accent outline-dashed' : 'bg-background'}`}
                        >
                          {[0, 1, 2].map((i) => (
                            <motion.span
                              key={i}
                              className="origin-bottom rounded-sm bg-accent/50"
                              initial={{ scaleY: 0 }}
                              animate={{ scaleY: 1 }}
                              transition={{ delay: 0.2 + i * 0.08 }}
                            />
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Booking bar: ships in v1.2 */}
                <div className="relative h-11 rounded outline-1 -outline-offset-1 outline-border outline-dashed">
                  <AnimatePresence>
                    {stage >= 2 && (
                      <motion.div
                        key="booking"
                        {...pop}
                        className="absolute inset-0 flex items-center justify-between gap-3 rounded bg-background px-3"
                      >
                        <span className="flex gap-1.5">
                          {['19:00', '19:30', '20:00'].map((t, i) => (
                            <motion.span
                              key={t}
                              className={`rounded px-1.5 py-0.5 font-mono text-[10px] ${i === 1 ? 'bg-accent text-accent-foreground' : 'bg-border text-muted-foreground'}`}
                              initial={{ opacity: 0, y: 6 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.15 + i * 0.08 }}
                            >
                              {t}
                            </motion.span>
                          ))}
                        </span>
                        <span className="rounded-full bg-ok px-2.5 py-1 text-[10px] font-semibold text-white">WhatsApp</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Changelog */}
              <ul className="grid gap-2 border-t border-border px-5 pt-3.5 pb-4.5 font-mono text-[13px] leading-snug">
                {versions.map((c, i) => {
                  const state = i < stage ? 'shipped' : i === stage ? 'live' : 'queued'
                  return (
                    <motion.li
                      key={c.v}
                      className="grid grid-cols-[44px_1fr_auto] items-baseline gap-3"
                      animate={{ opacity: state === 'queued' ? 0.35 : 1 }}
                      transition={{ duration: 0.4 }}
                    >
                      <b className="font-medium text-accent">{c.v}</b>
                      <span className="min-w-0">{c.text}</span>
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.span
                          key={state}
                          initial={{ opacity: 0, x: 6 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -6 }}
                          transition={{ duration: 0.25 }}
                          className={`text-[11px] whitespace-nowrap ${state === 'live' ? 'text-ok' : 'text-muted-foreground'}`}
                        >
                          {state === 'live' ? '● live' : state === 'shipped' ? '✓ shipped' : 'queued'}
                        </motion.span>
                      </AnimatePresence>
                    </motion.li>
                  )
                })}
              </ul>
            </div>

            {/* Floating toast announcing each release */}
            <div className="pointer-events-none absolute -top-5 right-3 sm:-right-6 [transform:translateZ(60px)]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={stage}
                  initial={reduce ? false : { opacity: 0, y: 14, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22, delay: 0.5 }}
                  className="flex items-center gap-2.5 rounded-lg border border-border bg-surface px-3.5 py-2.5 text-[13px] font-medium shadow-[0_16px_40px_-16px_color-mix(in_srgb,var(--ink)_35%,transparent)]"
                >
                  <span className="grid size-6 place-items-center rounded-full bg-ok/15 text-[11px] text-ok">✓</span>
                  <span>
                    <span className="font-mono text-accent">{versions[stage].v}</span>&nbsp;deployed
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
