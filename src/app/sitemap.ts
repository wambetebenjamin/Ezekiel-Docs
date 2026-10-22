import { MetadataRoute } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://ezekieldocs.com';

const staticPages = [
  '',
  '/documents',
  '/pricing',
  '/about',
  '/privacy',
  '/terms',
  '/cookie-policy',
];

const documentTypes = [
  'nda',
  'service-agreement',
  'employment-contract',
  'freelancer-contract',
  'sale-agreement',
  'tenancy-agreement',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrls = staticPages.map((page) => ({
    url: `${SITE_URL}${page}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: page === '' ? 1 : 0.8,
  }));

  const generateUrls = documentTypes.map((type) => ({
    url: `${SITE_URL}/generate/${type}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...baseUrls, ...generateUrls];
}