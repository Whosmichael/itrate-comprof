const points = [
  'Designed around your brand',
  'Looks right on phone and laptop',
  'Connected to WhatsApp',
  'Domain & hosting handled',
  'You fully own your site',
]

export function Strip() {
  return (
    <div className="border-y border-border bg-surface py-5">
      <ul className="container-site flex flex-wrap justify-between gap-x-7 gap-y-3.5 text-[15px] font-medium">
        {points.map((p) => (
          <li key={p} className="flex items-center gap-2.5">
            <span aria-hidden className="font-bold text-accent">✓</span>
            {p}
          </li>
        ))}
      </ul>
    </div>
  )
}
