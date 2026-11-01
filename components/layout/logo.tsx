import { Wordmark } from '@/components/layout/wordmark'
import { cn } from '@/lib/utils'

export function Logo({ className, startDelay = 0.2 }: { className?: string; startDelay?: number }) {
  return (
    <a
      href="#top"
      aria-label="itrate, back to top"
      className={cn('group inline-flex text-[26px] leading-none no-underline', className)}
    >
      <Wordmark startDelay={startDelay} />
    </a>
  )
}
