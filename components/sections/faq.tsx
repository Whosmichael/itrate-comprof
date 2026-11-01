import { Reveal } from '@/components/motion/reveal'
import { SectionHead } from './section-head'

// TODO: confirm the timeline and revision answers match how itrate actually works.
const faqs = [
  {
    q: 'I’m not sure what I need. Can you help?',
    a: 'Yes, that’s what Discover is for. We look at how you work today and suggest the simplest thing that helps. Sometimes that’s a website, sometimes a small system or an automation.',
  },
  {
    q: 'How long does a project take?',
    a: 'A company website usually goes live 2–3 weeks after we have your content. Custom systems and automations depend on scope, and we agree a timeline before we start.',
  },
  {
    q: 'I don’t have photos or much content yet. Is that okay?',
    a: 'Yes. We can start with placeholder photos and help you shape the text, then swap in the real ones when they’re ready.',
  },
  {
    q: 'How many revisions do I get?',
    a: 'Design revisions happen before we build, so big changes are settled early. The number of rounds is agreed in the quote.',
  },
  {
    q: 'Who owns what you build?',
    a: 'You do. Domains, accounts, data, and content are in your business’s name. If you want us to look after it afterwards, we offer ongoing care: hosting, backups, and regular updates.',
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
            <Reveal key={f.q} delay={i * 0.06} y={16}>
            <details open={i === 0} className="group border-b border-border">
              <summary className="flex cursor-pointer list-none justify-between gap-5 py-5.5 text-[17px] font-semibold [&::-webkit-details-marker]:hidden">
                {f.q}
                <span aria-hidden className="font-mono text-[22px] leading-none font-normal text-accent transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="max-w-[62ch] pb-5.5 text-muted-foreground animate-in fade-in slide-in-from-top-1 duration-300">{f.a}</p>
            </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
