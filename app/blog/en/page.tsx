import ListLayout from '@/layouts/ListLayoutWithTags'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'

const POSTS_PER_PAGE = 5

export const metadata = genPageMetadata({ title: 'Blog (EN)' })

export default function BlogEnPage() {
  const postsEn = allCoreContent(
    sortPosts(allBlogs.filter((post) => post.path.startsWith('blog/en/')))
  )
  const pageNumber = 1
  const initialDisplayPosts = postsEn.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(postsEn.length / POSTS_PER_PAGE),
  }

  return (
    <ListLayout
      posts={postsEn}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title="Posts in English"
    />
  )
}
