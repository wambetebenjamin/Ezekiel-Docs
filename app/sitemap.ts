import type { MetadataRoute } from 'next'
import { DOCUMENTS } from '@/lib/documents'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ezekieldocs.co.ke'
  const now = new Date()

  const staticRoutes = [
    '',
    '/documents',
    '/pricing',
    '/about',
    '/contact',
  ].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: route === '' ? 1 : 0.8,
    }),
  )

  const legalRoutes = [
    '/legal/privacy-policy',
    '/legal/terms',
    '/legal/cookie-policy',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.4,
  }))

  const documentRoutes = DOCUMENTS.map((documentItem) => ({
    url: `${baseUrl}/generate/${documentItem.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...documentRoutes, ...legalRoutes]
}
