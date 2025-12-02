'use client';

import { useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function AIChatPage() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'ai'; content: string }>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // 滚动聊天容器到底部（不滚动整个页面）
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setIsLoading(true);

    // 添加用户消息（不触发滚动）
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);

    // 添加一个空的AI消息，用于显示打字机效果（不触发滚动）
    const aiMessageIndex = messages.length + 1;
    setMessages(prev => [...prev, { role: 'ai', content: '' }]);

    try {
      // 使用流式请求
      const response = await fetch('/api/chat-direct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      // 处理流式响应
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error('无法获取响应流');
      }

      let accumulatedText = '';

      while (true) {
        const { done, value } = await reader.read();
        
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              
              if (data.done) {
                // 流式传输完成，滚动到底部显示完整回复
                setIsLoading(false);
                setTimeout(scrollToBottom, 100);
                break;
              }

              if (data.char) {
                accumulatedText += data.char;
                
                // 更新AI消息内容
                setMessages(prev => 
                  prev.map((msg, index) => 
                    index === aiMessageIndex 
                      ? { ...msg, content: accumulatedText }
                      : msg
                  )
                );
              }
            } catch (e) {
              // 忽略解析错误
            }
          }
        }
      }

    } catch (error) {
      console.error('AI请求失败:', error);
      setMessages(prev => 
        prev.map((msg, index) => 
          index === aiMessageIndex 
            ? { ...msg, content: `请求失败: ${error instanceof Error ? error.message : '未知错误'}` }
            : msg
        )
      );
      setTimeout(scrollToBottom, 100);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <div className="container-custom py-12">
      {/* 页面标题 - 与首页风格一致 */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 title-gradient">
          🤖 AI 智能助手
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          基于 Google Gemini 的智能对话助手，支持 Markdown 格式回复
        </p>
      </div>

      {/* 聊天容器 - 使用博客风格的卡片设计 */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          {/* 聊天消息区域 */}
          <div 
            ref={chatContainerRef}
            className="h-[60vh] overflow-y-auto p-6 bg-gray-50"
          >
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 mt-20">
                <div className="text-6xl mb-4">🤖</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  你好！我是 AI 助手
                </h3>
                <p className="text-gray-600">
                  有什么我可以帮你的吗？支持代码、解释、创作等各种问题
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] px-6 py-4 rounded-2xl ${
                        message.role === 'user'
                          ? 'bg-blue-600 text-white rounded-br-md shadow-lg'
                          : 'bg-white text-gray-800 border border-gray-200 rounded-bl-md shadow-sm'
                      }`}
                    >
                      <div className={`text-xs font-medium mb-2 ${
                        message.role === 'user' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {message.role === 'user' ? '您' : 'Gemini AI'}
                      </div>
                      <div className="leading-relaxed">
                        {message.role === 'ai' ? (
                          <div className="prose prose-gray prose-sm max-w-none">
                            <ReactMarkdown 
                              remarkPlugins={[remarkGfm]}
                              components={{
                                // 自定义代码块样式
                                code: ({ className, children, ...props }: any) => {
                                  return (
                                    <code className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm font-mono" {...props}>
                                      {children}
                                    </code>
                                  );
                                },
                                // 自定义代码块样式
                                pre: ({ children, ...props }: any) => (
                                  <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto my-4" {...props}>
                                    {children}
                                  </pre>
                                ),
                                // 自定义链接样式
                                a: ({ children, href, ...props }: any) => (
                                  <a 
                                    href={href} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-800 underline"
                                    {...props}
                                  >
                                    {children}
                                  </a>
                                ),
                                // 自定义列表样式
                                ul: ({ children, ...props }: any) => (
                                  <ul className="list-disc list-inside space-y-1 my-3" {...props}>
                                    {children}
                                  </ul>
                                ),
                                ol: ({ children, ...props }: any) => (
                                  <ol className="list-decimal list-inside space-y-1 my-3" {...props}>
                                    {children}
                                  </ol>
                                ),
                                // 自定义标题样式
                                h1: ({ children, ...props }: any) => (
                                  <h1 className="text-xl font-bold mb-3 text-gray-900" {...props}>{children}</h1>
                                ),
                                h2: ({ children, ...props }: any) => (
                                  <h2 className="text-lg font-bold mb-2 text-gray-900" {...props}>{children}</h2>
                                ),
                                h3: ({ children, ...props }: any) => (
                                  <h3 className="text-base font-bold mb-2 text-gray-900" {...props}>{children}</h3>
                                ),
                                // 自定义段落样式
                                p: ({ children, ...props }: any) => (
                                  <p className="mb-3 last:mb-0 text-gray-700" {...props}>{children}</p>
                                ),
                                // 自定义引用样式
                                blockquote: ({ children, ...props }: any) => (
                                  <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600 my-4" {...props}>
                                    {children}
                                  </blockquote>
                                ),
                              }}
                            >
                              {message.content}
                            </ReactMarkdown>
                          </div>
                        ) : (
                          <div className="whitespace-pre-wrap">{message.content}</div>
                        )}
                        {/* 如果是AI消息且正在加载，显示光标 */}
                        {message.role === 'ai' && isLoading && index === messages.length - 1 && (
                          <span className="inline-block w-2 h-5 bg-gray-400 ml-1 animate-pulse"></span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {isLoading && messages.length > 0 && messages[messages.length - 1].role === 'user' && (
              <div className="flex justify-start mt-6">
                <div className="bg-white text-gray-800 border border-gray-200 px-6 py-4 rounded-2xl rounded-bl-md shadow-sm">
                  <div className="text-xs font-medium mb-2 text-gray-500">Gemini AI</div>
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                    <span className="text-sm ml-2 text-gray-600">正在思考中...</span>
                  </div>
                </div>
              </div>
            )}
            
            {/* 用于自动滚动的引用点 */}
            <div ref={messagesEndRef} />
          </div>

          {/* 输入区域 - 使用博客风格 */}
          <div className="border-t border-gray-200 p-6 bg-white">
            <form onSubmit={handleSubmit} className="flex space-x-4">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="输入您的问题..."
                disabled={isLoading}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:bg-gray-100 transition-all"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-xl font-medium transition-all duration-200 disabled:opacity-50 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
              >
                {isLoading ? '发送中...' : '发送'}
              </button>
              <button
                type="button"
                onClick={clearChat}
                className="px-4 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-xl font-medium transition-all duration-200"
                title="清空对话"
              >
                🗑️
              </button>
            </form>
          </div>
        </div>

        {/* 使用说明 - 与博客风格一致 */}
        <div className="mt-8 p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-gray-800 font-semibold mb-3 flex items-center">
            <span className="mr-2">💡</span>
            使用说明
          </h3>
          <ul className="text-gray-600 text-sm space-y-2">
            <li className="flex items-start">
              <span className="mr-2 text-blue-500">•</span>
              支持 Markdown 格式回复，包括代码块、列表、链接等
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-blue-500">•</span>
              AI 回复采用打字机效果，逐字显示增强体验
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-blue-500">•</span>
              可以询问编程问题、技术解释、代码示例等
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-blue-500">•</span>
              点击垃圾桶图标可以清空所有对话记录
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}