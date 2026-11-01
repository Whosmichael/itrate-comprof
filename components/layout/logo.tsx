import { cn } from '@/lib/utils'

export function Logo({ className }: { className?: string }) {
  return (
    <a
      href="#top"
      aria-label="itrate, back to top"
      className={cn('font-display text-[26px] leading-none font-extrabold tracking-[-0.04em] no-underline', className)}
    >
      itrate<span className="text-accent">.</span>
    </a>
  )
}
