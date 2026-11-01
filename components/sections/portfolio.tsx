'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useReducedMotionSafe } from '@/lib/use-reduced-motion'
import { ArrowUpRight } from 'lucide-react'
import { Reveal } from '@/components/motion/reveal'
import { cn } from '@/lib/utils'
import { SectionHead } from './section-head'

type Project = {
  name: string
  url: string
  domain: string
  image: string
  /** Image height at 1200px width; tall images scroll on hover. */
  height: number
  meta: string[]
  summary: string
  built: string[]
}

const projects: Project[] = [
  {
    name: 'Hoety Berkah Solusindo',
    url: 'https://www.hoetyberkahsolusindo.com/',
    domain: 'hoetyberkahsolusindo.com',
    image: '/work/hoety-berkah-solusindo.webp',
    height: 2166,
    meta: ['Industrial refrigeration', 'Website + product catalog'],
    summary:
      'Company profile for a cold storage and refrigeration contractor serving businesses across Jabodetabek.',
    built: [
      'Services from spare parts to full cold storage installation',
      'Product catalog with prices and a Tokopedia link',
      'Client logos and a WhatsApp-first contact flow',
    ],
  },
  {
    name: 'Poly Board Games Cafe',
    url: 'https://poly-board-games-cafe.vercel.app',
    domain: 'poly-board-games-cafe.vercel.app',
    image: '/work/poly-board-games-cafe.webp',
    height: 2166,
    meta: ['Cafe & entertainment', 'Website + booking system'],
    summary:
      'A playful site for a board game cafe: its Game Master service, a searchable game catalog, and table bookings.',
    built: [
      'Catalog of 102 board games with difficulty and player-count filters',
      'Game Master recommendations by mood',
      'Pick a time and table, then book through WhatsApp',
    ],
  },
  {
    name: 'Cherished Voices',
    url: 'https://www.cherishedvoices.com/',
    domain: 'cherishedvoices.com',
    image: '/work/cherished-voices.webp',
    height: 750,
    meta: ['Weddings & events', 'Website + event calendar'],
    summary:
      'A premium site for an audio & video guestbook service at weddings, corporate galas, and milestone celebrations.',
    built: [
      'Cinematic full-screen video hero',
      'Interactive calendar of past events and booked dates',
      'Date requests that go straight to the team on WhatsApp',
    ],
  },
]

const FRAME_RATIO = 10 / 16 // visible window height / width

function Shot({ p }: { p: Project }) {
  const ref = useRef<HTMLAnchorElement>(null)
  const reduce = useReducedMotionSafe()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const drift = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [40, -40])

  // How far the image must move to show its bottom inside the frame, as % of image height.
  const tall = p.height / 1200 > FRAME_RATIO + 0.05
  const travel = tall ? (1 - (1200 * FRAME_RATIO) / p.height) * 100 : 0

  return (
    <motion.a
      ref={ref}
      href={p.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{ y: drift }}
      className="group block min-w-0"
      aria-label={`Visit the ${p.name} website (opens in a new tab)`}
    >
      <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-[0_30px_60px_-34px_rgba(22,26,38,0.35)] transition-[box-shadow,transform] duration-500 group-hover:-translate-y-1 group-hover:shadow-[0_40px_80px_-34px_rgba(58,91,217,0.45)]">
        <div className="flex items-center gap-2 border-b border-border px-3.5 py-2.5">
          {[0, 1, 2].map((i) => (
            <span key={i} className="size-2.5 rounded-full bg-border" />
          ))}
          <span className="ml-2 flex-1 truncate rounded bg-background px-2.5 py-1 font-mono text-[11px] text-muted-foreground">
            {p.domain}
          </span>
          <ArrowUpRight className="size-4 text-muted-foreground transition-colors group-hover:text-accent" />
        </div>
        <div className="relative aspect-[16/10] overflow-hidden bg-background">
          <Image
            src={p.image}
            alt={`Screenshot of the ${p.name} website`}
            width={1200}
            height={p.height}
            sizes="(min-width: 1024px) 600px, 100vw"
            className={cn(
              'absolute inset-x-0 top-0 w-full ease-in-out',
              tall && 'transition-transform duration-[6000ms] group-hover:[transform:translateY(var(--travel))]',
            )}
            style={{ '--travel': `-${travel}%` } as React.CSSProperties}
          />
          {tall && (
            <span className="pointer-events-none absolute right-3 bottom-3 rounded-full bg-surface/90 px-2.5 py-1 font-mono text-[10px] text-muted-foreground shadow-sm backdrop-blur transition-opacity duration-300 group-hover:opacity-0">
              Hover to scroll
            </span>
          )}
        </div>
      </div>
    </motion.a>
  )
}

export function Portfolio() {
  return (
    <section id="work" className="section scroll-mt-20 border-y border-border bg-surface">
      <div className="container-site">
        <SectionHead
          eyebrow="Projects"
          title="Things we have built and shipped."
          lead="Real businesses, live today. Every project starts simple, then grows as the client needs more."
        />

        <div className="grid gap-[clamp(72px,10vw,120px)]">
          {projects.map((p, i) => {
            const flip = i % 2 === 1
            return (
              <article key={p.name} className="grid items-center gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
                <Reveal y={48}>
                  <Shot p={p} />
                </Reveal>
                <div className={cn('grid min-w-0 content-start gap-5', flip && 'lg:order-first')}>
                  <Reveal>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs text-muted-foreground">
                      <span className="text-accent">{String(i + 1).padStart(2, '0')}</span>
                      {p.meta.map((m) => (
                        <span key={m}>{m}</span>
                      ))}
                    </div>
                  </Reveal>
                  <Reveal delay={0.06}>
                    <h3 className="text-[clamp(24px,2.6vw,32px)] font-bold">{p.name}</h3>
                  </Reveal>
                  <Reveal delay={0.12}>
                    <p className="text-muted-foreground">{p.summary}</p>
                  </Reveal>
                  <ul className="grid gap-2.5 text-[15px]">
                    {p.built.map((b, k) => (
                      <Reveal as="li" key={b} delay={0.18 + k * 0.06} y={14} className="flex gap-3">
                        <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" />
                        {b}
                      </Reveal>
                    ))}
                  </ul>
                  <Reveal delay={0.4}>
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/link inline-flex items-center gap-1.5 text-[15px] font-semibold text-accent"
                    >
                      Visit live site
                      <ArrowUpRight className="size-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                    </a>
                  </Reveal>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
