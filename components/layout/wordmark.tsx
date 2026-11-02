'use client'

import { motion } from 'framer-motion'
import { RotateCw } from 'lucide-react'
import { MaturingWord } from '@/components/sections/maturing-word'
import { useReducedMotionSafe } from '@/lib/use-reduced-motion'
import { cn } from '@/lib/utils'

/**
 * The "itrate" wordmark used everywhere the name appears: letters mature left to right,
 * and a reload mark stands where the full stop would be. Inherits font size from its parent.
 */
export function Wordmark({ className, startDelay = 0.2 }: { className?: string; startDelay?: number }) {
  const reduce = useReducedMotionSafe()
  // Letters ripen one by one (6 letters × 0.11s); the mark arrives as the last one settles.
  const markDelay = startDelay + 5 * 0.11 + 0.35

  return (
    <span className={cn('inline-flex items-baseline font-display tracking-[-0.04em]', className)}>
      <MaturingWord word="itrate" startDelay={startDelay} underline={false} />
      <motion.span
        aria-hidden
        className="ml-[0.05em] inline-flex self-end pb-[0.12em] text-[var(--m2)]"
        initial={{ opacity: 0, rotate: -270, scale: 0.4 }}
        animate={{ opacity: 1, rotate: 0, scale: 1 }}
        transition={reduce ? { duration: 0 } : { delay: markDelay, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <RotateCw
          strokeWidth={3.2}
          className="size-[0.42em] transition-transform duration-700 ease-in-out group-hover:rotate-[360deg]"
        />
      </motion.span>
    </span>
  )
}
