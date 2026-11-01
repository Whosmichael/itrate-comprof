'use client'

import { motion } from 'framer-motion'
import { Check, FileText, MapPin, Search, Send, Sparkles, Table2 } from 'lucide-react'

const EASE = [0.22, 1, 0.36, 1] as const
const rise = (delay: number, y = 12) => ({
  initial: { opacity: 0, y },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.55, ease: EASE },
})

/* 1. Get found online: a local search where the client's site comes up first */
export function SearchScene() {
  const query = 'coffee shop near bekasi'
  return (
    <div className="grid h-full content-start gap-4 p-6">
      <div className="flex items-center gap-2.5 rounded-full border border-border bg-surface px-4 py-2.5 shadow-sm">
        <Search className="size-4 text-muted-foreground" />
        <span className="font-mono text-[13px]">
          {query.split('').map((c, i) => (
            <motion.span key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 + i * 0.035 }}>
              {c}
            </motion.span>
          ))}
          <motion.span
            className="ml-px inline-block h-[1.1em] w-px translate-y-[3px] bg-foreground"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
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
            <rect x="72" y="8" width="30" height="20" rx="3" fill="color-mix(in srgb, var(--ok) 25%, transparent)" />
          </svg>
          <motion.div
            className="absolute top-[34%] left-[52%] -translate-x-1/2 -translate-y-full text-accent"
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.6, type: 'spring', stiffness: 400, damping: 12 }}
          >
            <MapPin className="size-7 fill-accent stroke-surface" />
          </motion.div>
          <motion.span
            className="absolute top-[34%] left-[52%] size-3 -translate-x-1/2 rounded-full bg-accent/30"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 3, 3], opacity: [0.8, 0, 0] }}
            transition={{ delay: 1.8, duration: 1.6, repeat: Infinity, repeatDelay: 0.6 }}
          />
        </motion.div>
      </div>

      {[0, 1].map((i) => (
        <motion.div key={i} {...rise(1.5 + i * 0.12)} className="grid gap-1.5 rounded-lg border border-border bg-surface/60 p-3.5 opacity-60">
          <div className="h-2 w-1/4 rounded-sm bg-border" />
          <div className="h-2.5 w-2/3 rounded-sm bg-border" />
          <div className="h-2 w-1/2 rounded-sm bg-border" />
        </motion.div>
      ))}
    </div>
  )
}

/* 2. Run your business: messy chat orders become a clean table */
const messages = ['kak pesan 2 ya, kirim besok', 'stok yg merah masih ada?', 'udah transfer ya kak 🙏']
const orders = [
  { id: '#1042', who: 'Rina', item: '2× Tote bag', status: 'Paid', tone: 'ok' },
  { id: '#1043', who: 'Dimas', item: '1× Red cap', status: 'Packed', tone: 'accent' },
  { id: '#1044', who: 'Sari', item: '3× Mug', status: 'Sent', tone: 'muted' },
  { id: '#1045', who: 'Budi', item: '1× Tote bag', status: 'Paid', tone: 'ok' },
]
const tone: Record<string, string> = {
  ok: 'bg-ok/12 text-ok',
  accent: 'bg-accent-soft text-accent',
  muted: 'bg-border text-muted-foreground',
}

export function SystemScene() {
  return (
    <div className="grid h-full content-start gap-4 p-6">
      <div className="relative h-[92px]">
        {messages.map((m, i) => (
          <motion.div
            key={m}
            className="absolute rounded-lg rounded-tl-sm bg-ok/12 px-3 py-1.5 text-[11px] whitespace-nowrap"
            style={{ left: `${i * 18}%`, top: i * 28 }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: [0, 1, 1, 0.25], scale: [0.9, 1, 1, 0.96], filter: ['blur(0px)', 'blur(0px)', 'blur(0px)', 'blur(1px)'] }}
            transition={{ delay: 0.1 + i * 0.25, duration: 2.2, times: [0, 0.15, 0.6, 1] }}
          >
            {m}
          </motion.div>
        ))}
        <motion.span
          className="absolute right-0 bottom-0 font-mono text-[10px] text-muted-foreground"
          {...rise(1.2, 6)}
        >
          scattered in chats ↓
        </motion.span>
      </div>

      <motion.div {...rise(1.4)} className="overflow-hidden rounded-lg border border-border bg-surface">
        <div className="flex items-center gap-2 border-b border-border px-4 py-2.5 text-[12px] font-semibold">
          <Table2 className="size-4 text-accent" /> Orders
          <span className="ml-auto font-mono text-[10px] font-normal text-muted-foreground">today</span>
        </div>
        {orders.map((o, i) => (
          <motion.div
            key={o.id}
            className="grid grid-cols-[52px_60px_1fr_auto] items-center gap-2 border-b border-border/70 px-4 py-2.5 text-[12px] last:border-b-0"
            initial={{ opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.7 + i * 0.15, duration: 0.45, ease: EASE }}
          >
            <span className="font-mono text-[11px] text-muted-foreground">{o.id}</span>
            <span className="font-medium">{o.who}</span>
            <span className="truncate text-muted-foreground">{o.item}</span>
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${tone[o.tone]}`}>{o.status}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

/* 3. Work smarter with AI: an automation that lights up step by step */
const flow = [
  { icon: FileText, title: 'Supplier invoice arrives', meta: 'invoice_0931.pdf · email' },
  { icon: Sparkles, title: 'AI reads the invoice', meta: 'supplier, items, total: Rp 4.250.000' },
  { icon: Table2, title: 'Added to your sheet', meta: 'Purchases · row 214' },
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

/* 4. Keep it running: uptime and a live maintenance log */
const days = Array.from({ length: 30 }, (_, i) => (i === 11 ? 'warn' : 'ok'))
const log = [
  ['02:00', 'Backup completed'],
  ['06:30', 'Security updates applied'],
  ['09:14', 'SSL certificate renewed'],
  ['13:30', 'v1.4 shipped: new menu page'],
  ['15:02', 'Answered your WhatsApp request'],
]

export function MaintainScene() {
  return (
    <div className="grid h-full content-start gap-4 p-6">
      <motion.div {...rise(0.1)} className="rounded-lg border border-border bg-surface p-4">
        <div className="flex items-baseline justify-between">
          <span className="text-[12px] font-semibold">Uptime · last 30 days</span>
          <span className="flex items-center gap-1.5 font-mono text-[11px] text-ok">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-ok opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-ok" />
            </span>
            all systems normal
          </span>
        </div>
        <div className="mt-3 flex h-9 items-end gap-[3px]">
          {days.map((d, i) => (
            <motion.span
              key={i}
              className={`flex-1 origin-bottom rounded-[2px] ${d === 'ok' ? 'bg-ok/70' : 'bg-[#e8a33a]'}`}
              style={{ height: '100%' }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 0.2 + i * 0.025, duration: 0.35, ease: EASE }}
            />
          ))}
        </div>
        <div className="mt-2 flex justify-between font-mono text-[10px] text-muted-foreground">
          <span>30 days ago</span>
          <span className="text-foreground">99.98%</span>
          <span>today</span>
        </div>
      </motion.div>

      <div className="overflow-hidden rounded-lg border border-border bg-surface">
        <div className="border-b border-border px-4 py-2.5 text-[12px] font-semibold">Today on your system</div>
        {log.map(([t, l], i) => (
          <motion.div
            key={t}
            className="flex items-center gap-3 border-b border-border/70 px-4 py-2.5 text-[12px] last:border-b-0"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 + i * 0.35, duration: 0.4, ease: EASE }}
          >
            <span className="font-mono text-[10.5px] text-muted-foreground">{t}</span>
            <span className="size-1.5 rounded-full bg-ok" />
            {l}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
