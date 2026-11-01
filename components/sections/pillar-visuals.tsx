'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, FileText, MapPin, MessageCircle, Search, Send, Sparkles, Table2, TrendingUp } from 'lucide-react'

const EASE = [0.22, 1, 0.36, 1] as const
const rise = (delay: number, y = 12) => ({
  initial: { opacity: 0, y },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.55, ease: EASE },
})

/** A pointer that glides between points (in % of the scene) and "clicks" at given moments. */
function Cursor({ path, times, duration, clicks }: { path: [number, number][]; times: number[]; duration: number; clicks: number[] }) {
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute z-20"
      initial={{ left: `${path[0][0]}%`, top: `${path[0][1]}%`, opacity: 0 }}
      animate={{ left: path.map((p) => `${p[0]}%`), top: path.map((p) => `${p[1]}%`), opacity: 1 }}
      transition={{ duration, times, ease: 'easeInOut', opacity: { duration: 0.3, delay: 0 } }}
    >
      <svg width="22" height="22" viewBox="0 0 24 24" className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.25)]">
        <path d="M4 2l15 11-6.5 1 3.5 7-3 1.4-3.4-7L4 20z" fill="var(--ink)" stroke="var(--surface)" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
      {clicks.map((t) => (
        <motion.span
          key={t}
          className="absolute top-0 left-0 size-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-accent"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.6], opacity: [0.9, 0] }}
          transition={{ delay: t, duration: 0.5 }}
        />
      ))}
    </motion.div>
  )
}

/* 1. Get customers: search → click the #1 result → the site opens → book on WhatsApp */
export function SearchScene() {
  const query = 'coffee shop near bekasi'
  const [phase, setPhase] = useState<'search' | 'site'>('search')
  useEffect(() => {
    const t = setTimeout(() => setPhase('site'), 3300)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="relative h-full overflow-hidden">
      <AnimatePresence mode="wait">
        {phase === 'search' ? (
          <motion.div
            key="search"
            className="absolute inset-0 grid content-start gap-4 p-6"
            exit={{ opacity: 0, scale: 1.04, filter: 'blur(4px)' }}
            transition={{ duration: 0.35 }}
          >
            <div className="flex items-center gap-2.5 rounded-full border border-border bg-surface px-4 py-2.5 shadow-sm">
              <Search className="size-4 text-muted-foreground" />
              <span className="font-mono text-[13px]">
                {query.split('').map((c, i) => (
                  <motion.span key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 + i * 0.035 }}>
                    {c}
                  </motion.span>
                ))}
              </span>
            </div>
            <div className="grid grid-cols-[1.4fr_1fr] gap-3">
              <motion.div {...rise(1.1)} className="relative rounded-lg border border-accent/30 bg-surface p-4 shadow-[0_12px_30px_-18px_rgba(58,91,217,0.5)]">
                <span className="absolute -top-2.5 left-3 rounded-full bg-accent px-2 py-0.5 font-mono text-[9px] text-accent-foreground">#1 result</span>
                <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                  <span className="grid size-5 place-items-center rounded-full bg-accent-soft text-[9px] font-bold text-accent">K</span>
                  kopisenja.id
                </div>
                <div className="mt-1.5 text-[14px] leading-snug font-semibold text-accent">Kopi Senja · Coffee shop in Bekasi</div>
                <div className="mt-1 text-[11px] leading-snug text-muted-foreground">Menu, opening hours, and table booking on WhatsApp.</div>
                <div className="mt-2 flex items-center gap-1 text-[11px]">
                  <span className="text-[#e8a33a]">★★★★★</span>
                  <span className="text-muted-foreground">Open now · 08:00–22:00</span>
                </div>
              </motion.div>
              <motion.div {...rise(1.3)} className="relative overflow-hidden rounded-lg border border-border bg-accent-soft">
                <svg viewBox="0 0 120 110" className="absolute inset-0 size-full" aria-hidden>
                  <path d="M0 70 Q40 60 60 75 T120 65" stroke="var(--surface)" strokeWidth="7" fill="none" />
                  <path d="M45 0 Q50 50 40 110" stroke="var(--surface)" strokeWidth="5" fill="none" />
                  <path d="M0 30 L120 38" stroke="var(--surface)" strokeWidth="3" fill="none" />
                </svg>
                <motion.div
                  className="absolute top-[34%] left-[52%] -translate-x-1/2 -translate-y-full text-accent"
                  initial={{ y: -40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.6, type: 'spring', stiffness: 400, damping: 12 }}
                >
                  <MapPin className="size-7 fill-accent stroke-surface" />
                </motion.div>
              </motion.div>
            </div>
            {[0, 1].map((i) => (
              <motion.div key={i} {...rise(1.5 + i * 0.12)} className="grid gap-1.5 rounded-lg border border-border bg-surface/60 p-3.5 opacity-60">
                <div className="h-2 w-1/4 rounded-sm bg-border" />
                <div className="h-2.5 w-2/3 rounded-sm bg-border" />
              </motion.div>
            ))}
            <Cursor path={[[80, 85], [80, 85], [30, 30], [30, 30]]} times={[0, 0.55, 0.85, 1]} duration={3} clicks={[2.9]} />
          </motion.div>
        ) : (
          <motion.div
            key="site"
            className="absolute inset-0 grid content-start"
            initial={{ opacity: 0, scale: 0.97, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            {/* The client's site, as a working mini prototype */}
            <div className="flex items-center justify-between border-b border-border bg-surface px-5 py-3">
              <span className="font-display text-[15px] font-bold">
                Kopi Senja<span className="text-accent">.</span>
              </span>
              <span className="flex gap-3 text-[10px] text-muted-foreground">
                <span>Menu</span>
                <span>About</span>
                <span>Visit</span>
              </span>
            </div>
            <div className="grid gap-3 p-5">
              <div className="relative overflow-hidden rounded-lg bg-[linear-gradient(135deg,#6b4a32,#2f2019)] p-5 text-white">
                <motion.div {...rise(0.15, 8)} className="font-display text-[20px] leading-tight font-bold">
                  Coffee & slow evenings
                  <br />
                  in Bekasi.
                </motion.div>
                <motion.div {...rise(0.3, 8)} className="mt-1 text-[11px] text-white/75">
                  Open daily 08:00–22:00 · Jl. Senja No. 12
                </motion.div>
                <motion.span {...rise(0.45, 8)} className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-ok px-3 py-1.5 text-[11px] font-semibold">
                  <MessageCircle className="size-3" /> Book a table
                </motion.span>
              </div>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  ['Kopi Susu', '25k'],
                  ['Iced Latte', '28k'],
                  ['Croissant', '22k'],
                ].map(([n, p], i) => (
                  <motion.div key={n} {...rise(0.55 + i * 0.1, 8)} className="rounded-lg border border-border bg-surface p-2.5">
                    <div className="mb-2 h-10 rounded bg-[linear-gradient(135deg,#e9d8c4,#c9a882)]" />
                    <div className="text-[11px] font-semibold">{n}</div>
                    <div className="font-mono text-[10px] text-muted-foreground">Rp {p}</div>
                  </motion.div>
                ))}
              </div>
            </div>
            <Cursor path={[[30, 30], [30, 30], [17, 44], [17, 44]]} times={[0, 0.35, 0.75, 1]} duration={1.9} clicks={[1.8]} />
            <motion.div
              className="absolute right-4 bottom-4 left-4 flex items-center gap-3 rounded-lg border border-border bg-surface p-3 shadow-[0_16px_40px_-16px_rgba(var(--shadow),0.4)]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.1, type: 'spring', stiffness: 300, damping: 24 }}
            >
              <span className="grid size-8 place-items-center rounded-full bg-ok text-white">
                <MessageCircle className="size-4" />
              </span>
              <div className="min-w-0 text-[12px]">
                <div className="font-semibold">New booking via WhatsApp</div>
                <div className="truncate text-muted-foreground">“Hi, a table for 4 at 19:30 tonight please.”</div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* 2. Sell & keep customers: chats become orders paid by QRIS, then a follow-up goes out */
const messages = ['kak pesan 2 ya, kirim besok', 'stok yg merah masih ada?', 'udah transfer ya kak 🙏']
const orders = [
  { id: '#1042', who: 'Rina', item: '2× Tote bag', status: 'Paid · QRIS', tone: 'ok' },
  { id: '#1043', who: 'Dimas', item: '1× Red cap', status: 'Packed', tone: 'accent' },
  { id: '#1044', who: 'Sari', item: '3× Mug', status: 'Sent', tone: 'muted' },
  { id: '#1045', who: 'Budi', item: '1× Tote bag', status: 'Paid · QRIS', tone: 'ok' },
]
const tone: Record<string, string> = {
  ok: 'bg-ok/12 text-ok',
  accent: 'bg-accent-soft text-accent',
  muted: 'bg-border text-muted-foreground',
}

export function SellScene() {
  return (
    <div className="relative grid h-full content-start gap-4 p-6">
      <div className="relative h-[80px]">
        {messages.map((m, i) => (
          <motion.div
            key={m}
            className="absolute rounded-lg rounded-tl-sm bg-ok/12 px-3 py-1.5 text-[11px] whitespace-nowrap"
            style={{ left: `${i * 18}%`, top: i * 24 }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: [0, 1, 1, 0.25], scale: [0.9, 1, 1, 0.96], filter: ['blur(0px)', 'blur(0px)', 'blur(0px)', 'blur(1px)'] }}
            transition={{ delay: 0.1 + i * 0.25, duration: 2.2, times: [0, 0.15, 0.6, 1] }}
          >
            {m}
          </motion.div>
        ))}
      </div>

      <motion.div {...rise(1.4)} className="overflow-hidden rounded-lg border border-border bg-surface">
        <div className="flex items-center gap-2 border-b border-border px-4 py-2.5 text-[12px] font-semibold">
          <Table2 className="size-4 text-accent" /> Orders
          <span className="ml-auto font-mono text-[10px] font-normal text-muted-foreground">today</span>
        </div>
        {orders.map((o, i) => (
          <motion.div
            key={o.id}
            className="grid grid-cols-[48px_52px_1fr_auto] items-center gap-2 border-b border-border/70 px-4 py-2.5 text-[12px] last:border-b-0"
            initial={{ opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.7 + i * 0.15, duration: 0.45, ease: EASE }}
          >
            <span className="font-mono text-[11px] text-muted-foreground">{o.id}</span>
            <span className="font-medium">{o.who}</span>
            <span className="truncate text-muted-foreground">{o.item}</span>
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold whitespace-nowrap ${tone[o.tone]}`}>{o.status}</span>
          </motion.div>
        ))}
      </motion.div>

      <motion.div className="flex items-center gap-3 rounded-lg border border-accent/25 bg-accent-soft p-3" {...rise(2.8)}>
        <Send className="size-4 shrink-0 text-accent" />
        <div className="min-w-0 text-[12px]">
          <div className="font-semibold">Follow-up sent to 12 past customers</div>
          <div className="truncate text-muted-foreground">“Thanks for ordering! Here’s 10% off your next one.”</div>
        </div>
      </motion.div>
    </div>
  )
}

/* 3. Run the business: an automation that lights up step by step */
const flow = [
  { icon: FileText, title: 'Supplier invoice arrives', meta: 'invoice_0931.pdf · email' },
  { icon: Sparkles, title: 'AI reads the invoice', meta: 'supplier, items, total: Rp 4.250.000' },
  { icon: Table2, title: 'Stock & purchases updated', meta: 'Purchases · row 214' },
  { icon: Send, title: 'Owner gets a summary', meta: 'WhatsApp · every day 08:00' },
]

export function AutomationScene() {
  const step = 0.75
  return (
    <div className="relative grid h-full content-center gap-3 p-6">
      <span aria-hidden className="absolute top-[88px] bottom-[118px] left-[47px] w-px bg-border" />
      <motion.span
        aria-hidden
        className="absolute top-[88px] bottom-[118px] left-[47px] w-px origin-top bg-accent"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 0.3, duration: step * (flow.length - 1), ease: 'linear' }}
      />
      {flow.map((f, i) => (
        <motion.div
          key={f.title}
          className="relative flex items-center gap-4 rounded-lg border bg-surface px-4 py-3"
          initial={{ borderColor: 'var(--line)', opacity: 0.45 }}
          animate={{ borderColor: ['var(--line)', 'var(--accent)', 'var(--line)'], opacity: 1 }}
          transition={{ delay: 0.3 + i * step, duration: 1.2, times: [0, 0.3, 1] }}
        >
          <motion.span
            className="relative z-10 grid size-9 shrink-0 place-items-center rounded-full border"
            initial={{ backgroundColor: 'var(--surface)', color: 'var(--muted)', borderColor: 'var(--line)' }}
            animate={{ backgroundColor: 'var(--accent)', color: 'var(--accent-ink)', borderColor: 'var(--accent)' }}
            transition={{ delay: 0.3 + i * step, duration: 0.35 }}
          >
            <f.icon className="size-4" />
          </motion.span>
          <div className="min-w-0">
            <div className="text-[13px] font-semibold">{f.title}</div>
            <div className="truncate font-mono text-[10.5px] text-muted-foreground">{f.meta}</div>
          </div>
          <motion.span
            className="ml-auto text-ok"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.55 + i * step, type: 'spring', stiffness: 400, damping: 15 }}
          >
            <Check className="size-4" />
          </motion.span>
        </motion.div>
      ))}
      <motion.p {...rise(0.4 + flow.length * step, 6)} className="mt-1 text-center font-mono text-[11px] text-muted-foreground">
        0 minutes of manual typing
      </motion.p>
    </div>
  )
}

/* 4. Know your numbers: a dashboard that draws itself, with a plain-language insight */
const revenue = [32, 38, 35, 44, 41, 52, 58]
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const top = [
  ['Iced Kopi Susu', 86],
  ['Croissant', 54],
  ['Iced Latte', 41],
] as const

export function NumbersScene() {
  const max = 64
  const pts = revenue.map((v, i) => [10 + i * 46, 100 - (v / max) * 88] as const)
  const line = pts.map((p, i) => `${i ? 'L' : 'M'}${p[0]} ${p[1]}`).join(' ')
  const area = `${line} L${pts[pts.length - 1][0]} 104 L${pts[0][0]} 104 Z`

  return (
    <div className="grid h-full content-start gap-3 p-5">
      <div className="grid grid-cols-3 gap-2.5">
        {[
          ['Revenue this week', 'Rp 14,2 jt', '+12%'],
          ['Orders', '418', '+8%'],
          ['Repeat customers', '37%', '+5%'],
        ].map(([k, v, d], i) => (
          <motion.div key={k} {...rise(0.1 + i * 0.1, 8)} className="rounded-lg border border-border bg-surface p-3">
            <div className="text-[10px] text-muted-foreground">{k}</div>
            <div className="font-mono text-[15px] font-medium">{v}</div>
            <div className="text-[10px] font-semibold text-ok">{d}</div>
          </motion.div>
        ))}
      </div>

      <motion.div {...rise(0.4)} className="rounded-lg border border-border bg-surface px-4 pt-3 pb-2">
        <div className="mb-1 text-[12px] font-semibold">Daily revenue</div>
        <svg viewBox="0 0 300 106" preserveAspectRatio="none" className="h-[104px] w-full">
          <defs>
            <linearGradient id="rev-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" style={{ stopColor: 'var(--accent)', stopOpacity: 0.25 }} />
              <stop offset="1" style={{ stopColor: 'var(--accent)', stopOpacity: 0 }} />
            </linearGradient>
          </defs>
          {[20, 50, 80].map((y) => (
            <line key={y} x1="0" x2="300" y1={y} y2={y} stroke="var(--line)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          ))}
          <motion.path d={area} fill="url(#rev-fill)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6, duration: 0.6 }} />
          <motion.path
            d={line}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.6, duration: 1.2, ease: 'easeInOut' }}
          />
        </svg>
        <div className="mt-1 flex justify-between px-[1%] text-[9px] text-muted-foreground">
          {days.map((d) => (
            <span key={d}>{d}</span>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-[1fr_1.1fr] gap-2.5">
        <motion.div {...rise(1.2)} className="grid gap-2 rounded-lg border border-border bg-surface p-3">
          <div className="text-[11px] font-semibold">Top sellers</div>
          {top.map(([n, v], i) => (
            <div key={n} className="grid gap-1">
              <div className="flex justify-between text-[10px]">
                <span>{n}</span>
                <span className="font-mono text-muted-foreground">{v}</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-border">
                <motion.div
                  className="h-full rounded-full bg-accent"
                  initial={{ width: 0 }}
                  animate={{ width: `${v}%` }}
                  transition={{ delay: 1.4 + i * 0.12, duration: 0.6, ease: EASE }}
                />
              </div>
            </div>
          ))}
        </motion.div>
        <motion.div {...rise(2.2)} className="flex gap-2.5 rounded-lg border border-accent/25 bg-accent-soft p-3">
          <TrendingUp className="size-4 shrink-0 text-accent" />
          <p className="text-[11.5px] leading-snug">
            <span className="font-semibold">Weekends bring 31% of revenue.</span> Iced Kopi Susu is your best seller. Consider a weekend
            bundle.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
