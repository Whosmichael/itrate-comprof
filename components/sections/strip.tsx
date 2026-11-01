'use client'

import { useRef } from 'react'
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion'
import { RotateCw } from 'lucide-react'
import { useReducedMotionSafe } from '@/lib/use-reduced-motion'
import { cn } from '@/lib/utils'

// What we build, in no particular order.
const rowA = [
  'Websites',
  'Company profiles',
  'AI automations',
  'Personal profile sites',
  'Booking systems',
  'CV websites',
  'Landing pages',
  'WhatsApp auto-replies',
]
const rowB = [
  'Simple custom systems',
  'Product catalogs',
  'Admin dashboards',
  'Hosting & maintenance',
  'Inventory & orders',
  'Automatic reports',
  'Internal tools',
  'Google Business Profile',
]

// A repeating "scatter" pattern: size, style, and a small vertical offset per item.
const looks = [
  { cls: 'font-display text-[clamp(26px,3.2vw,40px)] font-bold text-foreground', y: -6 },
  { cls: 'font-mono text-[12px] tracking-[0.12em] uppercase text-muted-foreground', y: 10 },
  { cls: 'font-display text-[clamp(22px,2.6vw,32px)] font-semibold text-accent', y: 4 },
  { cls: 'text-[17px] font-medium text-muted-foreground', y: -10 },
  { cls: 'font-display text-[clamp(30px,3.8vw,48px)] font-extrabold maturing-text', y: 2 },
  { cls: 'font-mono text-[12px] tracking-[0.12em] uppercase text-accent', y: -4 },
  { cls: 'font-display text-[clamp(22px,2.6vw,30px)] font-medium text-foreground/80', y: 8 },
  { cls: 'text-[16px] font-semibold text-foreground', y: -2 },
]

const wrap = (min: number, max: number, v: number) => {
  const r = max - min
  return ((((v - min) % r) + r) % r) + min
}

function Row({ items, speed, offset = 0 }: { items: string[]; speed: number; offset?: number }) {
  const reduce = useReducedMotionSafe()
  const hovered = useRef(false)
  const base = useMotionValue(0)

  // Scrolling speeds the row up and leans it in the scroll direction.
  const { scrollY } = useScroll()
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 })
  const boost = useTransform(velocity, [-2000, 0, 2000], [-4, 0, 4], { clamp: false })
  const skewX = useTransform(velocity, [-2500, 0, 2500], [7, 0, -7])
  const dir = useRef(1)

  useAnimationFrame((_, delta) => {
    if (reduce || hovered.current) return
    const b = boost.get()
    if (b < 0) dir.current = -1
    else if (b > 0) dir.current = 1
    let move = dir.current * speed * (delta / 1000)
    move += move * Math.abs(b)
    base.set(base.get() + move)
  })
  const x = useTransform(base, (v) => `${wrap(-50, 0, v)}%`)

  const content = items.map((label, i) => {
    const look = looks[(i + offset) % looks.length]
    return (
      <span key={label} className="flex shrink-0 items-center gap-8 pr-8">
        <span className={cn('whitespace-nowrap leading-none', look.cls)} style={{ transform: `translateY(${look.y}px)` }}>
          {label}
        </span>
        <RotateCw aria-hidden className="size-3.5 shrink-0 text-[var(--m1)] opacity-60" strokeWidth={2.6} />
      </span>
    )
  })

  return (
    <div
      className="overflow-hidden py-2"
      onPointerEnter={() => (hovered.current = true)}
      onPointerLeave={() => (hovered.current = false)}
    >
      <motion.div className="flex w-max items-center" style={{ x, skewX: reduce ? 0 : skewX }}>
        {content}
        <span aria-hidden className="flex items-center">
          {content}
        </span>
      </motion.div>
    </div>
  )
}

export function Strip() {
  return (
    <div
      className="relative border-y border-border bg-surface py-6 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]"
      aria-label={`What we build: ${[...rowA, ...rowB].join(', ')}`}
      role="region"
    >
      <Row items={rowA} speed={-2.2} />
      <Row items={rowB} speed={1.6} offset={3} />
    </div>
  )
}
