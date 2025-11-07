'use client';

import { useEffect, useState } from 'react';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface EnhancedTableOfContentsProps {
  content: string;
}

const EnhancedTableOfContents: React.FC<EnhancedTableOfContentsProps> = ({ content }) => {
  const [toc, setToc] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [hoveredId, setHoveredId] = useState<string>('');

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

  return (
    <div className="sticky top-8">
      <div className="relative bg-white rounded-3xl border border-gray-100 shadow-lg shadow-gray-100/50 overflow-hidden">
        {/* 装饰性渐变背景 */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-indigo-50/20 to-purple-50/30"></div>
        
        {/* 头部 */}
        <div className="relative px-6 py-4 border-b border-gray-100/80">
          <div className="flex items-center space-x-3">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-red-400 rounded-full"></div>
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            </div>
            <h3 className="text-sm font-semibold text-gray-700 tracking-wide">
              📖 目录导览
            </h3>
          </div>
        </div>

        {/* 目录内容 */}
        <div className="relative max-h-[65vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          <div className="p-6 space-y-2">
            {toc.map((item, index) => {
              const isActive = activeId === item.id;
              const isHovered = hoveredId === item.id;
              
              return (
                <div key={item.id} className="relative group">
                  {/* 层级连接线 */}
                  {item.level > 1 && index > 0 && (
                    <div className="absolute left-0 top-0 w-px h-full bg-gradient-to-b from-gray-200 via-gray-200 to-transparent opacity-40"></div>
                  )}
                  
                  <button
                    onClick={() => scrollToHeading(item.id)}
                    onMouseEnter={() => setHoveredId(item.id)}
                    onMouseLeave={() => setHoveredId('')}
                    className={`relative w-full text-left px-4 py-3 rounded-2xl transition-all duration-300 transform ${
                      isActive 
                        ? 'bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 scale-[1.02] shadow-md border border-blue-200/50' 
                        : isHovered
                        ? 'bg-gray-50/80 scale-[1.01] shadow-sm'
                        : 'hover:bg-gray-50/50'
                    }`}
                    style={{
                      marginLeft: `${(item.level - 1) * 20}px`,
                    }}
                    title={item.text}
                  >
                    <div className="flex items-center space-x-3">
                      {/* 层级指示器 */}
                      <div className="relative">
                        <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          isActive 
                            ? 'bg-gradient-to-r from-blue-500 to-indigo-500 shadow-lg shadow-blue-500/40 scale-125' 
                            : isHovered
                            ? 'bg-gray-400 scale-110'
                            : 'bg-gray-300'
                        }`}></div>
                        {isActive && (
                          <div className="absolute inset-0 w-2 h-2 bg-blue-500 rounded-full animate-ping opacity-30"></div>
                        )}
                      </div>
                      
                      {/* 标题文本 */}
                      <span className={`text-sm leading-relaxed transition-all duration-300 ${
                        isActive 
                          ? 'text-blue-700 font-semibold' 
                          : item.level === 1 
                          ? 'text-gray-800 font-medium' 
                          : item.level === 2
                          ? 'text-gray-700'
                          : 'text-gray-600'
                      } ${isHovered && !isActive ? 'text-gray-900' : ''}`}>
                        {item.text}
                      </span>
                    </div>
                    
                    {/* 激活状态的右侧装饰 */}
                    {isActive && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <div className="flex space-x-1">
                          <div className="w-1 h-1 bg-blue-500 rounded-full animate-pulse"></div>
                          <div className="w-1 h-1 bg-indigo-500 rounded-full animate-pulse delay-100"></div>
                          <div className="w-1 h-1 bg-purple-500 rounded-full animate-pulse delay-200"></div>
                        </div>
                      </div>
                    )}
                  </button>
                </div>
              );
            })}
          </div>

          {/* 阅读进度区域 */}
          <div className="px-6 pb-6">
            <div className="bg-gradient-to-r from-white/80 to-gray-50/80 rounded-2xl p-4 border border-gray-100/60 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-semibold text-gray-600">阅读进度</span>
                </div>
                <span id="reading-progress" className="text-sm font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  0%
                </span>
              </div>
              
              {/* 进度条 */}
              <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-200/50 to-gray-100/50 rounded-full"></div>
                <div 
                  id="progress-bar"
                  className="absolute left-0 top-0 h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full transition-all duration-700 ease-out"
                  style={{ width: '0%' }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-full"></div>
                  <div className="absolute right-0 top-0 w-1 h-full bg-white/60 rounded-full animate-pulse"></div>
                </div>
              </div>
              
              {/* 进度点装饰 */}
              <div className="flex justify-between items-center mt-2">
                <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedTableOfContents;