// Business details used across the site.
export const site = {
  name: 'itrate',
  tagline: 'Your tech team for small businesses',
  whatsapp: '6281973317513', // international format, no "+" or spaces
  whatsappDisplay: '+62 819-7331-7513',
  email: 'itrate.tech@gmail.com',
  instagram: 'itrate.tech',
  instagramUrl: 'https://www.instagram.com/itrate.tech/',
  location: 'Indonesia · working remotely',
}

export const DEFAULT_WA_MESSAGE = 'Hi itrate, I’d like to talk about a project.'

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${site.whatsapp}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}

export const navItems = [
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#work' },
  { label: 'Process', href: '#process' },
  { label: 'FAQ', href: '#faq' },
]
