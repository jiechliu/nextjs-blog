import Link from 'next/link';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        marginTop: 'var(--space-24)',
        borderTop: '1px solid var(--color-border)',
        backgroundColor: 'var(--color-bg)',
      }}
    >
      <div className="container-custom">
        <div
          className="footer-grid"
          style={{
            paddingBlock: 'var(--space-12)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 'var(--space-12)',
          }}
        >
          {/* Brand */}
          <div className="footer-brand-col" style={{ gridColumn: 'span 2' }}>
            <Link href="/" className="footer-brand-link">
              <span
                aria-hidden="true"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 2,
                  width: 18,
                  height: 18,
                  flexShrink: 0,
                }}
              >
                {[0,1,2,3].map(i => (
                  <span
                    key={i}
                    style={{
                      backgroundColor: i === 0
                        ? 'var(--color-accent)'
                        : i === 3
                        ? 'var(--color-amber)'
                        : 'var(--color-border-strong)',
                      borderRadius: 2,
                    }}
                  />
                ))}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: 'var(--text-base)',
                  letterSpacing: '-0.03em',
                  color: 'var(--color-text)',
                }}
              >
                BlockCoder
              </span>
            </Link>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-sm)',
                lineHeight: 'var(--leading-relaxed)',
                color: 'var(--color-text-secondary)',
                maxWidth: '38ch',
                marginTop: 'var(--space-4)',
              }}
            >
              方块世界的代码师。记录与分享前端开发、全栈技术和编程实践的个人博客。
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="footer-section-label">导航</p>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', listStyle: 'none', padding: 0 }}>
              {[
                { href: '/posts',      label: '所有文章' },
                { href: '/categories', label: '文章分类' },
                { href: '/tags',       label: '标签云'   },
                { href: '/about',      label: '关于'     },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="footer-nav-link">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="footer-section-label">联系</p>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', listStyle: 'none', padding: 0 }}>
              <li>
                <a href="mailto:1801256646ljc@gmail.com" className="footer-nav-link">
                  1801256646ljc@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid var(--color-border-subtle)',
            paddingBlock: 'var(--space-6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 'var(--space-3)',
          }}
        >
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xs)', color: 'var(--color-text-tertiary)' }}>
            © {year} BlockCoder. All rights reserved.
          </p>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xs)', color: 'var(--color-text-tertiary)' }}>
            Built with Next.js &amp; TypeScript
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
