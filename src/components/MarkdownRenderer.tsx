'use client';

import ReactMarkdown from 'react-markdown';
import { ReactNode } from 'react';

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  // 生成标题 ID 的函数
  const generateId = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\u4e00-\u9fa5\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  return (
    <div className="prose prose-lg max-w-none">
      <ReactMarkdown
        components={{
          h1: ({ children, ...props }) => {
            const text = toString(children);
            const id = generateId(text);
            return (
              <h1 id={id} className="scroll-mt-20" {...props}>
                {children}
              </h1>
            );
          },
          h2: ({ children, ...props }) => {
            const text = toString(children);
            const id = generateId(text);
            return (
              <h2 id={id} className="scroll-mt-20" {...props}>
                {children}
              </h2>
            );
          },
          h3: ({ children, ...props }) => {
            const text = toString(children);
            const id = generateId(text);
            return (
              <h3 id={id} className="scroll-mt-20" {...props}>
                {children}
              </h3>
            );
          },
          h4: ({ children, ...props }) => {
            const text = toString(children);
            const id = generateId(text);
            return (
              <h4 id={id} className="scroll-mt-20" {...props}>
                {children}
              </h4>
            );
          },
          h5: ({ children, ...props }) => {
            const text = toString(children);
            const id = generateId(text);
            return (
              <h5 id={id} className="scroll-mt-20" {...props}>
                {children}
              </h5>
            );
          },
          h6: ({ children, ...props }) => {
            const text = toString(children);
            const id = generateId(text);
            return (
              <h6 id={id} className="scroll-mt-20" {...props}>
                {children}
              </h6>
            );
          },
          // 自定义代码块样式
          code: ({ node, inline, className, children, ...props }: any) => {
            const match = /language-(\w+)/.exec(className || '');
            return !inline ? (
              <div className="relative">
                {match && (
                  <div className="absolute top-0 right-0 bg-gray-700 text-gray-300 px-3 py-1 text-sm rounded-bl-md">
                    {match[1]}
                  </div>
                )}
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                  <code className={className} {...props}>
                    {children}
                  </code>
                </pre>
              </div>
            ) : (
              <code className="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded text-sm" {...props}>
                {children}
              </code>
            );
          },
          // 自定义引用块样式
          blockquote: ({ children, ...props }) => (
            <blockquote className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-50 italic text-gray-700" {...props}>
              {children}
            </blockquote>
          ),
          // 自定义链接样式
          a: ({ children, href, ...props }) => (
            <a 
              href={href} 
              className="text-blue-600 hover:text-blue-800 underline decoration-blue-300 hover:decoration-blue-500 transition-colors"
              target={href?.startsWith('http') ? '_blank' : undefined}
              rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
              {...props}
            >
              {children}
            </a>
          ),
          // 自定义表格样式
          table: ({ children, ...props }) => (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200" {...props}>
                {children}
              </table>
            </div>
          ),
          thead: ({ children, ...props }) => (
            <thead className="bg-gray-50" {...props}>
              {children}
            </thead>
          ),
          th: ({ children, ...props }) => (
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" {...props}>
              {children}
            </th>
          ),
          td: ({ children, ...props }) => (
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900" {...props}>
              {children}
            </td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

// 辅助函数：将 ReactNode 转换为字符串
function toString(node: ReactNode): string {
  if (typeof node === 'string') return node;
  if (typeof node === 'number') return node.toString();
  if (Array.isArray(node)) return node.map(toString).join('');
  if (node && typeof node === 'object' && 'props' in node) {
    return toString(node.props.children);
  }
  return '';
}

export default MarkdownRenderer;