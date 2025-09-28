import ListLayout from '@/layouts/ListLayoutWithTags'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'

const POSTS_PER_PAGE = 5

export const metadata = genPageMetadata({ title: 'Blog (PT)' })

export default function BlogPtPage() {
  const postsPt = allCoreContent(
    sortPosts(allBlogs.filter((post) => post.path.startsWith('blog/pt/')))
  )
  const pageNumber = 1
  const initialDisplayPosts = postsPt.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(postsPt.length / POSTS_PER_PAGE),
  }

  return (
    <ListLayout
      posts={postsPt}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title="Posts em Português"
    />
  )
}
