import Link from 'next/link';
import { getAllCategories, getAllTags, getRecentPosts } from '@/lib/blog';

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="sidebar-section-label">{children}</p>
);

const Sidebar = () => {
  const categories = getAllCategories();
  const tags = getAllTags();
  const recentPosts = getRecentPosts(5);

  return (
    <aside style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-12)' }}>

      {/* Author */}
      <div>
        <div
          style={{
            marginBottom: 'var(--space-4)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-3)',
          }}
        >
          <span
            aria-hidden="true"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 3,
              width: 36,
              height: 36,
              flexShrink: 0,
            }}
          >
            {[0,1,2,3].map(i => (
              <span
                key={i}
                style={{
                  backgroundColor: i === 0
                    ? 'var(--color-accent)'
                    : i === 1
                    ? 'var(--color-amber)'
                    : 'var(--color-bg-subtle)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 3,
                }}
              />
            ))}
          </span>
          <div>
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 'var(--text-sm)',
                color: 'var(--color-text)',
                letterSpacing: '-0.01em',
              }}
            >
              JieCheng
            </p>
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-xs)',
                color: 'var(--color-text-tertiary)',
              }}
            >
              方块世界的代码师
            </p>
          </div>
        </div>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-sm)',
            lineHeight: 'var(--leading-relaxed)',
            color: 'var(--color-text-secondary)',
          }}
        >
          专注于分享前端开发、全栈技术和编程实践。
        </p>
      </div>

      {/* Recent Posts */}
      {recentPosts.length > 0 && (
        <div>
          <SectionLabel>最新文章</SectionLabel>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {recentPosts.map((post, i) => (
              <div
                key={post.slug}
                style={{
                  padding: 'var(--space-3) 0',
                  borderBottom:
                    i < recentPosts.length - 1
                      ? '1px solid var(--color-border-subtle)'
                      : 'none',
                }}
              >
                <Link
                  href={`/posts/${post.slug}`}
                  className="sidebar-post-link line-clamp-2"
                >
                  {post.title}
                </Link>
                <time
                  dateTime={post.date}
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--color-text-tertiary)',
                    fontVariantNumeric: 'tabular-nums',
                    display: 'block',
                    marginTop: 'var(--space-1)',
                  }}
                >
                  {new Date(post.date).toLocaleDateString('zh-CN', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </time>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Categories */}
      {categories.length > 0 && (
        <div>
          <SectionLabel>分类</SectionLabel>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {categories.map(category => (
              <Link
                key={category.slug}
                href={`/categories/${category.slug}`}
                className="sidebar-category-link"
              >
                <span>{category.name}</span>
                <span className="sidebar-category-count">{category.count}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Tags */}
      {tags.length > 0 && (
        <div>
          <SectionLabel>标签</SectionLabel>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
            {tags.slice(0, 20).map((tag, i) => (
              <Link
                key={tag.slug}
                href={`/tags/${tag.slug}`}
                className={`tag${i % 2 === 1 ? ' tag-alt' : ''}`}
              >
                #{tag.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
