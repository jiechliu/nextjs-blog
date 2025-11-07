import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';
import { BlogPost } from '@/types/blog';

interface RelatedPostsProps {
  currentPost: BlogPost;
  maxPosts?: number;
}

const RelatedPosts: React.FC<RelatedPostsProps> = ({ currentPost, maxPosts = 5 }) => {
  const allPosts = getAllPosts();
  
  // 获取相关文章（同分类或相似标签）
  const relatedPosts = allPosts
    .filter(post => post.slug !== currentPost.slug) // 排除当前文章
    .filter(post => {
      // 同分类的文章
      if (post.category === currentPost.category) return true;
      // 有相同标签的文章
      return post.tags.some(tag => currentPost.tags.includes(tag));
    })
    .slice(0, maxPosts);

  // 如果相关文章不够，用最新文章补充
  if (relatedPosts.length < maxPosts) {
    const additionalPosts = allPosts
      .filter(post => post.slug !== currentPost.slug)
      .filter(post => !relatedPosts.some(related => related.slug === post.slug))
      .slice(0, maxPosts - relatedPosts.length);
    
    relatedPosts.push(...additionalPosts);
  }

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* 头部 */}
      <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/50">
        <h3 className="text-sm font-semibold text-gray-800 flex items-center">
          <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          相关推荐
        </h3>
      </div>

      {/* 文章列表 */}
      <div className="divide-y divide-gray-100">
        {relatedPosts.map((post, index) => (
          <Link
            key={post.slug}
            href={`/posts/${post.slug}`}
            className="block px-4 py-3 hover:bg-gray-50 transition-colors group"
          >
            <div className="flex items-start space-x-3">
              {/* 序号 */}
              <div className="flex-shrink-0 w-6 h-6 bg-gray-100 rounded text-xs font-medium text-gray-600 flex items-center justify-center group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                {index + 1}
              </div>
              
              {/* 文章信息 */}
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-5">
                  {post.title}
                </h4>
                <div className="mt-1 flex items-center text-xs text-gray-500 space-x-2">
                  <span>{post.author}</span>
                  <span>•</span>
                  <span>{post.readTime}分钟</span>
                  <span>•</span>
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString('zh-CN', {
                      month: 'numeric',
                      day: 'numeric'
                    })}
                  </time>
                </div>
                
                {/* 标签 */}
                {post.tags.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="inline-block px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      {/* 查看更多 */}
      <div className="px-4 py-3 border-t border-gray-100 bg-gray-50/30">
        <Link
          href="/posts"
          className="block text-center text-sm text-gray-600 hover:text-blue-600 transition-colors"
        >
          查看更多文章 →
        </Link>
      </div>
    </div>
  );
};

export default RelatedPosts;