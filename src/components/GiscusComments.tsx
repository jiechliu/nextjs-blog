'use client';

import { useEffect, useRef } from 'react';

interface GiscusCommentsProps {
  slug: string;
  theme?: 'light' | 'dark' | 'preferred_color_scheme';
}

const GiscusComments: React.FC<GiscusCommentsProps> = ({ slug, theme = 'preferred_color_scheme' }) => {
  const commentsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 清除之前的评论组件
    if (commentsRef.current) {
      commentsRef.current.innerHTML = '';
    }

    // 创建 Giscus 脚本
    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', 'jiechliu/nextjs-blog');
    script.setAttribute('data-repo-id', 'R_kgDOQQ5b1g');
    script.setAttribute('data-category', 'General');
    script.setAttribute('data-category-id', 'DIC_kwDOQQ5b1s4CxiDC');
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'bottom');
    script.setAttribute('data-theme', theme);
    script.setAttribute('data-lang', 'zh-CN');
    script.crossOrigin = 'anonymous';
    script.async = true;

    if (commentsRef.current) {
      commentsRef.current.appendChild(script);
    }

    return () => {
      // 清理函数
      if (commentsRef.current) {
        commentsRef.current.innerHTML = '';
      }
    };
  }, [slug, theme]);

  return (
    <div className="mt-12">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          评论讨论
        </h3>
        <div className="text-sm text-gray-600 mb-4">
          使用 GitHub 账号登录即可参与讨论
        </div>
        <div ref={commentsRef} />
      </div>
    </div>
  );
};

export default GiscusComments;