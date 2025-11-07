'use client';

import { useEffect, useState } from 'react';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ content }) => {
  const [toc, setToc] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

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

      headings.push({
        id,
        text,
        level,
      });
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
    handleScroll(); // 初始调用

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

  return (
    <div className="sticky top-8">
      <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl border border-slate-200/60 shadow-sm backdrop-blur-sm">
        {/* 头部 */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200/60">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <h3 className="text-sm font-semibold text-slate-700 tracking-wide">目录导航</h3>
          </div>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 rounded-lg hover:bg-white/60 transition-colors"
            aria-label={isCollapsed ? '展开目录' : '收起目录'}
          >
            <svg 
              className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${isCollapsed ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* 目录内容 */}
        <div className={`transition-all duration-300 ease-in-out ${isCollapsed ? 'max-h-0 overflow-hidden' : 'max-h-[70vh] overflow-y-auto'}`}>
          <div className="p-4 space-y-1">
            {toc.map((item, index) => {
              const isActive = activeId === item.id;
              const levelColors = {
                1: 'text-slate-800',
                2: 'text-slate-700', 
                3: 'text-slate-600',
                4: 'text-slate-500',
                5: 'text-slate-500',
                6: 'text-slate-500'
              };
              
              return (
                <div key={item.id} className="relative">
                  {/* 连接线 */}
                  {item.level > 1 && (
                    <div 
                      className="absolute left-0 top-0 w-px bg-gradient-to-b from-slate-200 to-transparent"
                      style={{ 
                        height: '100%',
                        left: `${(item.level - 2) * 16 + 8}px` 
                      }}
                    ></div>
                  )}
                  
                  <button
                    onClick={() => scrollToHeading(item.id)}
                    className={`group relative w-full text-left p-2 rounded-xl transition-all duration-200 ${
                      isActive 
                        ? 'bg-gradient-to-r from-blue-500/10 to-indigo-500/10 shadow-sm border-l-2 border-blue-500' 
                        : 'hover:bg-white/50 hover:shadow-sm'
                    }`}
                    style={{
                      marginLeft: `${(item.level - 1) * 16}px`,
                    }}
                    title={item.text}
                  >
                    {/* 层级指示点 */}
                    <div className="flex items-center space-x-3">
                      <div className={`w-1.5 h-1.5 rounded-full transition-colors ${
                        isActive ? 'bg-blue-500' : 'bg-slate-300 group-hover:bg-slate-400'
                      }`}></div>
                      
                      <span className={`text-sm leading-relaxed transition-colors ${
                        isActive 
                          ? 'text-blue-700 font-medium' 
                          : `${levelColors[item.level as keyof typeof levelColors]} group-hover:text-slate-800`
                      }`}>
                        {item.text}
                      </span>
                    </div>
                    
                    {/* 激活状态的装饰 */}
                    {isActive && (
                      <div className="absolute right-2 top-1/2 -translate-y-1/2">
                        <div className="w-1 h-1 bg-blue-500 rounded-full animate-pulse"></div>
                      </div>
                    )}
                  </button>
                </div>
              );
            })}
          </div>

          {/* 阅读进度 */}
          <div className="px-4 pb-4">
            <div className="bg-white/60 rounded-xl p-3 border border-slate-200/40">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-slate-600">阅读进度</span>
                <span id="reading-progress" className="text-xs font-semibold text-blue-600">0%</span>
              </div>
              <div className="relative h-2 bg-slate-200/60 rounded-full overflow-hidden">
                <div 
                  id="progress-bar"
                  className="absolute left-0 top-0 h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500 ease-out"
                  style={{ width: '0%' }}
                >
                  <div className="absolute right-0 top-0 w-2 h-full bg-white/30 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableOfContents;