'use client'

import { MessageCircle } from 'lucide-react'
import { DEFAULT_WA_MESSAGE, site, whatsappLink } from '@/lib/site'
import { buttonVariants } from '@/components/ui/button'
import { Reveal } from '@/components/motion/reveal'

const needs = [
  'Not sure yet, want to talk',
  'A website',
  'A custom system',
  'An AI automation',
  'Maintenance for something I already have',
]

const input =
  'w-full rounded-md border border-border bg-background px-3.5 py-3 text-[15px] text-foreground focus:border-transparent focus:outline-2 focus:outline-accent'

/** Builds the WhatsApp message from whatever the visitor filled in. Every field is optional. */
function buildMessage(data: FormData) {
  const name = String(data.get('name') ?? '').trim()
  const biz = String(data.get('biz') ?? '').trim()
  const need = String(data.get('need') ?? '')
  const msg = String(data.get('msg') ?? '').trim()

  const intro = name ? `Hi itrate, I’m ${name}${biz ? ` from ${biz}` : ''}.` : biz ? `Hi itrate, this is ${biz}.` : 'Hi itrate!'
  const lines = [intro]
  if (need && need !== needs[0]) lines.push(`I’m interested in: ${need}.`)
  else lines.push('I’d like to talk about a project.')
  if (msg) lines.push('', msg)
  return lines.join('\n')
}

export function Contact() {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    window.open(whatsappLink(buildMessage(new FormData(e.currentTarget))), '_blank', 'noopener')
  }

  const optional = <span className="font-normal text-muted-foreground"> (optional)</span>

  return (
    <section id="contact" className="scroll-mt-20 pb-[clamp(72px,10vw,128px)]">
      <div className="container-site">
        <Reveal y={40}>
          <div className="grid overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_30px_70px_-40px_rgba(var(--shadow),0.3)] md:grid-cols-[1fr_1.1fr]">
            <div className="grid min-w-0 content-between gap-8 bg-[linear-gradient(150deg,var(--accent-soft),var(--surface)_85%)] p-[clamp(28px,4vw,48px)]">
              <div className="grid gap-4">
                <span className="eyebrow">Contact</span>
                <h2 className="text-[clamp(30px,4vw,46px)] font-bold">Tell us what’s slowing you down.</h2>
                <p className="text-muted-foreground">
                  Send us a message and we’ll get back to you with first ideas and next steps.
                </p>
                <a
                  href={whatsappLink(DEFAULT_WA_MESSAGE)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonVariants({ size: 'lg', className: 'mt-2 justify-self-start bg-ok text-white' })}
                >
                  <MessageCircle /> Chat on WhatsApp now
                </a>
              </div>
              <dl className="grid gap-3.5">
                <div className="grid gap-0.5">
                  <dt className="font-mono text-xs tracking-[0.08em] text-muted-foreground uppercase">WhatsApp</dt>
                  <dd className="text-lg font-semibold">
                    <a href={whatsappLink(DEFAULT_WA_MESSAGE)} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                      {site.whatsappDisplay}
                    </a>
                  </dd>
                </div>
                <div className="grid gap-0.5">
                  <dt className="font-mono text-xs tracking-[0.08em] text-muted-foreground uppercase">Email</dt>
                  <dd className="text-lg font-semibold">
                    <a href={`mailto:${site.email}`} className="hover:text-accent">
                      {site.email}
                    </a>
                  </dd>
                </div>
                <div className="grid gap-0.5">
                  <dt className="font-mono text-xs tracking-[0.08em] text-muted-foreground uppercase">Location</dt>
                  <dd className="text-lg font-semibold">{site.location}</dd>
                </div>
              </dl>
            </div>

            <form onSubmit={handleSubmit} noValidate className="grid min-w-0 content-start gap-4 p-[clamp(28px,4vw,48px)]">
              <p className="text-sm text-muted-foreground">
                Want to give us a head start? Fill in anything you like, or nothing at all. It all goes into your WhatsApp
                message.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-1.5">
                  <label htmlFor="f-name" className="text-sm font-semibold">
                    Name{optional}
                  </label>
                  <input id="f-name" name="name" placeholder="Budi Santoso" className={input} />
                </div>
                <div className="grid gap-1.5">
                  <label htmlFor="f-biz" className="text-sm font-semibold">
                    Business name{optional}
                  </label>
                  <input id="f-biz" name="biz" placeholder="Kopi Senja" className={input} />
                </div>
              </div>
              <div className="grid gap-1.5">
                <label htmlFor="f-need" className="text-sm font-semibold">
                  What you need
                </label>
                <select id="f-need" name="need" className={input}>
                  {needs.map((n) => (
                    <option key={n}>{n}</option>
                  ))}
                </select>
              </div>
              <div className="grid gap-1.5">
                <label htmlFor="f-msg" className="text-sm font-semibold">
                  Tell us briefly{optional}
                </label>
                <textarea id="f-msg" name="msg" placeholder="We run a..." className={`${input} min-h-[110px] resize-y`} />
              </div>
              <button type="submit" className={buttonVariants({ size: 'lg' })}>
                <MessageCircle /> Send via WhatsApp
              </button>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
