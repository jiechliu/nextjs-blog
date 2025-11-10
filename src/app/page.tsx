import { getAllPosts, getFeaturedPosts } from '@/lib/blog';
import PostCard from '@/components/PostCard';
import Sidebar from '@/components/Sidebar';

export default function HomePage() {
  const allPosts = getAllPosts();
  const featuredPosts = getFeaturedPosts();
  const regularPosts = allPosts.filter(post => !post.featured).slice(0, 6);

  return (
    <div className="container-custom py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Featured Posts */}
          {featuredPosts.length > 0 && (
            <section id="featured" className="mb-12">
              <h2 className="text-3xl font-bold mb-8 text-gray-900">精选文章</h2>
              <div className="space-y-8">
                {featuredPosts.map((post) => (
                  <PostCard key={post.slug} post={post} featured={true} />
                ))}
              </div>
            </section>
          )}

          {/* Latest Posts */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">最新文章</h2>
              {allPosts.length > 6 && (
                <a
                  href="/posts"
                  className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  查看全部 →
                </a>
              )}
            </div>

            {regularPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {regularPosts.map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  还没有文章
                </h3>
                <p className="text-gray-500">
                  开始创建你的第一篇博客文章吧！
                </p>
              </div>
            )}
          </section>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}