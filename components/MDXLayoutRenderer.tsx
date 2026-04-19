import { getMDXComponent } from 'next-contentlayer/hooks'
import type { MDXComponents } from 'mdx/types'

type TocEntry = { value?: string; url?: string; depth?: number }

function normalizeToc(toc: unknown): TocEntry[] {
  if (toc == null) return []
  if (Array.isArray(toc)) return toc as TocEntry[]
  if (typeof toc === 'string') {
    try {
      const parsed = JSON.parse(toc) as unknown
      return Array.isArray(parsed) ? (parsed as TocEntry[]) : []
    } catch {
      return []
    }
  }
  return []
}

type MDXLayoutRendererProps = {
  code: string
  components?: MDXComponents
  toc?: unknown
}

export function MDXLayoutRenderer({ code, components, toc }: MDXLayoutRendererProps) {
  const MDXContent = getMDXComponent(code)
  return <MDXContent components={components} toc={normalizeToc(toc)} />
}
