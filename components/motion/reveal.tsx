'use client'

import { motion } from 'framer-motion'
import { useReducedMotionSafe } from '@/lib/use-reduced-motion'
import { cn } from '@/lib/utils'

const EASE = [0.22, 1, 0.36, 1] as const

type RevealProps = {
  children: React.ReactNode
  className?: string
  delay?: number
  /** Distance in px the element rises from. */
  y?: number
  as?: 'div' | 'li' | 'article' | 'section'
}

/** Fades and rises content into place the first time it scrolls into view. */
export function Reveal({ children, className, delay = 0, y = 28, as = 'div' }: RevealProps) {
  const reduce = useReducedMotionSafe()
  const Tag = motion[as]
  return (
    <Tag
      className={cn(className)}
      initial={{ opacity: 0, y, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={reduce ? { duration: 0 } : { duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </Tag>
  )
}
