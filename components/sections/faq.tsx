import { SectionHead } from './section-head'

// TODO: confirm the timeline and revision answers match how itrate actually works.
const faqs = [
  {
    q: 'How long until my website is ready?',
    a: 'It depends on the pages and features. A company profile site usually goes live 2–3 weeks after we have all your content.',
  },
  {
    q: 'I don’t have a logo or photos yet. Is that okay?',
    a: 'Yes. We can tidy up your logo through Brand Basics and use placeholder photos until your real ones are ready.',
  },
  {
    q: 'How many revisions do I get?',
    a: 'Design revisions happen before we build, so big changes are settled early. The number of rounds is agreed in the quote.',
  },
  {
    q: 'Who owns the website when it’s done?',
    a: 'You do. The domain and content are in your business’s name. If you want us to look after it, there’s the monthly Care plan.',
  },
  {
    q: 'Can it connect to WhatsApp and Instagram?',
    a: 'Yes. A WhatsApp button, Instagram link, and Google Maps location are included.',
  },
]

export function Faq() {
  return (
    <section id="faq" className="section scroll-mt-20">
      <div className="container-site grid gap-12 md:grid-cols-[0.8fr_1.2fr]">
        <SectionHead eyebrow="FAQ" title="Common questions." className="mb-0 content-start" />
        <div className="min-w-0 border-t border-border">
          {faqs.map((f, i) => (
            <details key={f.q} open={i === 0} className="group border-b border-border">
              <summary className="flex cursor-pointer list-none justify-between gap-5 py-5.5 text-[17px] font-semibold [&::-webkit-details-marker]:hidden">
                {f.q}
                <span aria-hidden className="font-mono text-[22px] leading-none font-normal text-accent transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="max-w-[62ch] pb-5.5 text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
