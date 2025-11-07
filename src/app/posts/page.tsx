import { getAllPosts } from '@/lib/blog';
import PostCard from '@/components/PostCard';
import Sidebar from '@/components/Sidebar';

export const metadata = {
  title: '所有文章 - BlogSpace',
  description: '浏览所有技术文章和教程',
};

export default function PostsPage() {
  const posts = getAllPosts();

  return (
    <div className="container-custom py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">所有文章</h1>
            <p className="text-gray-600">
              共 {posts.length} 篇文章，涵盖前端开发、全栈技术和编程实践
            </p>
          </div>

          {posts.length > 0 ? (
            <div className="space-y-8">
              {posts.map((post) => (
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
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}