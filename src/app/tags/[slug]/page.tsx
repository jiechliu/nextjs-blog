import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPostsByTag, getAllTags } from '@/lib/blog';
import PostCard from '@/components/PostCard';

interface TagPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getAllTags().map(t => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: TagPageProps) {
  const tag = getAllTags().find(
    t => t.slug === params.slug || t.slug === decodeURIComponent(params.slug)
  );
  if (!tag) return { title: '标签未找到 — BlockCoder' };
  return {
    title: `#${tag.name} — BlockCoder`,
    description: `浏览标签为 ${tag.name} 的所有技术文章`,
  };
}

export default function TagPage({ params }: TagPageProps) {
  const tags = getAllTags();
  const decodedSlug = decodeURIComponent(params.slug);
  const tag = tags.find(t => t.slug === params.slug || t.slug === decodedSlug);
  if (!tag) notFound();

  const posts = getPostsByTag(tag.name);
  const otherTags = tags.filter(t => t.slug !== tag.slug).slice(0, 12);

  return (
    <div className="container-custom" style={{ paddingBlock: 'var(--space-12)' }}>
      {/* Breadcrumb */}
      <nav aria-label="面包屑" style={{ marginBottom: 'var(--space-8)' }}>
        <ol style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', listStyle: 'none', padding: 0, margin: 0 }}>
          {[{ href: '/', label: '首页' }, { href: '/tags', label: '标签' }].map(({ href, label }) => (
            <li key={href} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <Link href={href} className="breadcrumb-link" style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-xs)',
                color: 'var(--color-text-tertiary)',
                textDecoration: 'none',
              }}>
                {label}
              </Link>
              <span style={{ color: 'var(--color-border-strong)', fontSize: 'var(--text-xs)' }}>/</span>
            </li>
          ))}
          <li>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)' }}>
              #{tag.name}
            </span>
          </li>
        </ol>
      </nav>

      {/* Page header */}
      <div style={{
        paddingBottom: 'var(--space-12)',
        marginBottom: 'var(--space-12)',
        borderBottom: '2px solid var(--color-accent)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-3)', flexWrap: 'wrap' }}>
          <span className="tag">标签</span>
          <span style={{ color: 'var(--color-border-strong)', fontSize: 'var(--text-xs)' }}>·</span>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xs)', color: 'var(--color-amber-text)', fontVariantNumeric: 'tabular-nums' }}>
            {tag.count} 篇文章
          </span>
        </div>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2rem, 6vw, 3.5rem)',
          fontWeight: 800,
          letterSpacing: '-0.04em',
          lineHeight: 1.0,
          color: 'var(--color-text)',
        }}>
          #{tag.name}
        </h1>
      </div>

      {/* Posts */}
      {posts.length > 0 ? (
        <div>
          {posts.map(post => (
            <PostCard key={post.slug} post={post} variant="list" />
          ))}
        </div>
      ) : (
        <div style={{ paddingBlock: 'var(--space-16)', textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-sm)', color: 'var(--color-text-tertiary)' }}>
            标签 "{tag.name}" 下还没有文章。
          </p>
          <Link href="/tags" className="btn-secondary" style={{ display: 'inline-flex', marginTop: 'var(--space-6)' }}>
            ← 浏览其他标签
          </Link>
        </div>
      )}

      {/* Other tags */}
      {otherTags.length > 0 && (
        <div style={{
          marginTop: 'var(--space-16)',
          paddingTop: 'var(--space-8)',
          borderTop: '1px solid var(--color-border)',
        }}>
          <p className="section-eyebrow" style={{ marginBottom: 'var(--space-6)' }}>其他标签</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
            {otherTags.map((t, i) => (
              <Link key={t.slug} href={`/tags/${t.slug}`} className={i % 3 === 1 ? 'tag-alt' : 'tag'}>
                #{t.name}
                <span style={{ opacity: 0.6, marginLeft: 3, fontSize: 'var(--text-xs)', fontVariantNumeric: 'tabular-nums' }}>
                  {t.count}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div style={{ marginTop: 'var(--space-8)', paddingTop: 'var(--space-8)', borderTop: '1px solid var(--color-border-subtle)' }}>
        <Link href="/tags" className="breadcrumb-link" style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-sm)',
          color: 'var(--color-text-secondary)',
          textDecoration: 'none',
        }}>
          ← 返回标签列表
        </Link>
      </div>
    </div>
  );
}
