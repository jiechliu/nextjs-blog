import Link from 'next/link';
import { getAllCategories } from '@/lib/blog';

export const metadata = {
  title: '文章分类 — BlockCoder',
  description: '按分类浏览技术文章',
};

export default function CategoriesPage() {
  const categories = getAllCategories().sort((a, b) => b.count - a.count);

  return (
    <div className="container-custom" style={{ paddingBlock: 'var(--space-12)' }}>
      {/* Page header */}
      <div style={{
        paddingBottom: 'var(--space-12)',
        marginBottom: 'var(--space-12)',
        borderBottom: '2px solid var(--color-accent)',
      }}>
        <p className="section-eyebrow" style={{ marginBottom: 'var(--space-4)' }}>内容导航</p>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2rem, 6vw, 3.5rem)',
          fontWeight: 800,
          letterSpacing: '-0.04em',
          lineHeight: 1.0,
          color: 'var(--color-text)',
          marginBottom: 'var(--space-4)',
        }}>
          文章分类
        </h1>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-base)',
          color: 'var(--color-text-secondary)',
        }}>
          按技术领域和主题分类的文章集合，共 {categories.length} 个分类
        </p>
      </div>

      {categories.length > 0 ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 'var(--space-4)',
        }}>
          {categories.map(cat => (
            <Link
              key={cat.slug}
              href={`/categories/${cat.slug}`}
              className="category-card"
            >
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 'var(--space-3)' }}>
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-lg)',
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  color: 'var(--color-text)',
                }}>
                  {cat.name}
                </span>
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 600,
                  fontVariantNumeric: 'tabular-nums',
                  color: 'var(--color-accent-text)',
                  backgroundColor: 'var(--color-accent-subtle)',
                  padding: '2px 8px',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid color-mix(in oklch, var(--color-accent) 25%, transparent)',
                  flexShrink: 0,
                }}>
                  {cat.count}
                </span>
              </div>
              <p style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-xs)',
                color: 'var(--color-text-tertiary)',
              }}>
                {cat.count} 篇文章
              </p>
            </Link>
          ))}
        </div>
      ) : (
        <div style={{ paddingBlock: 'var(--space-16)', textAlign: 'center' }}>
          <p style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-sm)',
            color: 'var(--color-text-tertiary)',
          }}>
            还没有分类，发布文章时会自动创建。
          </p>
        </div>
      )}
    </div>
  );
}
