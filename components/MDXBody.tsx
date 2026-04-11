'use client'

import dynamic from 'next/dynamic'
import { components } from '@/components/MDXComponents'

const MDXLayoutRenderer = dynamic(
  () => import('pliny/mdx-components').then((m) => m.MDXLayoutRenderer),
  { ssr: false, loading: () => null }
)

export function MDXBody(props: { code: string; toc?: unknown } & Record<string, unknown>) {
  return <MDXLayoutRenderer {...props} components={components} />
}
