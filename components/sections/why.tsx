const reasons = [
  { title: 'Live fast', text: 'Version one ships first, so customers can find you sooner.' },
  { title: 'Plain language', text: 'No confusing tech jargon. We explain every step.' },
  { title: 'Yours to keep', text: 'Domain, content, and access are in your name. Nothing is locked in.' },
  { title: 'Ongoing support', text: 'After launch, we are still here for changes and new features.' },
]

// Inverted band: ink background, page-background text, in both themes.
export function Why() {
  return (
    <section className="section bg-foreground text-background">
      <div className="container-site">
        <div className="mb-12 grid max-w-[720px] gap-3.5">
          <span className="font-mono text-xs tracking-[0.08em] text-[color-mix(in_srgb,var(--accent)_60%,var(--bg))] uppercase">
            Why itrate
          </span>
          <h2 className="text-[clamp(30px,4vw,46px)] font-bold">Made for small businesses, not corporations.</h2>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((r) => (
            <div key={r.title} className="grid min-w-0 content-start gap-2.5 border-t border-background/20 pt-5">
              <h3 className="text-[21px] font-bold">{r.title}</h3>
              <p className="text-[15px] text-background/70">{r.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
