import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPostBySlug, getAllPosts } from '@/lib/blog';
import JuejinStyleTOC from '@/components/JuejinStyleTOC';
import RelatedPosts from '@/components/RelatedPosts';
import StickySidebar from '@/components/StickySidebar';
import SimpleMobileTOC from '@/components/SimpleMobileTOC';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import ReadingProgress from '@/components/ReadingProgress';
import GiscusComments from '@/components/GiscusComments';

interface PostPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PostPageProps) {
  const post = getPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} - JieCheng.Dev`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,

    },
  };
}

export default function PostPage({ params }: PostPageProps) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <ReadingProgress />
      <SimpleMobileTOC content={post.content} />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* 背景装饰 */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-blue-50/30 to-pink-50/50"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-32 h-32 bg-purple-200/20 rounded-full blur-xl"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-blue-200/20 rounded-full blur-lg"></div>
          <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-pink-200/20 rounded-full blur-2xl"></div>
        </div>
        
        <div className="relative container-custom py-16">
          <div className="max-w-4xl mx-auto text-center">
            {/* 面包屑导航 */}
            <nav className="mb-8">
              <ol className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                <li>
                  <Link href="/" className="hover:text-blue-600 transition-colors">
                    首页
                  </Link>
                </li>
                <li>/</li>
                <li>
                  <Link href="/posts" className="hover:text-blue-600 transition-colors">
                    文章
                  </Link>
                </li>
                <li>/</li>
                <li className="text-gray-900 font-medium truncate max-w-xs">
                  {post.title}
                </li>
              </ol>
            </nav>

            {/* 分类标签 */}
            <div className="mb-6">
              <Link 
                href={`/categories/${encodeURIComponent(post.category.toLowerCase().replace(/\s+/g, '-'))}`}
                className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 magnetic-hover"
                style={{
                  background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
                  border: '1px solid rgba(99, 102, 241, 0.2)',
                  color: '#6366f1'
                }}
              >
                <span className="mr-2">📁</span>
                {post.category}
              </Link>
            </div>

            {/* 文章标题 */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 title-gradient leading-tight">
              {post.title}
            </h1>

            {/* 文章摘要 */}
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              {post.excerpt}
            </p>

            {/* 元信息 */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-gray-500 mb-8">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString('zh-CN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <span>约 {Math.ceil(post.content.length / 500)} 分钟阅读</span>
              </div>
            </div>

            {/* 标签 */}
            {post.tags.length > 0 && (
              <div className="flex flex-wrap justify-center gap-3">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/tags/${encodeURIComponent(tag.toLowerCase().replace(/\s+/g, '-'))}`}
                    className="tag magnetic-hover"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="container-custom py-8">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {/* Main Content */}
          <div className="xl:col-span-3">
            <article className="card p-8 md:p-12 magnetic-hover">
              {/* Article Content */}
              <div className="prose prose-lg max-w-none">
                <MarkdownRenderer content={post.content} />
              </div>

              {/* Article Footer */}
              <footer className="mt-16 pt-8 border-t border-gray-200/50">
                {/* 分享按钮 */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-8">
                  <div className="flex items-center gap-4">
                    <span className="text-gray-600 font-medium">分享这篇文章：</span>
                    <div className="flex gap-3">
                      <button className="w-10 h-10 rounded-full bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 transition-all duration-300 hover:scale-110 flex items-center justify-center magnetic-hover">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                        </svg>
                      </button>
                      <button className="w-10 h-10 rounded-full bg-pink-500/10 text-pink-600 hover:bg-pink-500/20 transition-all duration-300 hover:scale-110 flex items-center justify-center magnetic-hover">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
                        </svg>
                      </button>
                      <button className="w-10 h-10 rounded-full bg-green-500/10 text-green-600 hover:bg-green-500/20 transition-all duration-300 hover:scale-110 flex items-center justify-center magnetic-hover">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  <Link
                    href="/posts"
                    className="btn-secondary group magnetic-hover"
                  >
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                      </svg>
                      返回文章列表
                    </span>
                  </Link>
                </div>

                {/* 作者信息卡片 */}
                <div className="card p-6 bg-gradient-to-r from-blue-50/50 to-purple-50/50 border-blue-200/30">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-xl font-bold">
                      BC
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 mb-1">BlockCoder</h3>
                      <p className="text-gray-600 text-sm mb-2">方块世界的代码师，专注于前端技术分享</p>
                      <div className="flex gap-3">
                        <a href="#" className="text-blue-600 hover:text-blue-700 transition-colors">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                          </svg>
                        </a>
                        <a href="#" className="text-gray-600 hover:text-gray-700 transition-colors">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </footer>
            </article>

            {/* 评论区域 */}
            <div className="mt-8">
              <GiscusComments slug={post.slug} />
            </div>
          </div>

          {/* Sticky Sidebar - Desktop Only */}
          <div className="hidden xl:block xl:col-span-1">
            <StickySidebar>
              {/* 目录 */}
              <div className="card p-0 overflow-hidden magnetic-hover">
                <JuejinStyleTOC content={post.content} maxItems={8} />
              </div>
              
              {/* 相关推荐 */}
              <div className="card p-0 overflow-hidden magnetic-hover">
                <RelatedPosts currentPost={post} maxPosts={5} />
              </div>
            </StickySidebar>
          </div>
        </div>
      </div>
    </div>
  );
}