import { cn } from '@/lib/utils'

type Variant = 'hero' | 'grid' | 'dots' | 'rings' | 'soft' | 'cta'

/**
 * Animated section background. Place it as the first child of a `relative isolate` section.
 * It clips itself (so sticky content inside the section keeps working) and never takes pointer events.
 * All motion is CSS transform animation, defined as .bd-* in globals.css.
 */
export function Backdrop({
  variant,
  side = 'right',
  className,
}: {
  variant: Variant
  /** Which side the main glow / ring sits on. */
  side?: 'left' | 'right'
  className?: string
}) {
  const right = side === 'right'
  return (
    <div aria-hidden className={cn('pointer-events-none absolute inset-0 -z-10 overflow-hidden', className)}>
      {variant === 'hero' && (
        <>
          <div className="bd-dots absolute inset-0 [mask-image:radial-gradient(ellipse_80%_70%_at_60%_40%,#000_35%,transparent_80%)]" />
          <div className="bd-glow bd-drift-a top-[-12%] right-[-6%] size-[600px] max-w-full bg-accent/30" />
          <div className="bd-glow bd-drift-b bottom-[-22%] left-[-10%] size-[480px] max-w-full bg-ok/20" />
          <div className="bd-glow bd-drift-b top-[30%] left-[35%] size-[320px] max-w-full bg-[var(--m0)]/30" />
        </>
      )}

      {variant === 'grid' && (
        <>
          <div
            className={cn(
              'bd-grid bd-pan absolute -inset-14',
              right
                ? '[mask-image:radial-gradient(ellipse_60%_55%_at_80%_20%,#000_10%,transparent_70%)]'
                : '[mask-image:radial-gradient(ellipse_60%_55%_at_15%_20%,#000_10%,transparent_70%)]',
            )}
          />
          <div className={cn('bd-glow bd-drift-a top-[-10%] size-[520px] max-w-full bg-accent/20', right ? 'right-[-8%]' : 'left-[-8%]')} />
          <div className={cn('bd-glow bd-drift-b bottom-[-15%] size-[380px] max-w-full bg-[var(--m0)]/25', right ? 'left-[-6%]' : 'right-[-6%]')} />
        </>
      )}

      {variant === 'dots' && (
        <>
          <div
            className={cn(
              'bd-dots absolute inset-0',
              right
                ? '[mask-image:radial-gradient(ellipse_55%_60%_at_90%_80%,#000_15%,transparent_75%)]'
                : '[mask-image:radial-gradient(ellipse_55%_60%_at_10%_80%,#000_15%,transparent_75%)]',
            )}
          />
          <div
            className={cn(
              'bd-dots absolute inset-0 opacity-80',
              right
                ? '[mask-image:radial-gradient(ellipse_40%_35%_at_15%_10%,#000_10%,transparent_70%)]'
                : '[mask-image:radial-gradient(ellipse_40%_35%_at_85%_10%,#000_10%,transparent_70%)]',
            )}
          />
          <div className={cn('bd-glow bd-drift-b bottom-[-12%] size-[480px] max-w-full bg-accent/18', right ? 'right-[-6%]' : 'left-[-6%]')} />
          <div className={cn('bd-glow bd-drift-a top-[-8%] size-[380px] max-w-full bg-[var(--m0)]/22', right ? 'left-[-4%]' : 'right-[-4%]')} />
        </>
      )}

      {variant === 'rings' && (
        <>
          <div className="bd-dots absolute inset-0 [mask-image:radial-gradient(ellipse_50%_60%_at_50%_50%,#000_10%,transparent_70%)] opacity-70" />
          <div className={cn('bd-glow bd-drift-a top-[15%] size-[460px] max-w-full bg-accent/20', right ? 'right-[0%]' : 'left-[0%]')} />
          <Rings className={cn('absolute top-1/2 size-[760px] -translate-y-1/2', right ? 'right-[-220px]' : 'left-[-220px]')} />
        </>
      )}

      {variant === 'soft' && (
        // Same dots + glow as 'rings' without the rings, so a section can continue the one above it.
        <>
          <div className="bd-dots absolute inset-0 [mask-image:radial-gradient(ellipse_50%_60%_at_50%_50%,#000_10%,transparent_70%)] opacity-70" />
          <div className={cn('bd-glow bd-drift-a top-[20%] size-[460px] max-w-full bg-accent/20', right ? 'right-[0%]' : 'left-[0%]')} />
          <div className={cn('bd-glow bd-drift-b bottom-[5%] size-[360px] max-w-full bg-[var(--m0)]/22', right ? 'left-[5%]' : 'right-[5%]')} />
        </>
      )}

      {variant === 'cta' && (
        <>
          <div className="bd-dots absolute inset-0 [mask-image:radial-gradient(ellipse_70%_70%_at_50%_45%,#000_20%,transparent_75%)]" />
          <div className="bd-glow bd-drift-a top-[5%] left-[10%] size-[520px] max-w-full bg-accent/28" />
          <div className="bd-glow bd-drift-b right-[5%] bottom-[0%] size-[460px] max-w-full bg-ok/18" />
          <div className="bd-glow bd-drift-b top-[40%] left-[45%] size-[300px] max-w-full bg-[var(--m2)]/20" />
        </>
      )}
    </div>
  )
}

/** The brand loop drawn large: two dashed rings turning in opposite directions, each with a reload arrowhead. */
function Rings({ className }: { className?: string }) {
  return (
    <div className={className}>
      <svg viewBox="0 0 400 400" className="bd-spin absolute inset-0 size-full" fill="none">
        <circle cx="200" cy="200" r="180" stroke="var(--accent)" strokeOpacity="0.22" strokeWidth="1.5" strokeDasharray="6 10" />
        <path d="M200 20 A180 180 0 0 1 380 200" stroke="var(--accent)" strokeOpacity="0.45" strokeWidth="3" strokeLinecap="round" />
        <path d="M368 186 L380 202 L393 186" stroke="var(--accent)" strokeOpacity="0.45" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <svg viewBox="0 0 400 400" className="bd-spin-rev absolute inset-[18%] size-[64%]" fill="none">
        <circle cx="200" cy="200" r="180" stroke="var(--m0)" strokeOpacity="0.5" strokeWidth="2" strokeDasharray="2 12" strokeLinecap="round" />
        <path d="M20 200 A180 180 0 0 1 200 20" stroke="var(--m2)" strokeOpacity="0.3" strokeWidth="4" strokeLinecap="round" />
      </svg>
    </div>
  )
}
