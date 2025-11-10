import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPostsByTag, getAllTags } from '@/lib/blog';
import PostCard from '@/components/PostCard';
import Sidebar from '@/components/Sidebar';

interface TagPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map((tag) => ({
    slug: tag.slug,
  }));
}

export async function generateMetadata({ params }: TagPageProps) {
  const tags = getAllTags();
  const tag = tags.find(t => t.slug === params.slug);
  
  if (!tag) {
    return {
      title: '标签未找到 - JieCheng.Dev',
    };
  }

  return {
    title: `${tag.name} - 标签 - JieCheng.Dev`,
    description: `浏览标签为 ${tag.name} 的所有技术文章`,
  };
}

export default function TagPage({ params }: TagPageProps) {
  const tags = getAllTags();
  const decodedSlug = decodeURIComponent(params.slug);
  const tag = tags.find(t => t.slug === params.slug || t.slug === decodedSlug);
  
  if (!tag) {
    notFound();
  }

  const posts = getPostsByTag(tag.name);

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
                <Link href="/tags" className="hover:text-blue-600 transition-colors">
                  标签
                </Link>
              </li>
              <li>/</li>
              <li className="text-gray-900 font-medium">{tag.name}</li>
            </ol>
          </nav>

          {/* Tag Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🏷️</span>
                <h1 className="text-4xl font-bold text-gray-900">{tag.name}</h1>
              </div>
              <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                {tag.count} 篇文章
              </span>
            </div>
            <p className="text-gray-600">
              浏览标签为 "{tag.name}" 的所有技术文章
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
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                暂无文章
              </h3>
              <p className="text-gray-500 mb-6">
                标签 "{tag.name}" 下还没有发布文章
              </p>
              <Link
                href="/tags"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                浏览其他标签
              </Link>
            </div>
          )}

          {/* Related Tags */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">相关标签</h3>
            <div className="flex flex-wrap gap-2">
              {tags
                .filter(t => t.slug !== tag.slug)
                .slice(0, 10)
                .map((relatedTag) => (
                  <Link
                    key={relatedTag.slug}
                    href={`/tags/${relatedTag.slug}`}
                    className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full hover:bg-gray-200 transition-colors text-sm"
                  >
                    {relatedTag.name}
                    <span className="ml-1 opacity-75">({relatedTag.count})</span>
                  </Link>
                ))}
            </div>
          </div>

          {/* Back to Tags */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <Link
              href="/tags"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              返回标签云
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