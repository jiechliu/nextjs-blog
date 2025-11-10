import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPostsByCategory, getAllCategories } from '@/lib/blog';
import PostCard from '@/components/PostCard';
import Sidebar from '@/components/Sidebar';

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const categories = getAllCategories();
  const category = categories.find(cat => cat.slug === params.slug);
  
  if (!category) {
    return {
      title: '分类未找到 - JieCheng.Dev',
    };
  }

  return {
    title: `${category.name} - 分类 - JieCheng.Dev`,
    description: `浏览 ${category.name} 分类下的所有技术文章`,
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const categories = getAllCategories();
  const decodedSlug = decodeURIComponent(params.slug);
  const category = categories.find(cat => cat.slug === params.slug || cat.slug === decodedSlug);
  
  if (!category) {
    notFound();
  }

  const posts = getPostsByCategory(category.name);

  return (
    <div className="container-custom py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Breadcrumb */}
          <nav className="mb-6">
            <ol className="flex items-center space-x-2 text-sm text-gray-500">
              <li>
                <Link href="/" className="hover:text-blue-600 transition-colors">
                  首页
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/categories" className="hover:text-blue-600 transition-colors">
                  分类
                </Link>
              </li>
              <li>/</li>
              <li className="text-gray-900 font-medium">{category.name}</li>
            </ol>
          </nav>

          {/* Category Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <h1 className="text-4xl font-bold text-gray-900">{category.name}</h1>
              <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                {category.count} 篇文章
              </span>
            </div>
            <p className="text-gray-600">
              浏览 {category.name} 分类下的所有技术文章
            </p>
          </div>

          {/* Posts Grid */}
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {posts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📄</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                暂无文章
              </h3>
              <p className="text-gray-500 mb-6">
                {category.name} 分类下还没有发布文章
              </p>
              <Link
                href="/categories"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                浏览其他分类
              </Link>
            </div>
          )}

          {/* Back to Categories */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <Link
              href="/categories"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              返回分类列表
            </Link>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}