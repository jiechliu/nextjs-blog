import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container-custom py-16">
      <div className="text-center">
        <div className="text-8xl mb-8">🔍</div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">页面未找到</h1>
        <p className="text-xl text-gray-600 mb-8">
          抱歉，您访问的页面不存在或已被移除。
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            返回首页
          </Link>
          <Link
            href="/posts"
            className="inline-flex items-center px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            浏览文章
          </Link>
        </div>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">📚 浏览文章</h3>
            <p className="text-gray-600 mb-4">查看我们的最新技术文章和教程</p>
            <Link href="/posts" className="text-blue-600 hover:text-blue-700 transition-colors">
              查看全部文章 →
            </Link>
          </div>
          
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">🏷️ 按分类浏览</h3>
            <p className="text-gray-600 mb-4">根据技术领域查找相关文章</p>
            <Link href="/categories" className="text-blue-600 hover:text-blue-700 transition-colors">
              查看分类 →
            </Link>
          </div>
          
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">🔖 按标签浏览</h3>
            <p className="text-gray-600 mb-4">通过标签快速找到感兴趣的内容</p>
            <Link href="/tags" className="text-blue-600 hover:text-blue-700 transition-colors">
              查看标签云 →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}