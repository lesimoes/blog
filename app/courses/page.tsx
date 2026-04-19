import { Courses, allCourses } from 'contentlayer/generated'
import { MDXLayoutRenderer } from '@/components/MDXLayoutRenderer'
import AuthorLayout from '@/layouts/AuthorLayout'
import { coreContent } from 'pliny/utils/contentlayer'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Courses' })

export default function Page() {
  const courses = allCourses.find((p) => p.slug === 'default') as Courses
  const mainContent = coreContent(courses)

  return (
    <>
      <AuthorLayout content={mainContent}>
        <MDXLayoutRenderer code={courses.body.code} />
      </AuthorLayout>
    </>
  )
}
