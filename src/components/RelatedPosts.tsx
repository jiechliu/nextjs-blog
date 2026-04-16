import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';
import { BlogPost } from '@/types/blog';

interface RelatedPostsProps {
  currentPost: BlogPost;
  maxPosts?: number;
}

const RelatedPosts: React.FC<RelatedPostsProps> = ({ currentPost, maxPosts = 5 }) => {
  const allPosts = getAllPosts();

  const related = allPosts
    .filter(p => p.slug !== currentPost.slug)
    .filter(p =>
      p.category === currentPost.category ||
      p.tags.some(t => currentPost.tags.includes(t))
    )
    .slice(0, maxPosts);

  if (related.length < maxPosts) {
    const extra = allPosts
      .filter(p => p.slug !== currentPost.slug)
      .filter(p => !related.find(r => r.slug === p.slug))
      .slice(0, maxPosts - related.length);
    related.push(...extra);
  }

  if (related.length === 0) return null;

  return (
    <div>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-2)',
        marginBottom: 'var(--space-4)',
        paddingBottom: 'var(--space-3)',
        borderBottom: '1px solid var(--color-border-subtle)',
      }}>
        <span style={{
          display: 'inline-flex',
          gap: 3,
          flexShrink: 0,
        }}>
          {[0,1,2].map(i => (
            <span key={i} style={{
              display: 'block',
              width: 14,
              height: 2,
              borderRadius: 1,
              backgroundColor: i === 0 ? 'var(--color-amber)'
                : i === 1 ? 'var(--color-border-strong)'
                : 'var(--color-border)',
            }} />
          ))}
        </span>
        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-xs)',
          fontWeight: 700,
          textTransform: 'uppercase' as const,
          letterSpacing: '0.1em',
          color: 'var(--color-text-tertiary)',
        }}>
          相关推荐
        </span>
      </div>

      {/* List */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {related.map((post, i) => (
          <Link
            key={post.slug}
            href={`/posts/${post.slug}`}
            className="related-post-link"
          >
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-xs)',
              fontVariantNumeric: 'tabular-nums',
              color: 'var(--color-text-tertiary)',
              flexShrink: 0,
              width: 16,
            }}>
              {String(i + 1).padStart(2, '0')}
            </span>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-xs)',
              fontWeight: 500,
              lineHeight: 1.4,
              color: 'var(--color-text-secondary)',
              flex: 1,
              minWidth: 0,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical' as const,
              overflow: 'hidden',
            }}>
              {post.title}
            </span>
          </Link>
        ))}
      </div>

      <Link
        href="/posts"
        style={{
          display: 'block',
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-xs)',
          color: 'var(--color-text-tertiary)',
          marginTop: 'var(--space-4)',
          paddingTop: 'var(--space-3)',
          borderTop: '1px solid var(--color-border-subtle)',
          textDecoration: 'none',
          transition: 'color var(--duration-fast) var(--ease-out-quart)',
        }}
        className="related-more-link"
      >
        查看全部文章 →
      </Link>
    </div>
  );
};

export default RelatedPosts;
