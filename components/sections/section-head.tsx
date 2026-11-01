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
    <div className={cn('mb-12 grid max-w-[720px] gap-3.5', className)}>
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="text-[clamp(30px,4vw,46px)] font-bold">{title}</h2>
      {lead && <p className="lead">{lead}</p>}
    </div>
  )
}
