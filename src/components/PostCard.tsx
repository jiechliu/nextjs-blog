import Link from 'next/link';
import { BlogPost } from '@/types/blog';

interface PostCardProps {
  post: BlogPost;
  featured?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({ post, featured = false }) => {
  return (
    <article className={`card p-6 ${featured ? 'border-blue-200 bg-blue-50' : ''}`}>
      {featured && (
        <div className="flex items-center mb-3">
          <span className="bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded-full">
            精选文章
          </span>
        </div>
      )}
      
      <div className="flex items-center text-sm text-gray-500 mb-3">
        <time dateTime={post.date}>
          {new Date(post.date).toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </time>
      </div>

      <Link href={`/posts/${post.slug}`}>
        <h2 className={`font-bold mb-3 text-gray-900 hover:text-blue-600 transition-colors ${
          featured ? 'text-2xl' : 'text-xl'
        }`}>
          {post.title}
        </h2>
      </Link>

      <p className="text-gray-600 mb-4 leading-relaxed">
        {post.excerpt}
      </p>

      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2 flex-1 min-w-0">
          <Link
            href={`/categories/${encodeURIComponent(post.category.toLowerCase().replace(/\s+/g, '-'))}`}
            className="inline-flex items-center bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full hover:bg-gray-200 transition-colors"
          >
            {post.category}
          </Link>
          {post.tags.slice(0, 2).map((tag) => (
            <Link
              key={tag}
              href={`/tags/${encodeURIComponent(tag.toLowerCase().replace(/\s+/g, '-'))}`}
              className="tag"
            >
              {tag}
            </Link>
          ))}
          {post.tags.length > 2 && (
            <span className="inline-flex items-center text-xs text-gray-400 px-2 py-1">
              +{post.tags.length - 2}
            </span>
          )}
        </div>

        <Link
          href={`/posts/${post.slug}`}
          className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors whitespace-nowrap flex-shrink-0"
        >
          阅读更多 →
        </Link>
      </div>
    </article>
  );
};

export default PostCard;