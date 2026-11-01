import { SectionHead } from './section-head'

const steps = [
  {
    title: 'Discover',
    text: 'We learn your business and customers. Already have a website or social pages? We review them and advise on what to improve.',
  },
  { title: 'Design', text: 'We design the look. You review and give feedback before anything is built.' },
  { title: 'Build', text: 'The design becomes a fast site that works on every device.' },
  { title: 'Launch', text: 'Your site goes live on your domain, and we walk you through it.' },
  { title: 'Iterate', text: 'We improve the site based on your input. Then back to step 1.' },
]

export function Process() {
  return (
    <section id="process" className="section scroll-mt-20">
      <div className="container-site">
        <SectionHead
          eyebrow="Process"
          title="Five steps, then repeat."
          lead="Your website isn’t finished on launch day. Once it’s live, we look at what works and keep improving it."
        />
        <ol className="grid rounded-md border border-border bg-surface lg:grid-cols-5">
          {steps.map((s, i) => (
            <li
              key={s.title}
              className="grid min-w-0 content-start gap-2.5 border-b border-border px-6 pt-7 pb-8 last:border-b-0 last:bg-accent-soft lg:border-r lg:border-b-0 lg:last:border-r-0"
            >
              <span className="font-mono text-[13px] font-medium text-accent">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="text-[21px] font-bold">{s.title}</h3>
              <p className="text-[15px] text-muted-foreground">{s.text}</p>
            </li>
          ))}
        </ol>
        <p className="mt-4 flex items-center gap-2.5 font-mono text-[13px] text-muted-foreground">
          <svg width="34" height="16" viewBox="0 0 34 16" fill="none" aria-hidden>
            <path d="M32 4H6m0 0 4-3M6 4l4 3M32 4v8H2" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          v1.0 → v1.1 → v1.2 → …
        </p>
      </div>
    </section>
  )
}
