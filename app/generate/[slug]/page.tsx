import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { DOCUMENTS, getDocumentBySlug } from '@/lib/documents'
import { DocumentWizard } from '@/components/features/DocumentWizard'

export function generateStaticParams() {
  return DOCUMENTS.map((documentItem) => ({ slug: documentItem.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const documentItem = getDocumentBySlug(slug)
  if (!documentItem) return { title: 'Document not found' }
  return {
    title: `Generate ${documentItem.name}`,
    description: documentItem.description,
  }
}

export default async function GenerateDocumentPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const documentItem = getDocumentBySlug(slug)

  if (!documentItem) {
    notFound()
  }

  return <DocumentWizard documentItem={documentItem} />
}
