'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { ThemeToggle } from '@/components/ui/ThemeProvider';

const NAV_LINKS = [
  { href: '/',           label: '首页'  },
  { href: '/posts',      label: '文章'  },
  { href: '/categories', label: '分类'  },
  { href: '/tags',       label: '标签'  },
  { href: '/about',      label: '关于'  },
  { href: '/ai-chat',    label: 'AI'    },
];

const Header = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 'var(--z-sticky)' as string,
        backgroundColor: 'var(--color-bg)',
        borderBottom: '1px solid var(--color-border-subtle)',
        transition: `background-color var(--duration-slow) var(--ease-in-out),
                     border-color var(--duration-slow) var(--ease-in-out)`,
      }}
    >
      <div className="container-custom">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 56,
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-3)',
              textDecoration: 'none',
            }}
          >
            {/* Wordmark mark — two stacked squares, referencing "Block" */}
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
                fontWeight: 800,
                fontSize: 'var(--text-base)',
                letterSpacing: '-0.04em',
                color: 'var(--color-text)',
              }}
            >
              BlockCoder
            </span>
          </Link>

          {/* Desktop nav */}
          <nav
            aria-label="主导航"
            style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)' }}
            className="hidden md:flex"
          >
            {NAV_LINKS.map(({ href, label }) => {
              const isActive =
                href === '/' ? pathname === '/' : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`nav-item${isActive ? ' nav-item--active' : ''}`}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Right actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <ThemeToggle />

            {/* Mobile hamburger */}
            <button
              aria-label={menuOpen ? '关闭菜单' : '打开菜单'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(v => !v)}
              className="md:hidden"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 44,
                height: 44,
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border)',
                background: 'transparent',
                color: 'var(--color-text-secondary)',
                cursor: 'pointer',
                flexShrink: 0,
              }}
            >
              {menuOpen ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            borderTop: '1px solid var(--color-border-subtle)',
            backgroundColor: 'var(--color-bg)',
            padding: 'var(--space-4) 0 var(--space-6)',
          }}
        >
          <div className="container-custom">
            <nav
              aria-label="移动端导航"
              style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}
            >
              {NAV_LINKS.map(({ href, label }) => {
                const isActive =
                  href === '/' ? pathname === '/' : pathname.startsWith(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className={`nav-item${isActive ? ' nav-item--active' : ''}`}
                    style={{ fontSize: 'var(--text-base)', padding: 'var(--space-3) var(--space-4)' }}
                  >
                    {label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
