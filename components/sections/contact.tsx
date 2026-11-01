'use client'

import { useState } from 'react'
import { site, whatsappLink } from '@/lib/site'
import { buttonVariants } from '@/components/ui/button'

const needs = [
  'Company profile website',
  'Landing page',
  'Website care',
  'Not sure yet, want to talk',
]

const input =
  'w-full rounded-md border border-border bg-background px-3.5 py-3 text-[15px] text-foreground focus:border-transparent focus:outline-2 focus:outline-accent'

export function Contact() {
  const [error, setError] = useState('')

  // Builds a pre-filled WhatsApp message from the form and opens the chat.
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = String(data.get('name') ?? '').trim()
    if (!name) {
      setError('Please add your name first.')
      return
    }
    setError('')
    const biz = String(data.get('biz') ?? '').trim()
    const need = String(data.get('need') ?? '')
    const msg = String(data.get('msg') ?? '').trim()
    const text = [
      `Hi itrate, I’m ${name}${biz ? ` from ${biz}` : ''}.`,
      `I’m interested in: ${need}.`,
      msg && `\n${msg}`,
    ]
      .filter(Boolean)
      .join('\n')
    window.open(whatsappLink(text), '_blank', 'noopener')
  }

  return (
    <section id="contact" className="scroll-mt-20 pb-[clamp(64px,9vw,112px)]">
      <div className="container-site">
        <div className="grid overflow-hidden rounded-[10px] border border-border bg-surface md:grid-cols-[1fr_1.1fr]">
          <div className="grid min-w-0 content-between gap-6 bg-accent p-[clamp(28px,4vw,48px)] text-accent-foreground">
            <div className="grid gap-4">
              <span className="font-mono text-xs tracking-[0.08em] uppercase opacity-80">Contact</span>
              <h2 className="text-[clamp(30px,4vw,46px)] font-bold">Tell us about your business.</h2>
              <p className="opacity-85">We reply within one working day with first ideas and a cost estimate.</p>
            </div>
            <dl className="grid gap-3.5">
              {[
                ['WhatsApp', site.whatsappDisplay],
                ['Email', site.email],
                ['Location', site.location],
              ].map(([k, v]) => (
                <div key={k} className="grid gap-0.5">
                  <dt className="font-mono text-xs tracking-[0.08em] uppercase opacity-75">{k}</dt>
                  <dd className="text-lg font-semibold select-all">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <form onSubmit={handleSubmit} noValidate className="grid min-w-0 gap-4 p-[clamp(28px,4vw,48px)]">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-1.5">
                <label htmlFor="f-name" className="text-sm font-semibold">Name</label>
                <input id="f-name" name="name" placeholder="Budi Santoso" className={input} />
              </div>
              <div className="grid gap-1.5">
                <label htmlFor="f-biz" className="text-sm font-semibold">Business name</label>
                <input id="f-biz" name="biz" placeholder="Kopi Senja" className={input} />
              </div>
            </div>
            <div className="grid gap-1.5">
              <label htmlFor="f-need" className="text-sm font-semibold">What you need</label>
              <select id="f-need" name="need" className={input}>
                {needs.map((n) => (
                  <option key={n}>{n}</option>
                ))}
              </select>
            </div>
            <div className="grid gap-1.5">
              <label htmlFor="f-msg" className="text-sm font-semibold">Tell us briefly</label>
              <textarea id="f-msg" name="msg" placeholder="We run a..." className={`${input} min-h-[110px] resize-y`} />
            </div>
            <button type="submit" className={buttonVariants({ size: 'lg' })}>
              Send via WhatsApp
            </button>
            {error && <p className="text-sm text-accent" role="alert">{error}</p>}
          </form>
        </div>
      </div>
    </section>
  )
}
