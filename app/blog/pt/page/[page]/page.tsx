import ListLayout from '@/layouts/ListLayoutWithTags'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'

const POSTS_PER_PAGE = 5

export const generateStaticParams = async () => {
  const postsPt = allBlogs.filter((post) => post.path.startsWith('blog/pt/'))
  const totalPages = Math.ceil(postsPt.length / POSTS_PER_PAGE)
  const paths = Array.from({ length: totalPages }, (_, i) => ({ page: (i + 1).toString() }))

  return paths
}

export default function BlogPtPaged({ params }: { params: { page: string } }) {
  const postsPt = allCoreContent(
    sortPosts(allBlogs.filter((post) => post.path.startsWith('blog/pt/')))
  )
  const pageNumber = parseInt(params.page as string)
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
