import Link from 'next/link';
import { BlogPost } from '@/types/blog';

interface PostCardProps {
  post: BlogPost;
  variant?: 'hero' | 'list' | 'grid';
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

const PostCard: React.FC<PostCardProps> = ({ post, variant = 'grid' }) => {
  const tagSlug = (t: string) =>
    encodeURIComponent(t.toLowerCase().replace(/\s+/g, '-'));
  const catSlug = encodeURIComponent(
    post.category.toLowerCase().replace(/\s+/g, '-')
  );

  /* ── Hero variant ─────────────────────────────────────────── */
  if (variant === 'hero') {
    return (
      <article
        style={{
          paddingBottom: 'var(--space-12)',
          marginBottom: 'var(--space-12)',
          borderBottom: '1px solid var(--color-border)',
          position: 'relative',
        }}
      >
        <div
          style={{
            marginBottom: 'var(--space-4)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-3)',
            flexWrap: 'wrap',
          }}
        >
          {post.featured && (
            <span className="badge-featured">精选</span>
          )}
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
            }}
          >
            {formatDate(post.date)}
          </time>
        </div>

        <Link href={`/posts/${post.slug}`} className="post-card-title-link">
          <h2 className="post-card-title post-card-title--hero">
            {post.title}
          </h2>
        </Link>

        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-lg)',
            lineHeight: 'var(--leading-relaxed)',
            color: 'var(--color-text-secondary)',
            maxWidth: '62ch',
            marginBottom: 'var(--space-6)',
          }}
        >
          {post.excerpt}
        </p>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-4)',
            flexWrap: 'wrap',
          }}
        >
          <Link href={`/posts/${post.slug}`} className="post-card-read-more">
            阅读全文
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>

          <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
            {post.tags.slice(0, 3).map(tag => (
              <Link key={tag} href={`/tags/${tagSlug(tag)}`} className="tag">
                #{tag}
              </Link>
            ))}
          </div>
        </div>
      </article>
    );
  }

  /* ── List variant ─────────────────────────────────────────── */
  if (variant === 'list') {
    return (
      <article
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          alignItems: 'baseline',
          gap: 'var(--space-4)',
          padding: 'var(--space-4) 0',
          borderBottom: '1px solid var(--color-border-subtle)',
        }}
      >
        <div style={{ minWidth: 0 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              marginBottom: 'var(--space-2)',
            }}
          >
            <Link
              href={`/categories/${catSlug}`}
              className="tag-category post-card-cat"
              style={{ flexShrink: 0 }}
            >
              {post.category}
            </Link>
          </div>
          <Link href={`/posts/${post.slug}`} className="post-card-title-link">
            <h3 className="post-card-title post-card-title--list line-clamp-1">
              {post.title}
            </h3>
          </Link>
        </div>

        <time
          dateTime={post.date}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-xs)',
            color: 'var(--color-amber-text)',
            fontVariantNumeric: 'tabular-nums',
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}
        >
          {new Date(post.date).toLocaleDateString('zh-CN', {
            month: 'numeric',
            day: 'numeric',
          })}
        </time>
      </article>
    );
  }

  /* ── Grid variant ─────────────────────────────────────────── */
  return (
    <article
      className="card"
      style={{
        padding: 'var(--space-6)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-4)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
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
          }}
        >
          {formatDate(post.date)}
        </time>
      </div>

      <Link href={`/posts/${post.slug}`} className="post-card-title-link">
        <h3 className="post-card-title post-card-title--grid line-clamp-2">
          {post.title}
        </h3>
      </Link>

      <p
        className="line-clamp-3"
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-sm)',
          lineHeight: 'var(--leading-relaxed)',
          color: 'var(--color-text-secondary)',
          flex: 1,
        }}
      >
        {post.excerpt}
      </p>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 'var(--space-2)',
          marginTop: 'auto',
        }}
      >
        {post.tags.slice(0, 3).map(tag => (
          <Link key={tag} href={`/tags/${tagSlug(tag)}`} className="tag">
            #{tag}
          </Link>
        ))}
      </div>
    </article>
  );
};

export default PostCard;
