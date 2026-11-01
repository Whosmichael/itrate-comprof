'use client'

import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { useReducedMotionSafe } from '@/lib/use-reduced-motion'
import { Reveal } from '@/components/motion/reveal'
import { SectionHead } from './section-head'

const steps = [
  {
    title: 'Discover',
    text: 'We learn how your business works today. Already using some tools? We review them and advise on what to improve.',
  },
  { title: 'Design', text: 'We design the look. You review and give feedback before anything is built.' },
  { title: 'Build', text: 'We build it to work fast and reliably, on every device your team uses.' },
  { title: 'Ship', text: 'It goes live, and we walk you and your team through it.' },
  { title: 'Iterate', text: 'We improve what we’ve built based on your input. Then back to step 1.' },
]

export function Process() {
  const ref = useRef<HTMLOListElement>(null)
  const reduce = useReducedMotionSafe()
  // The progress line fills as the steps scroll through the viewport.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 55%'] })
  const fill = useSpring(scrollYProgress, { stiffness: 80, damping: 20 })

  return (
    <section id="process" className="section scroll-mt-20">
      <div className="container-site">
        <SectionHead
          eyebrow="Process"
          title="Five steps, then repeat."
          lead="Website, system, or automation: nothing is finished on launch day. Once it’s live, we look at what works and keep improving it."
        />

        <ol ref={ref} className="relative grid gap-10 lg:grid-cols-5 lg:gap-6">
          {/* Track and animated fill: vertical on mobile, horizontal on desktop */}
          <span aria-hidden className="absolute top-2 bottom-2 left-[15px] w-px bg-border lg:top-[15px] lg:right-4 lg:bottom-auto lg:left-4 lg:h-px lg:w-auto" />
          <motion.span
            aria-hidden
            style={{ scaleY: reduce ? 1 : fill }}
            className="absolute top-2 bottom-2 left-[15px] w-px origin-top bg-accent lg:hidden"
          />
          <motion.span
            aria-hidden
            style={{ scaleX: reduce ? 1 : fill }}
            className="absolute top-[15px] right-4 left-4 hidden h-px origin-left bg-accent lg:block"
          />

          {steps.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 0.08} className="relative grid min-w-0 content-start gap-3 pl-12 lg:pl-0">
              <span className="absolute top-0 left-0 grid size-[31px] place-items-center rounded-full border border-accent/30 bg-surface font-mono text-[12px] font-medium text-accent shadow-[0_0_0_6px_var(--bg)] lg:relative">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="text-[21px] font-bold lg:mt-3">{s.title}</h3>
              <p className="text-[15px] text-muted-foreground">{s.text}</p>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={0.3}>
          <p className="mt-12 inline-flex items-center gap-2.5 rounded-full border border-border bg-surface px-4 py-2 font-mono text-[13px] text-muted-foreground">
            <motion.svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden
              animate={reduce ? undefined : { rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              className="text-accent"
            >
              <path d="M20 12a8 8 0 1 1-2.34-5.66M20 4v4h-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </motion.svg>
            v1.0 → v1.1 → v1.2 → …
          </p>
        </Reveal>
      </div>
    </section>
  )
}
