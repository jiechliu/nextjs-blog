import Link from 'next/link';
import { getAllCategories, getAllTags, getRecentPosts } from '@/lib/blog';

const Sidebar = () => {
  const categories = getAllCategories();
  const tags = getAllTags();
  const recentPosts = getRecentPosts(5);

  return (
    <aside className="space-y-8">
      {/* Author Info */}
      <div className="card p-6 text-center">
        <div className="relative mb-6">
          <div className="w-24 h-24 mx-auto relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 animate-spin"></div>
            <div className="absolute inset-2 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <span className="text-white text-2xl font-bold">BC</span>
            </div>
          </div>
        </div>
        <h3 className="text-xl font-bold mb-3 text-gray-800">JieCheng.Dev</h3>
        <p className="text-gray-600 text-sm mb-6 leading-relaxed">
          专注于分享前端开发、全栈技术和编程实践的技术博客
        </p>
      </div>

      {/* Recent Posts */}
      {recentPosts.length > 0 && (
        <div className="card p-6">
          <h3 className="text-lg font-semibold mb-6 text-gray-800 flex items-center">
            <span className="mr-2">📰</span>
            最新文章
          </h3>
          <div className="space-y-4">
            {recentPosts.map((post, index) => (
              <div key={post.slug} className="group">
                <Link 
                  href={`/posts/${post.slug}`}
                  className="block text-sm font-medium text-gray-700 hover:text-gray-900 transition-all duration-300 line-clamp-2 group-hover:title-gradient"
                >
                  {post.title}
                </Link>
                <p className="text-xs text-gray-500 mt-2 flex items-center">
                  <span className="mr-1">📅</span>
                  {new Date(post.date).toLocaleDateString('zh-CN')}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Categories */}
      {categories.length > 0 && (
        <div className="card p-6">
          <h3 className="text-lg font-semibold mb-6 text-gray-800 flex items-center">
            <span className="mr-2">📁</span>
            文章分类
          </h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/categories/${category.slug}`}
                className="flex justify-between items-center py-3 px-4 rounded-lg hover:bg-white/30 transition-all duration-300 group"
              >
                <span className="text-gray-700 group-hover:text-gray-900">{category.name}</span>
                <span className="text-sm text-gray-500 bg-gray-200/50 px-2 py-1 rounded-full group-hover:bg-gray-300/50 transition-all duration-300">
                  {category.count}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Tags */}
      {tags.length > 0 && (
        <div className="card p-6">
          <h3 className="text-lg font-semibold mb-6 text-gray-800 flex items-center">
            <span className="mr-2">🏷️</span>
            热门标签
          </h3>
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 15).map((tag) => (
              <Link
                key={tag.slug}
                href={`/tags/${tag.slug}`}
                className="tag"
              >
                #{tag.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Newsletter */}
      <div className="card p-6 gradient-border">
        <h3 className="text-lg font-semibold mb-3 text-gray-800 flex items-center">
          <span className="mr-2">💌</span>
          订阅更新
        </h3>
        <p className="text-sm text-gray-600 mb-6 leading-relaxed">
          订阅我们的邮件列表，获取最新的技术文章和教程
        </p>
        <form className="space-y-4">
          <input
            type="email"
            placeholder="输入您的邮箱"
            className="w-full px-4 py-3 rounded-lg bg-white/50 border border-gray-300/50 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm transition-all duration-300"
          />
          <button
            type="submit"
            className="w-full btn-primary"
          >
            🚀 订阅
          </button>
        </form>
      </div>
    </aside>
  );
};

export default Sidebar;