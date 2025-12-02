import { getAllPosts, getFeaturedPosts } from '@/lib/blog';
import PostCard from '@/components/PostCard';
import Sidebar from '@/components/Sidebar';
import TypewriterEffect from '@/components/TypewriterEffect';

export default function HomePage() {
  const allPosts = getAllPosts();
  const featuredPosts = getFeaturedPosts();
  const regularPosts = allPosts.filter(post => !post.featured).slice(0, 6);

  return (
    <div className="container-custom py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 title-gradient">
          BlockCoder
        </h1>
        
        <div className="text-xl md:text-2xl text-gray-700 mb-4 max-w-3xl mx-auto leading-relaxed">
          <TypewriterEffect 
            texts={[
              "方块世界的代码师 ✨",
              "探索技术的无限可能 🚀", 
              "分享编程的精彩世界 💻",
              "创造数字时代的奇迹 🌟"
            ]}
            speed={80}
            deleteSpeed={40}
            pauseTime={2000}
            className="font-medium"
          />
        </div>
        
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          在这里，每一行代码都是一个故事，每一个项目都是一次冒险
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#featured" className="btn-primary magnetic-hover">
            🚀 探索精选文章
          </a>
          <a href="/posts" className="btn-secondary magnetic-hover">
            📚 浏览所有文章
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Featured Posts */}
          {featuredPosts.length > 0 && (
            <section id="featured" className="mb-16">
              <div className="flex items-center mb-10">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                <h2 className="text-3xl md:text-4xl font-bold mx-6 text-gray-800 title-gradient">
                  ✨ 精选文章
                </h2>
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
              </div>
              
              <div className="space-y-8">
                {featuredPosts.map((post, index) => (
                  <div 
                    key={post.slug}
                    className="float-animation"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <PostCard post={post} featured={true} />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Latest Posts */}
          <section>
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-gray-300 mr-6"></div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 title-gradient">
                  📰 最新文章
                </h2>
              </div>
              {allPosts.length > 6 && (
                <a
                  href="/posts"
                  className="btn-secondary text-sm group magnetic-hover"
                >
                  <span className="flex items-center gap-2">
                    查看全部 
                    <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </span>
                </a>
              )}
            </div>

            {regularPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {regularPosts.map((post, index) => (
                  <div 
                    key={post.slug}
                    className="float-animation"
                    style={{ animationDelay: `${(index + featuredPosts.length) * 0.1}s` }}
                  >
                    <PostCard post={post} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="text-8xl mb-6 float-animation">📝</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  还没有文章
                </h3>
                <p className="text-gray-600 text-lg">
                  开始创建你的第一篇博客文章吧！
                </p>
              </div>
            )}
          </section>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-8">
            <Sidebar />
          </div>
        </div>
      </div>

      {/* 底部装饰 */}
      <div className="mt-20 text-center">
        <div className="w-32 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-auto mb-8"></div>
        <p className="text-gray-500 text-sm">
          持续创作，分享技术之美 ✨
        </p>
      </div>
    </div>
  );
}