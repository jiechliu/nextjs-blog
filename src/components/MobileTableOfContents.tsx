'use client';

import { useState, useEffect } from 'react';
import JuejinStyleTOC from './JuejinStyleTOC';

interface MobileTableOfContentsProps {
  content: string;
}

const MobileTableOfContents: React.FC<MobileTableOfContentsProps> = ({ content }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const article = document.querySelector('article');
      if (!article) return;

      const articleTop = article.offsetTop;
      const articleHeight = article.offsetHeight;
      const windowHeight = window.innerHeight;
      const scrollTop = window.pageYOffset;

      const progress = Math.min(
        Math.max((scrollTop - articleTop + windowHeight) / articleHeight, 0),
        1
      );

      setScrollProgress(progress * 100);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* 移动端浮动按钮组 */}
      <div className="xl:hidden fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-3">
        {/* 阅读进度环 */}
        <div className="relative">
          <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 42 42">
            {/* 背景圆环 */}
            <circle
              cx="21"
              cy="21"
              r="18"
              fill="none"
              stroke="rgba(148, 163, 184, 0.2)"
              strokeWidth="3"
            />
            {/* 进度圆环 */}
            <circle
              cx="21"
              cy="21"
              r="18"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={`${scrollProgress * 1.13} 113`}
              className="transition-all duration-300"
            />
            {/* 渐变定义 */}
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#6366F1" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-semibold text-slate-600">
              {Math.round(scrollProgress)}%
            </span>
          </div>
        </div>

        {/* 目录按钮 */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group relative bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          aria-label="打开目录"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
          <svg className="relative w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* 移动端目录弹窗 */}
      {isOpen && (
        <div className="xl:hidden fixed inset-0 z-40">
          {/* 背景遮罩 */}
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          ></div>
          
          {/* 目录面板 */}
          <div 
            className="absolute right-0 top-0 h-full w-96 max-w-[85vw] bg-white shadow-2xl transform transition-transform duration-300 ease-out"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 头部 */}
            <div className="flex items-center justify-between p-6 bg-gradient-to-r from-slate-50 to-blue-50 border-b border-slate-200">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
                <h3 className="text-lg font-semibold text-slate-800">文章目录</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl hover:bg-white/60 transition-colors"
                aria-label="关闭目录"
              >
                <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* 目录内容 */}
            <div className="h-full overflow-y-auto pb-20">
              <div className="p-4">
                <JuejinStyleTOC content={content} maxItems={10} />
              </div>
            </div>

            {/* 底部装饰 */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileTableOfContents;