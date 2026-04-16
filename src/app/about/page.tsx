export const metadata = {
  title: '关于 — BlockCoder',
  description: '关于 BlockCoder 技术博客',
};

const STACK = [
  { name: 'Next.js 14', desc: 'React 全栈框架，App Router' },
  { name: 'TypeScript', desc: '类型安全的 JavaScript' },
  { name: 'Tailwind CSS', desc: '原子化 CSS 框架' },
  { name: 'React Markdown', desc: 'Markdown 渲染' },
  { name: 'Gray Matter', desc: 'Frontmatter 解析' },
  { name: 'Lexend + Noto Serif SC', desc: '字体排版' },
];

const TOPICS = [
  { label: '前端技术', desc: 'React、Next.js 等现代框架' },
  { label: '全栈开发', desc: '从前端到后端的完整技术栈' },
  { label: '实战教程', desc: '真实项目案例和解决方案' },
  { label: '最佳实践', desc: '代码规范与架构设计' },
  { label: '工具推荐', desc: '提升开发效率的工具与技巧' },
];

export default function AboutPage() {
  return (
    <div className="container-custom" style={{ paddingBlock: 'var(--space-12)' }}>
      {/* Page header */}
      <div style={{
        paddingBottom: 'var(--space-12)',
        marginBottom: 'var(--space-16)',
        borderBottom: '2px solid var(--color-accent)',
      }}>
        <p className="section-eyebrow" style={{ marginBottom: 'var(--space-4)' }}>作者</p>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2rem, 6vw, 3.5rem)',
          fontWeight: 800,
          letterSpacing: '-0.04em',
          lineHeight: 1.0,
          color: 'var(--color-text)',
          marginBottom: 'var(--space-6)',
        }}>
          关于 BlockCoder
        </h1>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-xl)',
          lineHeight: 'var(--leading-relaxed)',
          color: 'var(--color-text-secondary)',
          maxWidth: '52ch',
        }}>
          方块世界的代码师——专注于技术分享和学习交流的个人博客。
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 'var(--space-16)',
        maxWidth: '860px',
      }}>
        {/* Left column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-12)' }}>
          {/* Mission */}
          <section>
            <p className="section-eyebrow" style={{ marginBottom: 'var(--space-6)' }}>写作初衷</p>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-base)',
              lineHeight: 'var(--leading-relaxed)',
              color: 'var(--color-text-secondary)',
              maxWidth: '52ch',
            }}>
              用写作强迫自己把模糊的理解变成清晰的表达。每篇文章都是一次重新整理知识的机会——
              写完后通常比写前更理解那个概念。如果这个过程恰好对别人有用，那就更好了。
            </p>
          </section>

          {/* Topics */}
          <section>
            <p className="section-eyebrow" style={{ marginBottom: 'var(--space-6)' }}>内容方向</p>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {TOPICS.map((t, i) => (
                <div key={t.label} style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 'var(--space-4)',
                  padding: 'var(--space-4) 0',
                  borderBottom: i < TOPICS.length - 1 ? '1px solid var(--color-border-subtle)' : 'none',
                  alignItems: 'baseline',
                }}>
                  <span style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 600,
                    color: 'var(--color-text)',
                  }}>
                    {t.label}
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--color-text-tertiary)',
                  }}>
                    {t.desc}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-12)' }}>
          {/* Stack */}
          <section>
            <p className="section-eyebrow" style={{ marginBottom: 'var(--space-6)' }}>本站技术栈</p>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {STACK.map((s, i) => (
                <div key={s.name} style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 'var(--space-4)',
                  padding: 'var(--space-4) 0',
                  borderBottom: i < STACK.length - 1 ? '1px solid var(--color-border-subtle)' : 'none',
                  alignItems: 'baseline',
                }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 600,
                    color: 'var(--color-accent-text)',
                  }}>
                    {s.name}
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--color-text-tertiary)',
                  }}>
                    {s.desc}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Contact */}
          <section>
            <p className="section-eyebrow" style={{ marginBottom: 'var(--space-6)' }}>联系</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              <a
                href="mailto:1801256646ljc@gmail.com"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-accent-text)',
                  textDecoration: 'none',
                  transition: 'color var(--duration-fast) var(--ease-out-quart)',
                }}
                className="footer-nav-link"
              >
                1801256646ljc@gmail.com
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
