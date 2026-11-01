import { SectionHead } from './section-head'

type Project = {
  name: string
  meta: string[]
  summary: string
  versions: { v: string; text: string }[]
  thumb: React.ReactNode
  thumbLabel: string
}

const polyThumb = (
  <div className="t-poly size-full">
    <div className="flex items-center justify-between">
      <span className="brand">
        poly<span>.</span>
      </span>
      <span className="pill">Reservasi</span>
    </div>
    <div className="filters">
      <i />
      <i />
      <i />
    </div>
    <div className="games">
      {Array.from({ length: 10 }, (_, i) => (
        <i key={i} />
      ))}
    </div>
  </div>
)

// e = event recorded, h = date on hold
const calendar = '..e.......h..e.....h.e......'
const cherishedThumb = (
  <div className="t-cher size-full">
    <div className="copy">
      <span className="script">Cherished Voices</span>
      <div className="line" />
      <div className="line s" />
      <div className="gold" />
    </div>
    <div className="cal">
      {calendar.split('').map((c, i) => (
        <i key={i} className={c === '.' ? undefined : c} />
      ))}
    </div>
  </div>
)

const projects: Project[] = [
  {
    name: 'Poly Board Games Cafe',
    meta: ['Cafe & entertainment', 'Next.js', 'Website + bookings'],
    summary:
      'A website for a board game cafe: introduces its Game Master service, shows the game catalog, and takes table bookings.',
    versions: [
      { v: 'v1.0', text: 'Cafe profile, food & drink menu, info & FAQ' },
      { v: 'v1.1', text: 'Catalog of 102 board games with difficulty and player-count filters' },
      { v: 'v1.2', text: 'Pick a time and table, then book straight through WhatsApp' },
    ],
    thumb: polyThumb,
    thumbLabel: 'Preview of the Poly Board Games Cafe website',
  },
  {
    name: 'Cherished Voices',
    meta: ['Weddings & events', 'React + Supabase', 'Website + calendar'],
    summary:
      'A premium website for an audio & video guestbook service at weddings, corporate galas, and milestone celebrations.',
    versions: [
      { v: 'v1.0', text: 'Cinematic video hero and service profile' },
      { v: 'v1.1', text: 'Interactive event calendar: past recordings and booked dates' },
      { v: 'v1.2', text: 'Date requests go straight to the team on WhatsApp' },
    ],
    thumb: cherishedThumb,
    thumbLabel: 'Preview of the Cherished Voices website',
  },
]

export function Portfolio() {
  return (
    <section id="work" className="section scroll-mt-20 border-y border-border bg-surface">
      <div className="container-site">
        <SectionHead
          eyebrow="Work"
          title="Projects we have built."
          lead="Every project starts simple, then grows as the client needs more."
        />
        <div className="grid gap-7 md:grid-cols-2">
          {projects.map((p) => (
            <article key={p.name} className="grid min-w-0 content-start gap-5">
              <div role="img" aria-label={p.thumbLabel} className="aspect-[16/10] max-w-full overflow-hidden rounded-lg border border-border">
                {p.thumb}
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-2 font-mono text-xs text-muted-foreground">
                {p.meta.map((m) => (
                  <span key={m}>{m}</span>
                ))}
              </div>
              <h3 className="text-[21px] font-bold">{p.name}</h3>
              <p className="text-muted-foreground">{p.summary}</p>
              <ul className="grid gap-1.5 text-[15px]">
                {p.versions.map((v) => (
                  <li key={v.v} className="grid grid-cols-[52px_1fr] gap-2.5">
                    <span className="pt-0.5 font-mono text-[13px] text-accent">{v.v}</span>
                    {v.text}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
