import Link from 'next/link';
import { getAllCategories } from '@/lib/blog';
import Sidebar from '@/components/Sidebar';

export const metadata = {
  title: '文章分类 - JieCheng.Dev',
  description: '按分类浏览技术文章',
};

export default function CategoriesPage() {
  const categories = getAllCategories();

  return (
    <div className="container-custom py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">文章分类</h1>
            <p className="text-gray-600">
              按技术领域和主题分类的文章集合
            </p>
          </div>

          {categories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/categories/${category.slug}`}
                  className="card p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {category.name}
                    </h3>
                    <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                      {category.count}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">
                    {category.count} 篇文章
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📂</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                还没有分类
              </h3>
              <p className="text-gray-500">
                发布文章时会自动创建分类
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