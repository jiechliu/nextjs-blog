'use client';

import { useState } from 'react';
import JuejinStyleTOC from './JuejinStyleTOC';

interface SimpleMobileTOCProps {
  content: string;
}

const SimpleMobileTOC: React.FC<SimpleMobileTOCProps> = ({ content }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* 移动端浮动按钮 */}
      <div className="xl:hidden fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
          aria-label="打开目录"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* 移动端目录弹窗 */}
      {isOpen && (
        <div className="xl:hidden fixed inset-0 z-40">
          <div 
            className="absolute inset-0 bg-black/40"
            onClick={() => setIsOpen(false)}
          ></div>
          
          <div 
            className="absolute right-4 top-4 bottom-4 w-80 max-w-[calc(100vw-2rem)] bg-white rounded-lg shadow-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">文章目录</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="关闭目录"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="h-full overflow-y-auto pb-20">
              <JuejinStyleTOC content={content} maxItems={15} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SimpleMobileTOC;