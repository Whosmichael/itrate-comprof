import { Reveal } from '@/components/motion/reveal'
import { cn } from '@/lib/utils'

export function SectionHead({
  eyebrow,
  title,
  lead,
  className,
}: {
  eyebrow: string
  title: string
  lead?: string
  className?: string
}) {
  return (
    <div className={cn('mb-14 grid max-w-[720px] gap-3.5', className)}>
      <Reveal>
        <span className="eyebrow">{eyebrow}</span>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="text-[clamp(30px,4vw,46px)] font-bold">{title}</h2>
      </Reveal>
      {lead && (
        <Reveal delay={0.16}>
          <p className="lead">{lead}</p>
        </Reveal>
      )}
    </div>
  )
}
