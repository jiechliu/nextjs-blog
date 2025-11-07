import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BlogSpace - 技术博客分享平台',
  description: '专注于前端开发、全栈技术和编程实践的技术博客平台',
  keywords: '技术博客, 前端开发, React, Next.js, TypeScript, 编程教程',
  authors: [{ name: 'BlogSpace Team' }],
  openGraph: {
    title: 'BlogSpace - 技术博客分享平台',
    description: '专注于前端开发、全栈技术和编程实践的技术博客平台',
    type: 'website',
    locale: 'zh_CN',
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
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}