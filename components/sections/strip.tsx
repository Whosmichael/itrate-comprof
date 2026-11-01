const points = [
  'Designed around your brand',
  'Looks right on phone and laptop',
  'Connected to WhatsApp',
  'Domain & hosting handled',
  'You fully own your site',
  'Improved after launch',
]

// Slow endless marquee. The list is rendered twice so the loop is seamless.
export function Strip() {
  return (
    <div className="group relative overflow-hidden border-y border-border bg-surface py-5 [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
      <div className="animate-marquee flex w-max gap-12 text-[15px] font-medium">
        {[0, 1].map((copy) => (
          <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0 gap-12">
            {points.map((p) => (
              <li key={p} className="flex items-center gap-2.5 whitespace-nowrap">
                <span aria-hidden className="size-1.5 rounded-full bg-accent" />
                {p}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}
