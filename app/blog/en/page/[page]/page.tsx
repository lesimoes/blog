import ListLayout from '@/layouts/ListLayoutWithTags'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'

const POSTS_PER_PAGE = 5

export const generateStaticParams = async () => {
  const postsEn = allBlogs.filter((post) => post.path.startsWith('blog/en/'))
  const totalPages = Math.ceil(postsEn.length / POSTS_PER_PAGE)
  const paths = Array.from({ length: totalPages }, (_, i) => ({ page: (i + 1).toString() }))

  return paths
}

export default function BlogEnPaged({ params }: { params: { page: string } }) {
  const postsEn = allCoreContent(
    sortPosts(allBlogs.filter((post) => post.path.startsWith('blog/en/')))
  )
  const pageNumber = parseInt(params.page as string)
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
