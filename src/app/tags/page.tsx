import Link from 'next/link';
import { getAllTags } from '@/lib/blog';

export const metadata = {
  title: '标签 — BlockCoder',
  description: '按标签浏览技术文章',
};

export default function TagsPage() {
  const tags = getAllTags().sort((a, b) => b.count - a.count);
  const maxCount = tags[0]?.count ?? 1;

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
          标签
        </h1>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-base)',
          color: 'var(--color-text-secondary)',
        }}>
          {tags.length} 个标签，通过标签快速找到感兴趣的技术文章
        </p>
      </div>

      {tags.length > 0 ? (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)', alignItems: 'baseline' }}>
          {tags.map((tag, i) => {
            // Scale font size by count — larger count = more prominent
            const ratio = tag.count / maxCount;
            const fontSize = ratio >= 0.7 ? 'var(--text-xl)'
              : ratio >= 0.4 ? 'var(--text-lg)'
              : ratio >= 0.2 ? 'var(--text-base)'
              : 'var(--text-sm)';
            const weight = ratio >= 0.7 ? 700 : ratio >= 0.4 ? 600 : 500;

            return (
              <Link
                key={tag.slug}
                href={`/tags/${tag.slug}`}
                className={i % 3 === 1 ? 'tag-alt tag-cloud-item' : 'tag tag-cloud-item'}
                style={{
                  fontSize,
                  fontWeight: weight,
                  padding: ratio >= 0.5 ? '6px 14px' : '4px 10px',
                }}
                title={`${tag.count} 篇文章`}
              >
                #{tag.name}
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-xs)',
                  opacity: 0.65,
                  marginLeft: 4,
                  fontVariantNumeric: 'tabular-nums',
                }}>
                  {tag.count}
                </span>
              </Link>
            );
          })}
        </div>
      ) : (
        <div style={{ paddingBlock: 'var(--space-16)', textAlign: 'center' }}>
          <p style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-sm)',
            color: 'var(--color-text-tertiary)',
          }}>
            还没有标签，发布文章时会自动创建。
          </p>
        </div>
      )}
    </div>
  );
}
