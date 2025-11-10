import Link from 'next/link';
import { getAllTags } from '@/lib/blog';
import Sidebar from '@/components/Sidebar';

export const metadata = {
  title: '标签云 - JieCheng.Dev',
  description: '按标签浏览技术文章',
};

export default function TagsPage() {
  const tags = getAllTags();

  return (
    <div className="container-custom py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">标签云</h1>
            <p className="text-gray-600">
              通过标签快速找到感兴趣的技术文章
            </p>
          </div>

          {tags.length > 0 ? (
            <div className="card p-8">
              <div className="flex flex-wrap gap-3">
                {tags.map((tag) => {
                  // 根据文章数量设置不同的字体大小
                  const getFontSize = (count: number) => {
                    if (count >= 10) return 'text-2xl';
                    if (count >= 5) return 'text-xl';
                    if (count >= 3) return 'text-lg';
                    return 'text-base';
                  };

                  const getOpacity = (count: number) => {
                    if (count >= 10) return 'opacity-100';
                    if (count >= 5) return 'opacity-90';
                    if (count >= 3) return 'opacity-80';
                    return 'opacity-70';
                  };

                  return (
                    <Link
                      key={tag.slug}
                      href={`/tags/${tag.slug}`}
                      className={`inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full hover:bg-blue-200 transition-colors font-medium ${getFontSize(tag.count)} ${getOpacity(tag.count)}`}
                      title={`${tag.count} 篇文章`}
                    >
                      {tag.name}
                      <span className="ml-2 text-sm opacity-75">
                        ({tag.count})
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🏷️</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                还没有标签
              </h3>
              <p className="text-gray-500">
                发布文章时会自动创建标签
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