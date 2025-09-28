import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Image from './Image'
import Link from './Link'
import Tag from './Tag'
import siteMetadata from '@/data/siteMetadata'

interface PostCardProps {
  post: CoreContent<Blog>
}

const PostCard = ({ post }: PostCardProps) => {
  const { path, date, title, summary, tags, images } = post
  const featuredImage = images && images.length > 0 ? images[0] : '/static/images/ocean.jpeg'

  return (
    <div className="w-full lg:w-4/12 p-4">
      <div className="flex h-full flex-col overflow-hidden rounded-lg border border-gray-200 border-opacity-60 bg-white shadow-md transition-shadow duration-300 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800">
        {/* Image */}
        <Link href={`/${path}`} aria-label={`Link to ${title}`}>
          <div className="relative overflow-hidden">
            <Image
              alt={title}
              src={featuredImage}
              className="h-48 w-full object-cover object-center transition-transform duration-300 hover:scale-105 md:h-52 lg:h-56"
              width={544}
              height={224}
            />
          </div>
        </Link>

        {/* Content */}
        <div className="flex flex-1 flex-col justify-between p-6">
          <div>
            {/* Date */}
            <div className="mb-3">
              <time
                dateTime={date}
                className="text-sm font-medium text-gray-500 dark:text-gray-400"
              >
                {formatDate(date, siteMetadata.locale)}
              </time>
            </div>

            {/* Title */}
            <h3 className="mb-3 text-xl font-bold leading-7 tracking-tight">
              <Link
                href={`/${path}`}
                className="text-gray-900 transition-colors duration-200 hover:text-primary-600 dark:text-gray-100 dark:hover:text-primary-400"
                aria-label={`Link to ${title}`}
              >
                {title}
              </Link>
            </h3>

            {/* Tags */}
            {tags && tags.length > 0 && (
              <div className="mb-3 flex flex-wrap gap-2">
                {tags.slice(0, 3).map((tag) => (
                  <Tag key={tag} text={tag} />
                ))}
                {tags.length > 3 && (
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    +{tags.length - 3} more
                  </span>
                )}
              </div>
            )}

            {/* Description/Summary */}
            <p
              className="mb-4 text-gray-600 dark:text-gray-300"
              style={{
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {summary}
            </p>
          </div>

          {/* Read More Link */}
          <Link
            href={`/${path}`}
            className="inline-flex items-center text-base font-medium text-primary-500 transition-colors duration-200 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label={`Read more about ${title}`}
          >
            Read more
            <svg
              className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PostCard
