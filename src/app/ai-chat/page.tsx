'use client';

import { useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type Message = { role: 'user' | 'ai'; content: string };

export default function AIChatPage() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  const scrollDown = () => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setIsLoading(true);

    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    const aiIdx = messages.length + 1;
    setMessages(prev => [...prev, { role: 'ai', content: '' }]);

    try {
      const res = await fetch('/api/chat-direct', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      if (!reader) throw new Error('无法获取响应流');

      let text = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        for (const line of decoder.decode(value).split('\n')) {
          if (!line.startsWith('data: ')) continue;
          try {
            const data = JSON.parse(line.slice(6));
            if (data.done) { setIsLoading(false); setTimeout(scrollDown, 100); break; }
            if (data.char) {
              text += data.char;
              setMessages(prev => prev.map((m, i) => i === aiIdx ? { ...m, content: text } : m));
            }
          } catch { /* ignore parse errors */ }
        }
      }
    } catch (err) {
      setMessages(prev => prev.map((m, i) =>
        i === aiIdx ? { ...m, content: `请求失败：${err instanceof Error ? err.message : '未知错误'}` } : m
      ));
      setTimeout(scrollDown, 100);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container-custom" style={{ paddingBlock: 'var(--space-12)' }}>
      {/* Page header */}
      <div style={{
        paddingBottom: 'var(--space-12)',
        marginBottom: 'var(--space-12)',
        borderBottom: '2px solid var(--color-accent)',
      }}>
        <p className="section-eyebrow" style={{ marginBottom: 'var(--space-4)' }}>实验功能</p>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2rem, 6vw, 3.5rem)',
          fontWeight: 800,
          letterSpacing: '-0.04em',
          lineHeight: 1.0,
          color: 'var(--color-text)',
          marginBottom: 'var(--space-4)',
        }}>
          AI 助手
        </h1>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-base)',
          color: 'var(--color-text-secondary)',
        }}>
          基于 Google Gemini，支持 Markdown 格式回复
        </p>
      </div>

      {/* Chat container */}
      <div style={{ maxWidth: 800, marginInline: 'auto' }}>
        <div style={{
          backgroundColor: 'var(--color-bg-elevated)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-xl)',
          overflow: 'hidden',
        }}>
          {/* Messages */}
          <div
            ref={chatRef}
            style={{
              height: '60vh',
              overflowY: 'auto',
              padding: 'var(--space-6)',
              backgroundColor: 'var(--color-bg-subtle)',
              scrollbarWidth: 'thin',
            }}
          >
            {messages.length === 0 ? (
              <div style={{ textAlign: 'center', paddingTop: 'var(--space-16)' }}>
                {/* Brand mark */}
                <span aria-hidden="true" style={{
                  display: 'inline-grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 4,
                  width: 40,
                  height: 40,
                  marginBottom: 'var(--space-6)',
                }}>
                  {[0,1,2,3].map(i => (
                    <span key={i} style={{
                      backgroundColor: i === 0 ? 'var(--color-accent)' : i === 1 ? 'var(--color-amber)' : i === 2 ? 'var(--color-green)' : 'var(--color-border-strong)',
                      borderRadius: 4,
                    }} />
                  ))}
                </span>
                <p style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-base)',
                  fontWeight: 600,
                  color: 'var(--color-text)',
                  marginBottom: 'var(--space-2)',
                }}>
                  你好，我是 AI 助手
                </p>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-text-tertiary)',
                }}>
                  有什么可以帮你的？支持代码、解释、创作等各种问题
                </p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                    }}
                  >
                    <div style={{
                      maxWidth: '85%',
                      padding: 'var(--space-4) var(--space-6)',
                      borderRadius: msg.role === 'user'
                        ? 'var(--radius-xl) var(--radius-xl) var(--radius-sm) var(--radius-xl)'
                        : 'var(--radius-xl) var(--radius-xl) var(--radius-xl) var(--radius-sm)',
                      backgroundColor: msg.role === 'user'
                        ? 'var(--color-accent)'
                        : 'var(--color-bg-elevated)',
                      border: msg.role === 'user'
                        ? 'none'
                        : '1px solid var(--color-border)',
                      boxShadow: 'var(--shadow-sm)',
                    }}>
                      <p style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'var(--text-xs)',
                        fontWeight: 600,
                        marginBottom: 'var(--space-2)',
                        color: msg.role === 'user' ? 'rgba(255,255,255,0.7)' : 'var(--color-text-tertiary)',
                      }}>
                        {msg.role === 'user' ? '你' : 'Gemini'}
                      </p>
                      {msg.role === 'ai' ? (
                        <div className="prose-bc" style={{ fontSize: 'var(--text-sm)' }}>
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {msg.content}
                          </ReactMarkdown>
                          {isLoading && i === messages.length - 1 && (
                            <span style={{
                              display: 'inline-block',
                              width: 8,
                              height: 16,
                              backgroundColor: 'var(--color-text-tertiary)',
                              marginLeft: 2,
                              animation: 'chat-cursor 1s step-end infinite',
                              verticalAlign: 'text-bottom',
                              borderRadius: 1,
                            }} />
                          )}
                        </div>
                      ) : (
                        <p style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--text-sm)',
                          color: 'var(--color-text-inverse)',
                          whiteSpace: 'pre-wrap',
                          lineHeight: 'var(--leading-relaxed)',
                        }}>
                          {msg.content}
                        </p>
                      )}
                    </div>
                  </div>
                ))}

                {/* Typing indicator */}
                {isLoading && messages.at(-1)?.role === 'user' && (
                  <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <div style={{
                      padding: 'var(--space-4) var(--space-6)',
                      borderRadius: 'var(--radius-xl) var(--radius-xl) var(--radius-xl) var(--radius-sm)',
                      backgroundColor: 'var(--color-bg-elevated)',
                      border: '1px solid var(--color-border)',
                    }}>
                      <p style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'var(--text-xs)',
                        color: 'var(--color-text-tertiary)',
                        marginBottom: 'var(--space-2)',
                      }}>
                        Gemini
                      </p>
                      <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                        {[0,1,2].map(i => (
                          <span key={i} style={{
                            width: 6,
                            height: 6,
                            borderRadius: '50%',
                            backgroundColor: 'var(--color-text-tertiary)',
                            animation: `chat-dot 1.2s ${i * 0.2}s ease-in-out infinite`,
                            display: 'inline-block',
                          }} />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Input */}
          <div style={{
            borderTop: '1px solid var(--color-border)',
            padding: 'var(--space-4) var(--space-6)',
            backgroundColor: 'var(--color-bg-elevated)',
          }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 'var(--space-3)' }}>
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="输入问题..."
                disabled={isLoading}
                style={{
                  flex: 1,
                  padding: 'var(--space-3) var(--space-4)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-sm)',
                  backgroundColor: 'var(--color-bg)',
                  color: 'var(--color-text)',
                  outline: 'none',
                  transition: 'border-color var(--duration-fast) var(--ease-out-quart)',
                }}
                onFocus={e => (e.target.style.borderColor = 'var(--color-accent)')}
                onBlur={e => (e.target.style.borderColor = 'var(--color-border)')}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="btn-primary"
                style={{ flexShrink: 0 }}
              >
                {isLoading ? '发送中' : '发送'}
              </button>
              <button
                type="button"
                onClick={() => setMessages([])}
                className="btn-secondary"
                style={{ flexShrink: 0, minWidth: 44 }}
                aria-label="清空对话"
                title="清空对话"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                  <path d="M10 11v6" />
                  <path d="M14 11v6" />
                  <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                </svg>
              </button>
            </form>
          </div>
        </div>

        {/* Tips */}
        <div style={{
          marginTop: 'var(--space-8)',
          padding: 'var(--space-6)',
          backgroundColor: 'var(--color-bg-elevated)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-lg)',
        }}>
          <p className="section-eyebrow" style={{ marginBottom: 'var(--space-4)' }}>使用说明</p>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', listStyle: 'none', padding: 0 }}>
            {[
              '支持 Markdown 格式回复，包括代码块、列表、链接等',
              '回复采用流式显示，逐字输出',
              '可以询问编程问题、技术解释、代码示例等',
              '点击垃圾桶图标清空所有对话记录',
            ].map(tip => (
              <li key={tip} style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-xs)',
                color: 'var(--color-text-secondary)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: 'var(--space-2)',
              }}>
                <span style={{ color: 'var(--color-accent)', flexShrink: 0, marginTop: 2 }}>–</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <style>{`
        @keyframes chat-cursor {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes chat-dot {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50% { transform: translateY(-4px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
