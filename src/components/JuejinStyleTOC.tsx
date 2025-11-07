'use client';

import { useEffect, useState } from 'react';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface JuejinStyleTOCProps {
  content: string;
  maxItems?: number;
}

const JuejinStyleTOC: React.FC<JuejinStyleTOCProps> = ({ content, maxItems = 8 }) => {
  const [toc, setToc] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');


  useEffect(() => {
    // 解析 Markdown 内容中的标题
    const headingRegex = /^(#{1,6})\s+(.+)$/gm;
    const headings: TocItem[] = [];
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9\u4e00-\u9fa5\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();

      // 只显示 H1-H3 级别的标题
      if (level <= 3) {
        headings.push({
          id,
          text,
          level,
        });
      }
    }

    setToc(headings);
  }, [content]);

  useEffect(() => {
    // 监听滚动事件，高亮当前章节
    const handleScroll = () => {
      const headingElements = toc.map(item => 
        document.getElementById(item.id)
      ).filter(Boolean);

      const scrollPosition = window.scrollY + 100;

      for (let i = headingElements.length - 1; i >= 0; i--) {
        const element = headingElements[i];
        if (element && element.offsetTop <= scrollPosition) {
          setActiveId(toc[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [toc]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  };

  if (toc.length === 0) {
    return null;
  }

  const displayToc = toc; // 显示所有目录项

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden flex flex-col h-96">
      {/* 固定头部 - 不参与滚动 */}
      <div className="flex-shrink-0 px-4 py-3 border-b border-gray-100 bg-gray-50/50">
        <h3 className="text-sm font-semibold text-gray-800 flex items-center">
          <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
          目录
        </h3>
      </div>

      {/* 可滚动的目录列表 */}
      <div className="flex-1 py-2 overflow-y-auto scrollbar-hide">
        {displayToc.map((item) => {
          const isActive = activeId === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => scrollToHeading(item.id)}
              className={`w-full text-left px-4 py-2 text-sm transition-colors relative group ${
                isActive 
                  ? 'text-blue-600 bg-blue-50 border-r-2 border-blue-600' 
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
              }`}
              style={{
                paddingLeft: `${16 + (item.level - 1) * 16}px`,
              }}
              title={item.text}
            >
              {/* 层级指示点 */}
              <span className={`inline-block w-1.5 h-1.5 rounded-full mr-3 ${
                isActive ? 'bg-blue-600' : 'bg-gray-300 group-hover:bg-gray-400'
              }`}></span>
              
              {/* 标题文本 */}
              <span className={`${
                item.level === 1 ? 'font-medium' : 'font-normal'
              } ${item.text.length > 30 ? 'line-clamp-1' : ''}`}>
                {item.text.length > 30 ? `${item.text.slice(0, 30)}...` : item.text}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default JuejinStyleTOC;