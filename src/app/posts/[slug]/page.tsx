import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPostBySlug, getAllPosts } from '@/lib/blog';
import ArticleTOC from '@/components/ArticleTOC';
import RelatedPosts from '@/components/RelatedPosts';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import ReadingProgress from '@/components/ReadingProgress';
import GiscusComments from '@/components/GiscusComments';
import { CalendarOutlined, ClockCircleOutlined } from '@ant-design/icons';

interface PostPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return getAllPosts().map(post => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PostPageProps) {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: '文章不存在' };
  return {
    title: `${post.title} — BlockCoder`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
    },
  };
}

function readingTime(content: string) {
  // Chinese: ~500 chars/min, code blocks count less
  return Math.max(1, Math.ceil(content.length / 500));
}

export default function PostPage({ params }: PostPageProps) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const catSlug = encodeURIComponent(
    post.category.toLowerCase().replace(/\s+/g, '-')
  );
  const mins = readingTime(post.content);

  return (
    <>
      <ReadingProgress />

      {/* ── Article header ──────────────────────────────────────── */}
      <header style={{ backgroundColor: 'var(--color-bg)' }}>
        <div
          className="container-custom"
          style={{ paddingTop: 'var(--space-12)', paddingBottom: 'var(--space-12)' }}
        >
          {/* Breadcrumb */}
          <nav aria-label="面包屑" style={{ marginBottom: 'var(--space-8)' }}>
            <ol style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              listStyle: 'none',
              padding: 0,
              margin: 0,
            }}>
              {[
                { href: '/', label: '首页' },
                { href: '/posts', label: '文章' },
              ].map(({ href, label }) => (
                <li key={href} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <Link
                    href={href}
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'var(--text-xs)',
                      color: 'var(--color-text-tertiary)',
                      textDecoration: 'none',
                      transition: 'color var(--duration-fast) var(--ease-out-quart)',
                    }}
                    className="breadcrumb-link"
                  >
                    {label}
                  </Link>
                  <span style={{ color: 'var(--color-border-strong)', fontSize: 'var(--text-xs)' }}>/</span>
                </li>
              ))}
              <li>
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--color-text-secondary)',
                  maxWidth: '32ch',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  display: 'block',
                }}>
                  {post.title}
                </span>
              </li>
            </ol>
          </nav>

          {/* Category + date row */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-3)',
            marginBottom: 'var(--space-6)',
            flexWrap: 'wrap',
          }}>
            <Link href={`/categories/${catSlug}`} className="tag-category post-card-cat">
              {post.category}
            </Link>
            <span style={{ color: 'var(--color-border-strong)', fontSize: 'var(--text-xs)' }}>·</span>
            <time
              dateTime={post.date}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-xs)',
                color: 'var(--color-amber-text)',
                fontVariantNumeric: 'tabular-nums',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
              }}
            >
              <CalendarOutlined style={{ fontSize: 10 }} />
              {new Date(post.date).toLocaleDateString('zh-CN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            <span style={{ color: 'var(--color-border-strong)', fontSize: 'var(--text-xs)' }}>·</span>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-xs)',
              color: 'var(--color-green-text)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
            }}>
              <ClockCircleOutlined style={{ fontSize: 10 }} />
              约 {mins} 分钟
            </span>
          </div>

          {/* Title */}
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 5vw, 3.25rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: '-0.035em',
            color: 'var(--color-text)',
            marginBottom: 'var(--space-6)',
            maxWidth: '22ch',
          }}>
            {post.title}
          </h1>

          {/* Excerpt */}
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-lg)',
            lineHeight: 'var(--leading-relaxed)',
            color: 'var(--color-text-secondary)',
            maxWidth: '60ch',
            marginBottom: 'var(--space-8)',
          }}>
            {post.excerpt}
          </p>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
              {post.tags.map((tag, i) => (
                <Link
                  key={tag}
                  href={`/tags/${encodeURIComponent(tag.toLowerCase().replace(/\s+/g, '-'))}`}
                  className={`tag${i % 3 === 2 ? ' tag-alt' : ''}`}
                >
                  #{tag}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Accent divider */}
        <div style={{
          height: 2,
          backgroundColor: 'var(--color-accent)',
          opacity: 0.25,
        }} />
      </header>

      {/* ── Body: article + sidebar ─────────────────────────────── */}
      <div className="container-custom" style={{ paddingTop: 'var(--space-12)', paddingBottom: 'var(--space-16)' }}>
        <div
          className="article-body-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: 'var(--space-16)',
            alignItems: 'start',
          }}
        >
          {/* ── Main article ──────────────────────────────────── */}
          <div>
            <article style={{ maxWidth: '72ch' }}>
              <div className="prose-bc">
                <MarkdownRenderer content={post.content} />
              </div>

              {/* Article footer */}
              <footer style={{
                marginTop: 'var(--space-16)',
                paddingTop: 'var(--space-8)',
                borderTop: '1px solid var(--color-border)',
              }}>
                {/* Author + back row */}
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: 'var(--space-8)',
                  flexWrap: 'wrap',
                  marginBottom: 'var(--space-8)',
                }}>
                  {/* Author */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                    <span
                      aria-hidden="true"
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: 3,
                        width: 40,
                        height: 40,
                        flexShrink: 0,
                      }}
                    >
                      {[0,1,2,3].map(i => (
                        <span key={i} style={{
                          backgroundColor:
                            i === 0 ? 'var(--color-accent)' :
                            i === 1 ? 'var(--color-amber)' :
                            i === 2 ? 'var(--color-green)' :
                            'var(--color-border-strong)',
                          borderRadius: 3,
                        }} />
                      ))}
                    </span>
                    <div>
                      <p style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 700,
                        fontSize: 'var(--text-sm)',
                        color: 'var(--color-text)',
                        marginBottom: 2,
                        letterSpacing: '-0.01em',
                      }}>
                        JieCheng
                      </p>
                      <p style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'var(--text-xs)',
                        color: 'var(--color-text-tertiary)',
                      }}>
                        方块世界的代码师
                      </p>
                    </div>
                  </div>

                  {/* Back link */}
                  <Link href="/posts" className="btn-secondary" style={{ flexShrink: 0 }}>
                    ← 返回文章列表
                  </Link>
                </div>

                {/* Tag list (repeated for discoverability) */}
                {post.tags.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                    {post.tags.map((tag, i) => (
                      <Link
                        key={tag}
                        href={`/tags/${encodeURIComponent(tag.toLowerCase().replace(/\s+/g, '-'))}`}
                        className={`tag${i % 3 === 2 ? ' tag-alt' : ''}`}
                      >
                        #{tag}
                      </Link>
                    ))}
                  </div>
                )}
              </footer>
            </article>

            {/* Comments */}
            <div style={{ marginTop: 'var(--space-16)', maxWidth: '72ch' }}>
              <GiscusComments slug={post.slug} />
            </div>
          </div>

          {/* ── Sticky sidebar (desktop) ───────────────────────── */}
          <aside
            className="sidebar-mobile-hidden article-sidebar"
          >
            <ArticleTOC content={post.content} />
            <RelatedPosts currentPost={post} maxPosts={5} />
          </aside>
        </div>
      </div>
    </>
  );
}
