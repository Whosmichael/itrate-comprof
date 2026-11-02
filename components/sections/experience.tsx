import Image from 'next/image'
import { Sparkles } from 'lucide-react'
import { Reveal } from '@/components/motion/reveal'
import { Backdrop } from '@/components/layout/backdrop'

// Where people on the team have worked. Image sizes are the trimmed logo files in /public/logos/team.
const companies = [
  { name: 'BCG', file: 'bcg', w: 588, h: 240, height: 30 },
  { name: 'Deloitte', file: 'deloitte', w: 1192, h: 224, height: 24 },
  { name: 'PwC', file: 'pwc', w: 496, h: 240, height: 34 },
  { name: 'kumparan', file: 'kumparan', w: 320, h: 78, height: 26 },
  { name: 'Kredivo', file: 'kredivo', w: 704, h: 234, height: 30 },
  { name: 'WIZ.AI', file: 'wizai', w: 397, h: 95, height: 26 },
]

/**
 * Credibility band: big-firm and tech-company backgrounds, plus a small hint at the AI work.
 * Logos are shown in one ink color (black in light mode, white in dark mode) so no brand shouts.
 */
export function Experience() {
  return (
    <section aria-labelledby="experience-title" className="section relative isolate scroll-mt-20">
      <Backdrop variant="rings" side="right" className="[mask-image:linear-gradient(#000_70%,transparent)]" />
      <div className="container-site grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
        <div className="grid content-start gap-4">
          <Reveal>
            <span className="eyebrow">The team behind itrate</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 id="experience-title" className="text-[clamp(30px,4vw,46px)] font-bold">
              Big-firm experience, sized for small businesses.
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="lead">
              We’ve worked on strategy, data, and AI projects at global consultancies and fast-growing tech companies.
              Now we bring the same way of working to businesses like yours, without the big-firm price tag.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <p className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 text-[13px] font-medium">
              <Sparkles aria-hidden className="size-4 text-accent" />
              Coming soon: AI teammates for your business
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
            <p className="font-mono text-[11px] tracking-[0.08em] text-muted-foreground uppercase">
              Our team has worked at
            </p>
            <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3">
              {companies.map((c) => (
                <li key={c.name} className="flex h-12 items-center justify-center">
                  <Image
                    src={`/logos/team/${c.file}.webp`}
                    alt={c.name}
                    width={c.w}
                    height={c.h}
                    sizes="160px"
                    style={{ height: c.height, width: 'auto' }}
                    className="max-w-full object-contain opacity-70 brightness-0 transition-opacity duration-300 hover:opacity-100 [:root[data-theme='dark']_&]:invert"
                  />
                </li>
              ))}
            </ul>
            <p className="mt-8 border-t border-border pt-4 text-[12px] leading-relaxed text-muted-foreground">
              Logos show where team members have worked before. itrate is independent and isn’t affiliated with or
              endorsed by these companies.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
