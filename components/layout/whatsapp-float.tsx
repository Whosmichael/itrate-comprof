'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MessageCircle, X } from 'lucide-react'
import { DEFAULT_WA_MESSAGE, whatsappLink } from '@/lib/site'

/**
 * Floating WhatsApp button. After a short delay a small greeting bubble pops up;
 * tapping either opens a chat with our number and a ready-made message.
 */
export function WhatsAppFloat() {
  const [bubble, setBubble] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    try {
      if (sessionStorage.getItem('wa-bubble') === 'closed') {
        setDismissed(true)
        return
      }
    } catch {}
    const t = setTimeout(() => setBubble(true), 6000)
    return () => clearTimeout(t)
  }, [])

  function close() {
    setBubble(false)
    setDismissed(true)
    try {
      sessionStorage.setItem('wa-bubble', 'closed')
    } catch {}
  }

  const href = whatsappLink(DEFAULT_WA_MESSAGE)

  return (
    <div className="fixed right-[max(16px,env(safe-area-inset-right))] bottom-[max(16px,env(safe-area-inset-bottom))] z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {bubble && !dismissed && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 320, damping: 24 }}
            className="relative max-w-[260px] rounded-xl rounded-br-sm border border-border bg-surface p-4 pr-9 text-sm shadow-[0_20px_50px_-20px_rgba(var(--shadow),0.4)]"
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close message"
              className="absolute top-2 right-2 grid size-6 place-items-center rounded text-muted-foreground hover:text-foreground"
            >
              <X className="size-3.5" />
            </button>
            <p className="font-semibold">Got something slowing your business down?</p>
            <a href={href} target="_blank" rel="noopener noreferrer" className="mt-1 inline-block text-ok hover:underline">
              Chat with us on WhatsApp →
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with itrate on WhatsApp"
        className="relative grid size-14 place-items-center rounded-full bg-ok text-white shadow-[0_16px_36px_-12px_rgba(var(--shadow),0.5)]"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, type: 'spring', stiffness: 300, damping: 18 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
      >
        <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-ok opacity-25 [animation-duration:2.4s]" />
        <MessageCircle className="relative size-6" />
      </motion.a>
    </div>
  )
}
