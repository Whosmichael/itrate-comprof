'use client'

import { motion } from 'framer-motion'
import { useReducedMotionSafe } from '@/lib/use-reduced-motion'
import { cn } from '@/lib/utils'

const WEIGHT_FROM = 480
const WEIGHT_TO = 820
const EASE = [0.22, 1, 0.36, 1] as const

/**
 * Letter color at position t (0..1) along the theme's young → mature stops
 * (--m0, --m1, --m2), so it works in light and dark mode.
 */
function colorAt(t: number) {
  if (t <= 0.5) return `color-mix(in oklab, var(--m1) ${Math.round(t * 200)}%, var(--m0))`
  return `color-mix(in oklab, var(--m2) ${Math.round((t - 0.5) * 200)}%, var(--m1))`
}

/**
 * A word that "matures" from left to right: each letter is deeper and heavier than
 * the one before. On load the letters ripen in sequence and a progress line fills
 * beneath; afterwards a soft wave and glint travel rightward every few seconds.
 */
export function MaturingWord({
  word,
  startDelay = 0,
  className,
  underline = true,
}: {
  word: string
  startDelay?: number
  className?: string
  underline?: boolean
}) {
  const reduce = useReducedMotionSafe()
  const letters = word.split('')
  const last = letters.length - 1
  const step = 0.11
  const settle = startDelay + last * step + 0.6

  return (
    <span className={cn('relative inline-block', underline && 'pb-[0.08em]', className)} aria-label={word}>
      {letters.map((ch, i) => {
        const t = last === 0 ? 1 : i / last
        const weight = Math.round(WEIGHT_FROM + (WEIGHT_TO - WEIGHT_FROM) * t)
        return (
          <motion.span
            key={i}
            aria-hidden
            className="inline-block"
            style={{ fontWeight: weight, color: colorAt(t) }}
            // Ripen: start washed out and faint, settle into the letter's own color.
            initial={{ filter: 'saturate(0) opacity(0.45)' }}
            animate={reduce ? { filter: 'saturate(1) opacity(1)' } : { filter: 'saturate(1) opacity(1)', y: ['0em', '0em', '-0.06em', '0em'] }}
            transition={{
              filter: { delay: startDelay + i * step, duration: 0.7, ease: EASE },
              y: { delay: settle + i * 0.07, duration: 4.2, times: [0, 0.78, 0.86, 0.96], repeat: Infinity, ease: 'easeInOut' },
            }}
          >
            {ch}
          </motion.span>
        )
      })}

      {underline && (
        // Progress line: fills left → right in the same young → mature colors
        <span aria-hidden className="absolute right-[0.06em] bottom-0 left-[0.04em] h-[0.06em] min-h-px overflow-hidden rounded-full bg-border/70">
          <motion.span
            className="absolute inset-y-0 left-0 rounded-full bg-[linear-gradient(90deg,var(--m0),var(--m1),var(--m2))]"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={reduce ? { duration: 0 } : { delay: startDelay, duration: last * step + 0.7, ease: EASE }}
          />
          {!reduce && (
            <motion.span
              className="absolute inset-y-0 w-[18%] rounded-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.9),transparent)]"
              initial={{ left: '-20%' }}
              animate={{ left: ['-20%', '-20%', '105%'] }}
              transition={{ delay: settle, duration: 4.2, times: [0, 0.7, 1], repeat: Infinity, ease: 'easeInOut' }}
            />
          )}
        </span>
      )}
    </span>
  )
}
