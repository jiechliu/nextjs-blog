import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ClientWrapper from '@/components/ClientWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BlockCoder - 方块世界的代码师',
  description: '个人技术博客，专注于前端开发、全栈技术和编程实践分享。深入探讨 React、Next.js、TypeScript、Node.js 等现代 Web 技术栈，分享项目实战经验、最佳实践和技术心得。从基础概念到高级应用，从代码优化到架构设计，致力于为开发者提供有价值的技术内容和学习资源。',
  keywords: 'BlockCoder, 技术博客, 前端开发, React, Next.js, TypeScript, JavaScript, Node.js, 全栈开发, Web开发, 编程教程, 代码实践, 技术分享, 开发经验, 项目实战, 编程心得, CSS, HTML, 代码高亮, Hooks, 表格, Table, 类型安全',
  publisher: 'BlockCoder',
  robots: 'index, follow',
  viewport: 'width=device-width, initial-scale=1',
  openGraph: {
    title: 'BlockCoder - 方块世界的代码师',
    description: '专注于前端开发、全栈技术和编程实践的个人技术博客。分享 React、Next.js、TypeScript 等现代 Web 技术的深度内容，提供项目实战经验和最佳实践指南。',
    type: 'website',
    locale: 'zh_CN',
    siteName: 'BlockCoder',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BlockCoder - 方块世界的代码师',
    description: '个人技术博客，分享前端开发、全栈技术和编程实践经验',
    creator: '@blockcoder_dev',
  },
  alternates: {
    canonical: 'https://blockcoder.dev',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        <ClientWrapper>
          <Header />
          <main className="min-h-screen relative z-10">
            {children}
          </main>
          <Footer />
        </ClientWrapper>
      </body>
    </html>
  );
}