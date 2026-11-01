'use client'

import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

/**
 * Like framer-motion's useReducedMotion, but always false on the server and the
 * first client render, so server HTML and hydration match. Updates after mount.
 */
export function useReducedMotionSafe() {
  const prefers = useReducedMotion()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  return mounted && !!prefers
}
