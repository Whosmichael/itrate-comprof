import { MaturingWord } from '@/components/sections/maturing-word'
import { cn } from '@/lib/utils'

export function Logo({ className, startDelay = 0.2 }: { className?: string; startDelay?: number }) {
  return (
    <a
      href="#top"
      aria-label="itrate, back to top"
      className={cn('font-display text-[26px] leading-none tracking-[-0.04em] no-underline', className)}
    >
      <MaturingWord word="itrate." startDelay={startDelay} />
    </a>
  )
}
