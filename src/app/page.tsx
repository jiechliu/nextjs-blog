import Link from 'next/link';
import { getAllPosts, getFeaturedPosts } from '@/lib/blog';
import PostCard from '@/components/PostCard';
import Sidebar from '@/components/Sidebar';

export default function HomePage() {
  const allPosts = getAllPosts();
  const featuredPosts = getFeaturedPosts();
  const heroPosts = featuredPosts.length > 0 ? featuredPosts : allPosts.slice(0, 1);
  const heroPost = heroPosts[0];
  const listPosts = allPosts
    .filter(p => p.slug !== heroPost?.slug)
    .slice(0, 8);
  const gridPosts = allPosts
    .filter(p => !featuredPosts.find(f => f.slug === p.slug))
    .slice(0, 6);

  return (
    <div className="container-custom" style={{ paddingBlock: 'var(--space-16)' }}>

      {/* ── Page header ─────────────────────────────────────── */}
      <div
        className="page-header"
        style={{
          paddingBottom: 'var(--space-16)',
          marginBottom: 'var(--space-16)',
          borderBottom: '2px solid var(--color-accent)',
        }}
      >
        {/* Brand mark + title row */}
        <div
          className="page-header-title-row"
          style={{ display: 'flex', alignItems: 'flex-end', gap: 'var(--space-6)', marginBottom: 'var(--space-8)' }}
        >
          <span
            aria-hidden="true"
            className="page-header-block-mark"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 5,
              width: 64,
              height: 64,
              flexShrink: 0,
              marginBottom: 8,
            }}
          >
            {[0,1,2,3].map(i => (
              <span
                key={i}
                style={{
                  backgroundColor:
                    i === 0 ? 'var(--color-accent)' :
                    i === 1 ? 'var(--color-amber)' :
                    i === 2 ? 'var(--color-green)' :
                    'var(--color-border-strong)',
                  borderRadius: 5,
                }}
              />
            ))}
          </span>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3.5rem, 10vw, 7rem)',
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: '-0.05em',
              color: 'var(--color-text)',
            }}
          >
            BlockCoder
          </h1>
        </div>

        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-xl)',
            lineHeight: 'var(--leading-relaxed)',
            color: 'var(--color-text-secondary)',
            maxWidth: '48ch',
          }}
        >
          记录与分享前端开发、全栈技术和编程实践。
          从代码细节到架构思考，方块世界的代码师在此。
        </p>
      </div>

      {/* ── Two-column layout ───────────────────────────────── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: 'var(--space-16)',
          alignItems: 'start',
        }}
        className="lg:grid-cols-[1fr_240px]"
      >
        {/* ── Main content ──────────────────────────────────── */}
        <div>

          {/* Hero post */}
          {heroPost && (
            <PostCard post={heroPost} variant="hero" />
          )}

          {/* Section: latest posts */}
          <section>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 'var(--space-6)',
              }}
            >
              <p className="section-eyebrow">
                最新文章
              </p>
              {allPosts.length > 8 && (
                <Link href="/posts" className="section-more-link">
                  全部文章
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
              )}
            </div>

            {listPosts.length > 0 ? (
              <div>
                {listPosts.map(post => (
                  <PostCard key={post.slug} post={post} variant="list" />
                ))}
              </div>
            ) : (
              /* Empty state */
              <div
                style={{
                  padding: 'var(--space-16) 0',
                  textAlign: 'center',
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--text-sm)',
                    color: 'var(--color-text-tertiary)',
                  }}
                >
                  还没有文章。在{' '}
                  <code
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.9em',
                      backgroundColor: 'var(--color-bg-inset)',
                      padding: '2px 6px',
                      borderRadius: 'var(--radius-sm)',
                    }}
                  >
                    posts/
                  </code>{' '}
                  目录创建你的第一篇 Markdown 文章吧。
                </p>
              </div>
            )}

            {/* Grid section — featured / all posts */}
            {gridPosts.length > 0 && (
              <section style={{ marginTop: 'var(--space-16)' }}>
                <p className="section-eyebrow" style={{ marginBottom: 'var(--space-6)' }}>
                  所有文章
                </p>
                <div
                  className="post-grid"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: 'var(--space-6)',
                  }}
                >
                  {gridPosts.map(post => (
                    <PostCard key={post.slug} post={post} variant="grid" />
                  ))}
                </div>

                {allPosts.length > 6 && (
                  <div style={{ marginTop: 'var(--space-8)', textAlign: 'center' }}>
                    <Link
                      href="/posts"
                      className="btn-secondary"
                      style={{ display: 'inline-flex' }}
                    >
                      查看全部 {allPosts.length} 篇文章
                    </Link>
                  </div>
                )}
              </section>
            )}
          </section>
        </div>

        {/* ── Sidebar — hidden on mobile ────────────────────── */}
        <div className="sidebar-mobile-hidden" style={{ position: 'sticky', top: 72 }}>
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
