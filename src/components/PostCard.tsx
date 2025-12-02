import Link from 'next/link';
import { BlogPost } from '@/types/blog';

interface PostCardProps {
  post: BlogPost;
  featured?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({ post, featured = false }) => {
  return (
    <article className={`card p-6 ${featured ? 'card-featured' : ''} group`}>
      {featured && (
        <div className="flex items-center mb-4">
          <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full pulse-glow">
            ✨ 精选文章
          </span>
        </div>
      )}
      
      <div className="flex items-center text-sm mb-4">
        <time 
          dateTime={post.date}
          className="text-gray-600 font-medium"
        >
          {new Date(post.date).toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </time>
      </div>

      <Link href={`/posts/${post.slug}`}>
        <h2 className={`font-bold mb-4 text-gray-800 group-hover:title-gradient transition-all duration-300 ${
          featured ? 'text-2xl' : 'text-xl'
        }`}>
          {post.title}
        </h2>
      </Link>

      <p className="text-gray-700 mb-6 leading-relaxed">
        {post.excerpt}
      </p>

      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2 flex-1 min-w-0">
          <Link
            href={`/categories/${encodeURIComponent(post.category.toLowerCase().replace(/\s+/g, '-'))}`}
            className="inline-flex items-center bg-blue-100/80 text-blue-700 text-sm px-3 py-1 rounded-full hover:bg-blue-200/80 transition-all duration-300 hover:scale-110 backdrop-blur-sm"
          >
            📁 {post.category}
          </Link>
          {post.tags.slice(0, 2).map((tag) => (
            <Link
              key={tag}
              href={`/tags/${encodeURIComponent(tag.toLowerCase().replace(/\s+/g, '-'))}`}
              className="tag"
            >
              #{tag}
            </Link>
          ))}
          {post.tags.length > 2 && (
            <span className="inline-flex items-center text-xs text-gray-500 px-2 py-1">
              +{post.tags.length - 2}
            </span>
          )}
        </div>

        <Link
          href={`/posts/${post.slug}`}
          className="btn-primary text-sm whitespace-nowrap flex-shrink-0 group"
        >
          <span className="flex items-center gap-2">
            阅读更多 
            <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
          </span>
        </Link>
      </div>
    </article>
  );
};

export default PostCard;