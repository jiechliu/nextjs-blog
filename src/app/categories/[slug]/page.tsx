import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPostsByCategory, getAllCategories } from '@/lib/blog';
import PostCard from '@/components/PostCard';

interface CategoryPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getAllCategories().map(c => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const cat = getAllCategories().find(
    c => c.slug === params.slug || c.slug === decodeURIComponent(params.slug)
  );
  if (!cat) return { title: '分类未找到 — BlockCoder' };
  return {
    title: `${cat.name} — BlockCoder`,
    description: `浏览 ${cat.name} 分类下的所有技术文章`,
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const categories = getAllCategories();
  const decodedSlug = decodeURIComponent(params.slug);
  const cat = categories.find(c => c.slug === params.slug || c.slug === decodedSlug);
  if (!cat) notFound();

  const posts = getPostsByCategory(cat.name);

  return (
    <div className="container-custom" style={{ paddingBlock: 'var(--space-12)' }}>
      {/* Breadcrumb */}
      <nav aria-label="面包屑" style={{ marginBottom: 'var(--space-8)' }}>
        <ol style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', listStyle: 'none', padding: 0, margin: 0 }}>
          {[{ href: '/', label: '首页' }, { href: '/categories', label: '分类' }].map(({ href, label }) => (
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
              {cat.name}
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
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', marginBottom: 'var(--space-3)', flexWrap: 'wrap' }}>
          <Link href="/categories" className="tag-category post-card-cat">分类</Link>
          <span style={{ color: 'var(--color-border-strong)', fontSize: 'var(--text-xs)' }}>·</span>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xs)', color: 'var(--color-green-text)' }}>
            {cat.count} 篇文章
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
          {cat.name}
        </h1>
      </div>

      {posts.length > 0 ? (
        <div>
          {posts.map(post => (
            <PostCard key={post.slug} post={post} variant="list" />
          ))}
        </div>
      ) : (
        <div style={{ paddingBlock: 'var(--space-16)', textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-sm)', color: 'var(--color-text-tertiary)' }}>
            {cat.name} 分类下还没有文章。
          </p>
          <Link href="/categories" className="btn-secondary" style={{ display: 'inline-flex', marginTop: 'var(--space-6)' }}>
            ← 浏览其他分类
          </Link>
        </div>
      )}

      {posts.length > 0 && (
        <div style={{ marginTop: 'var(--space-12)', paddingTop: 'var(--space-8)', borderTop: '1px solid var(--color-border)' }}>
          <Link href="/categories" className="breadcrumb-link" style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-sm)',
            color: 'var(--color-text-secondary)',
            textDecoration: 'none',
          }}>
            ← 返回分类列表
          </Link>
        </div>
      )}
    </div>
  );
}
