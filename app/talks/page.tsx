import { Talks, allTalks } from 'contentlayer/generated'
import { MDXLayoutRenderer } from '@/components/MDXLayoutRenderer'
import AuthorLayout from '@/layouts/AuthorLayout'
import { coreContent } from 'pliny/utils/contentlayer'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Talks' })

export default function Page() {
  const talks = allTalks.find((p) => p.slug === 'default') as Talks
  const mainContent = coreContent(talks)

  return (
    <>
      <AuthorLayout content={mainContent}>
        <MDXLayoutRenderer code={talks.body.code} />
      </AuthorLayout>
    </>
  )
}
