import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';
import PostCard from '@/components/PostCard';

export const metadata = {
  title: '所有文章 — BlockCoder',
  description: '浏览所有技术文章和教程',
};

export default function PostsPage() {
  const posts = getAllPosts();

  return (
    <div className="container-custom" style={{ paddingBlock: 'var(--space-12)' }}>
      {/* Page header */}
      <div style={{
        paddingBottom: 'var(--space-12)',
        marginBottom: 'var(--space-12)',
        borderBottom: '2px solid var(--color-accent)',
      }}>
        <p className="section-eyebrow" style={{ marginBottom: 'var(--space-4)' }}>文章归档</p>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2rem, 6vw, 3.5rem)',
          fontWeight: 800,
          letterSpacing: '-0.04em',
          lineHeight: 1.0,
          color: 'var(--color-text)',
          marginBottom: 'var(--space-4)',
        }}>
          所有文章
        </h1>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-base)',
          color: 'var(--color-text-secondary)',
        }}>
          共 {posts.length} 篇，涵盖前端开发、全栈技术和编程实践
        </p>
      </div>

      {posts.length > 0 ? (
        <div>
          {posts.map(post => (
            <PostCard key={post.slug} post={post} variant="list" />
          ))}
        </div>
      ) : (
        <div style={{ paddingBlock: 'var(--space-16)', textAlign: 'center' }}>
          <p style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-sm)',
            color: 'var(--color-text-tertiary)',
          }}>
            还没有文章。在{' '}
            <code style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.9em',
              backgroundColor: 'var(--color-bg-inset)',
              padding: '2px 6px',
              borderRadius: 'var(--radius-sm)',
            }}>
              posts/
            </code>{' '}
            目录创建你的第一篇 Markdown 文章吧。
          </p>
        </div>
      )}
    </div>
  );
}
