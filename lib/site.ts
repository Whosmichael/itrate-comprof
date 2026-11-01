// Business details used across the site.
// TODO: replace the placeholder WhatsApp number and email with the real ones.
export const site = {
  name: 'itrate',
  tagline: 'Websites for Indonesian small businesses',
  whatsapp: '6281200000000', // international format, no "+" or spaces
  whatsappDisplay: '+62 812-0000-0000',
  email: 'hello@itrate.id',
  location: 'Indonesia · working remotely',
}

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${site.whatsapp}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}

export const navItems = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Process', href: '#process' },
  { label: 'FAQ', href: '#faq' },
]
