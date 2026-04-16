'use client';

import { useEffect, useState, useRef } from 'react';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface ArticleTOCProps {
  content: string;
}

function parseToc(content: string): TocItem[] {
  const headingRegex = /^(#{1,3})\s+(.+)$/gm;
  const items: TocItem[] = [];
  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    // Strip markdown formatting AND emoji from display text
    const raw = match[2].trim();
    const text = raw
      .replace(/\*\*/g, '')
      .replace(/`/g, '')
      // Remove emoji via surrogate pairs and common symbol ranges (no /u flag needed)
      .replace(/[\uD800-\uDFFF]|[\u2600-\u27BF]/g, '')
      .trim();
    const id = raw
      .toLowerCase()
      .replace(/[^a-z0-9\u4e00-\u9fa5\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
    if (text) items.push({ id, text, level });
  }
  return items;
}

const ArticleTOC: React.FC<ArticleTOCProps> = ({ content }) => {
  const [toc] = useState<TocItem[]>(() => parseToc(content));
  const [activeId, setActiveId] = useState('');
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (toc.length === 0) return;

    observerRef.current = new IntersectionObserver(
      entries => {
        // Find the topmost visible heading
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-10% 0px -80% 0px', threshold: 0 }
    );

    toc.forEach(item => {
      const el = document.getElementById(item.id);
      if (el) observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, [toc]);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  if (toc.length === 0) return null;

  return (
    <nav aria-label="文章目录">
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
              backgroundColor: i === 0 ? 'var(--color-accent)'
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
          目录
        </span>
      </div>

      {/* Items */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {toc.map(item => {
          const isActive = activeId === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleClick(item.id)}
              title={item.text}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-xs)',
                fontWeight: isActive ? 600 : 400,
                lineHeight: 1.4,
                color: isActive ? 'var(--color-accent-text)' : 'var(--color-text-secondary)',
                paddingBlock: 'var(--space-2)',
                paddingLeft: `${(item.level - 1) * 14}px`,
                paddingRight: 0,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                transition: 'color var(--duration-fast) var(--ease-out-quart)',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {item.text}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default ArticleTOC;
