'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Camera, Mail, MapPin, MessageCircle, Sheet, ShoppingBag, type LucideIcon } from 'lucide-react'
import { useReducedMotionSafe } from '@/lib/use-reduced-motion'

// Everyday tools Indonesian small businesses already run on. We build around them.
const tools: { name: string; icon: LucideIcon }[] = [
  { name: 'WhatsApp', icon: MessageCircle },
  { name: 'Google Sheets', icon: Sheet },
  { name: 'Gmail', icon: Mail },
  { name: 'Google Maps', icon: MapPin },
  { name: 'Tokopedia', icon: ShoppingBag },
  { name: 'Instagram', icon: Camera },
]

export function Strip() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const reduce = useReducedMotionSafe()
  const on = inView || reduce

  return (
    <div ref={ref} className="border-y border-border bg-surface py-6">
      <div className="container-site flex flex-wrap items-center gap-x-8 gap-y-4">
        <p className="max-w-[31ch] text-[15px] leading-snug">
          <span className="font-semibold">No need to change how you work.</span>{' '}
          <span className="text-muted-foreground">We build around the tools you already use.</span>
        </p>
        <ul className="flex flex-1 flex-wrap items-center gap-x-1.5 gap-y-2">
          {tools.map((t, i) => (
            <motion.li
              key={t.name}
              className="flex items-center gap-2 rounded-full bg-[linear-gradient(var(--accent-soft),var(--accent-soft))] bg-left bg-no-repeat px-2.5 py-1.5 text-[13.5px] font-medium"
              initial={{ opacity: 0, y: 8, backgroundSize: '0% 100%' }}
              animate={on ? { opacity: 1, y: 0, backgroundSize: '100% 100%' } : undefined}
              transition={{
                delay: reduce ? 0 : 0.1 + i * 0.09,
                duration: reduce ? 0 : 0.5,
                backgroundSize: { delay: reduce ? 0 : 0.35 + i * 0.09, duration: reduce ? 0 : 0.5, ease: 'easeOut' },
              }}
            >
              <t.icon className="size-3.5 text-accent" />
              {t.name}
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  )
}
