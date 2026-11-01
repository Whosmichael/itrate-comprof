'use client'

import { motion } from 'framer-motion'
import { useReducedMotionSafe } from '@/lib/use-reduced-motion'

// Young → mature: pale periwinkle, through the brand blue, to deep navy.
const STOPS = ['#a9b9f3', '#3a5bd9', '#1a2266']
const WEIGHT_FROM = 480
const WEIGHT_TO = 820

function hexToRgb(h: string) {
  const n = parseInt(h.slice(1), 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

/** Color at position t (0..1) along the stops. */
function colorAt(t: number) {
  const seg = Math.min(STOPS.length - 2, Math.floor(t * (STOPS.length - 1)))
  const local = t * (STOPS.length - 1) - seg
  const a = hexToRgb(STOPS[seg])
  const b = hexToRgb(STOPS[seg + 1])
  const c = a.map((v, i) => Math.round(v + (b[i] - v) * local))
  return `rgb(${c.join(',')})`
}

const EASE = [0.22, 1, 0.36, 1] as const

/**
 * A word that "matures" from left to right: each letter is darker and heavier than
 * the one before. On load the letters ripen in sequence and a progress line fills
 * beneath; afterwards a soft wave and glint travel rightward every few seconds.
 */
export function MaturingWord({ word, startDelay = 0 }: { word: string; startDelay?: number }) {
  const reduce = useReducedMotionSafe()
  const letters = word.split('')
  const last = letters.length - 1
  const pale = STOPS[0]
  const step = 0.11
  const settle = startDelay + last * step + 0.6

  return (
    <span className="relative inline-block pb-[0.08em]" aria-label={word}>
      {letters.map((ch, i) => {
        const t = last === 0 ? 1 : i / last
        const color = colorAt(t)
        const weight = Math.round(WEIGHT_FROM + (WEIGHT_TO - WEIGHT_FROM) * t)
        return (
          <motion.span
            key={i}
            aria-hidden
            className="inline-block"
            style={{ fontWeight: weight }}
            initial={{ color: pale }}
            animate={
              reduce
                ? { color }
                : { color, y: ['0em', '0em', '-0.06em', '0em'] }
            }
            transition={{
              color: { delay: startDelay + i * step, duration: 0.7, ease: EASE },
              y: {
                delay: settle + i * 0.07,
                duration: 4.2,
                times: [0, 0.78, 0.86, 0.96],
                repeat: Infinity,
                ease: 'easeInOut',
              },
            }}
          >
            {ch}
          </motion.span>
        )
      })}

      {/* Progress line: fills left → right in the same young → mature colors */}
      <span aria-hidden className="absolute right-[0.06em] bottom-0 left-[0.04em] h-[0.06em] overflow-hidden rounded-full bg-border/70">
        <motion.span
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ background: `linear-gradient(90deg, ${STOPS.join(', ')})` }}
          initial={{ width: reduce ? '100%' : '0%' }}
          animate={{ width: '100%' }}
          transition={{ delay: startDelay, duration: last * step + 0.7, ease: EASE }}
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
    </span>
  )
}
