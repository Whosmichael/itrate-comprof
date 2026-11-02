'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { useReducedMotionSafe } from '@/lib/use-reduced-motion'
import { MaturingWord } from './maturing-word'
import { Backdrop } from '@/components/layout/backdrop'

// One business, three releases: the same loop we run for clients.
const versions = [
  { v: 'v1.0', text: 'Company website launched', url: 'yourbusiness.id', label: 'Website' },
  { v: 'v1.1', text: 'Booking & stock system', url: 'admin.yourbusiness.id', label: 'Custom system' },
  { v: 'v1.2', text: 'AI replies on WhatsApp', url: 'wa.me/yourbusiness', label: 'AI automation' },
]
const STEP_MS = 3800
const HOLD_MS = 5200
const EASE = [0.22, 1, 0.36, 1] as const

const headline = [
  { w: 'Build.', accent: false },
  { w: 'Ship.', accent: false },
  { w: 'Iterate.', accent: true },
]

const screen = {
  initial: { opacity: 0, y: 14, filter: 'blur(4px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  exit: { opacity: 0, y: -10, filter: 'blur(4px)' },
  transition: { duration: 0.45, ease: EASE },
}

function WebsiteScreen() {
  return (
    <motion.div {...screen} className="absolute inset-0 grid content-start gap-3 p-5">
      <div className="grid h-[84px] content-center gap-2 rounded bg-accent-soft px-4">
        {[58, 40].map((w, i) => (
          <motion.div
            key={w}
            className="h-2.5 origin-left rounded-sm bg-border"
            style={{ width: `${w}%` }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.2 + i * 0.12, duration: 0.6, ease: 'easeOut' }}
          />
        ))}
        <motion.div
          className="h-2.5 w-[30%] origin-left rounded-sm bg-accent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.45, duration: 0.6, ease: 'easeOut' }}
        />
      </div>
      <div className="grid grid-cols-3 gap-2.5">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="h-16 rounded bg-background"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.1 }}
          />
        ))}
      </div>
      <motion.div
        className="flex h-10 items-center justify-between rounded bg-background px-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.85 }}
      >
        <div className="h-2 w-1/3 rounded-sm bg-border" />
        <span className="rounded-full bg-ok px-2.5 py-1 text-[10px] font-semibold text-white">WhatsApp</span>
      </motion.div>
    </motion.div>
  )
}

const bars = [38, 52, 44, 68, 60, 82, 74]

function SystemScreen() {
  return (
    <motion.div {...screen} className="absolute inset-0 grid grid-cols-[64px_1fr] gap-3 p-5">
      <div className="grid content-start gap-2 rounded bg-background p-2.5">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className={`h-2 rounded-sm ${i === 1 ? 'bg-accent' : 'bg-border'}`} />
        ))}
      </div>
      <div className="grid min-w-0 content-start gap-3">
        <div className="grid grid-cols-3 gap-2">
          {[
            ['Bookings', '128'],
            ['Stock', '64'],
            ['Orders', '37'],
          ].map(([k, v], i) => (
            <motion.div
              key={k}
              className="rounded bg-background px-2.5 py-2"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.08 }}
            >
              <div className="text-[9px] text-muted-foreground">{k}</div>
              <div className="font-mono text-sm font-medium">{v}</div>
            </motion.div>
          ))}
        </div>
        <div className="flex h-[78px] items-end gap-1.5 rounded bg-background px-3 pt-3 pb-2">
          {bars.map((h, i) => (
            <motion.span
              key={i}
              className={`flex-1 origin-bottom rounded-t-sm ${i === bars.length - 2 ? 'bg-accent' : 'bg-accent/35'}`}
              style={{ height: `${h}%` }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 0.35 + i * 0.06, duration: 0.5, ease: EASE }}
            />
          ))}
        </div>
        <div className="grid gap-1.5">
          {[0, 1].map((i) => (
            <motion.div
              key={i}
              className="flex items-center gap-2 rounded bg-background px-2.5 py-1.5"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + i * 0.1 }}
            >
              <span className="size-1.5 rounded-full bg-ok" />
              <span className="h-1.5 w-1/3 rounded-sm bg-border" />
              <span className="ml-auto font-mono text-[9px] text-muted-foreground">{i ? '19:30' : '18:00'}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

const chat = [
  { from: 'them', text: 'Hi, is there a table for 4 tonight?', at: 0.2 },
  { from: 'ai', text: 'Yes! 19:30 is free. Shall I book it for you?', at: 1.4 },
  { from: 'them', text: 'Yes please 🙏', at: 2.3 },
  { from: 'ai', text: 'Booked ✓ See you at 19:30.', at: 3.0 },
]

function AiScreen() {
  return (
    <motion.div {...screen} className="absolute inset-0 flex flex-col gap-2 p-5">
      <div className="mb-1 flex items-center gap-2 text-[11px] font-semibold">
        <span className="grid size-6 place-items-center rounded-full bg-accent-soft font-mono text-[10px] text-accent">AI</span>
        Assistant
        <span className="ml-1 size-1.5 rounded-full bg-ok" />
        <span className="font-normal text-muted-foreground">online</span>
      </div>
      {chat.map((m, i) => (
        <motion.div
          key={i}
          className={`max-w-[78%] rounded-lg px-3 py-2 text-[11px] leading-snug ${m.from === 'ai' ? 'self-start rounded-tl-sm bg-accent-soft' : 'self-end rounded-tr-sm bg-ok/15'}`}
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: m.at, type: 'spring', stiffness: 300, damping: 24 }}
        >
          {m.text}
        </motion.div>
      ))}
      {/* Typing dots shown briefly before the first AI reply, in the reply's place */}
      <motion.div
        className="absolute top-[94px] left-5 flex gap-1 rounded-lg rounded-tl-sm bg-accent-soft px-3 py-2.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ times: [0, 0.15, 0.85, 1], delay: 0.55, duration: 0.85 }}
      >
        {[0, 1, 2].map((d) => (
          <motion.span
            key={d}
            className="size-1.5 rounded-full bg-accent/60"
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: d * 0.12 }}
          />
        ))}
      </motion.div>
    </motion.div>
  )
}

const screens = [WebsiteScreen, SystemScreen, AiScreen]

export function Hero() {
  const reduce = useReducedMotionSafe()
  const [stage, setStage] = useState(0)

  // Cycle website → system → AI, hold, then start again. Reduced motion shows the last stage.
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
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-8, 8]), { stiffness: 120, damping: 14 })
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [6, -6]), { stiffness: 120, damping: 14 })

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

  const Screen = screens[stage]

  return (
    <section className="relative isolate overflow-hidden pt-[clamp(56px,8vw,112px)] pb-[clamp(72px,9vw,120px)]">
      {/* Background: bold dot grid fading out from the centre, plus three slow glows */}
      <Backdrop variant="hero" />

      <div className="container-site grid items-center gap-[clamp(48px,5vw,72px)] lg:grid-cols-[1.05fr_0.95fr]">
        <div className="grid min-w-0 gap-6">
          {/* Entrances are CSS (hero-fade / hero-word) so the text paints before hydration */}
          <span className="eyebrow hero-fade" style={{ '--d': '0s' } as React.CSSProperties}>
            Your tech team for small businesses
          </span>

          <h1 className="text-[clamp(48px,7vw,92px)] leading-[0.98] font-extrabold">
            {headline.map((h, i) => (
              <span
                key={h.w}
                className="hero-word mr-[0.22em] inline-block last:mr-0"
                style={{ '--d': `${0.15 + i * 0.18}s` } as React.CSSProperties}
              >
                {h.accent ? (
                  <MaturingWord word={h.w} startDelay={0.45 + i * 0.18} />
                ) : (
                  h.w
                )}
              </span>
            ))}
          </h1>

          <p className="lead hero-fade" style={{ '--d': '0.75s' } as React.CSSProperties}>
            We’re the tech team your business doesn’t have yet. Websites, custom systems, and AI automations, built
            for you and looked after long after launch.
          </p>

          <div className="hero-fade flex flex-wrap gap-3" style={{ '--d': '0.9s' } as React.CSSProperties}>
            <a href="#contact" className={buttonVariants({ size: 'lg', className: 'group' })}>
              Start a Project <ArrowRight className="transition-transform group-hover:translate-x-1" />
            </a>
            <a href="#work" className={buttonVariants({ size: 'lg', variant: 'outline' })}>
              See Our Projects
            </a>
          </div>

          <p
            className="hero-fade flex items-center gap-2 text-sm text-muted-foreground"
            style={{ '--d': '1.05s' } as React.CSSProperties}
          >
            <span aria-hidden className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-ok opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-ok" />
            </span>
            First consultation is free, no commitment.
          </p>
        </div>

        {/* Mockup: one business growing from website to system to AI */}
        <motion.div
          className="min-w-0 [perspective:1200px]"
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.35, duration: 0.9, ease: EASE }}
          onPointerMove={onMove}
          onPointerLeave={onLeave}
        >
          <motion.div
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
            className="relative"
            role="img"
            aria-label="Illustration of a business growing from a website to a custom system to an AI assistant"
          >
            <div className="overflow-hidden rounded-[14px] border border-border bg-surface shadow-[0_40px_80px_-34px_color-mix(in_srgb,var(--accent)_40%,transparent)]">
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
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={versions[stage].label}
                    className="hidden rounded-full bg-accent-soft px-2 py-0.5 text-[10px] font-semibold whitespace-nowrap text-accent sm:inline"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.25 }}
                  >
                    {versions[stage].label}
                  </motion.span>
                </AnimatePresence>
                {/* Deploy progress bar, replays on each release */}
                {!reduce && (
                  <motion.span
                    key={`deploy-${stage}`}
                    aria-hidden
                    className="absolute bottom-[-1px] left-0 h-0.5 w-full origin-left bg-accent"
                    initial={{ scaleX: 0, opacity: 1 }}
                    animate={{ scaleX: 1, opacity: [1, 1, 0] }}
                    transition={{ scaleX: { duration: 1.1, ease: 'easeOut' }, opacity: { times: [0, 0.8, 1], duration: 1.4 } }}
                  />
                )}
              </div>

              {/* Screen */}
              <div aria-hidden className="relative h-[232px] overflow-hidden">
                <AnimatePresence mode="wait">
                  <Screen key={stage} />
                </AnimatePresence>
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
                  initial={{ opacity: 0, y: 14, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22, delay: 0.5 }}
                  className="flex items-center gap-2.5 rounded-lg border border-border bg-surface px-3.5 py-2.5 text-[13px] font-medium shadow-[0_16px_40px_-16px_rgba(var(--shadow),0.3)]"
                >
                  <span className="grid size-6 place-items-center rounded-full bg-ok/15 text-[11px] text-ok">✓</span>
                  <span>
                    <span className="font-mono text-accent">{versions[stage].v}</span>&nbsp;shipped
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
