import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://www.itrate.tech/sitemap.xml',
    host: 'https://www.itrate.tech',
  }
}
