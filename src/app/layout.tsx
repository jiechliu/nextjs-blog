import type { Metadata } from 'next';
import { Lexend, Noto_Serif_SC } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/components/ui/ThemeProvider';

/**
 * Display / UI font: Lexend
 * Rationale: designed for reading proficiency, tight letter-spacing,
 * geometric but not cold — fits "calm, precise, professional" brief.
 * Not in the banned list, not a common "tech blog" reflex pick.
 */
const lexend = Lexend({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-lexend',
  display: 'swap',
});

/**
 * Chinese body serif: Noto Serif SC
 * Gives rhythm and readability to long-form Chinese text,
 * unlike every sans-serif tech blog out there.
 */
const notoSerifSC = Noto_Serif_SC({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-noto-serif-sc',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'BlockCoder — 方块世界的代码师',
  description:
    '个人技术博客，专注于前端开发、全栈技术和编程实践分享。深入探讨 React、Next.js、TypeScript、Node.js 等现代 Web 技术栈。',
  keywords:
    'BlockCoder, 技术博客, 前端开发, React, Next.js, TypeScript, JavaScript, Node.js',
  publisher: 'BlockCoder',
  robots: 'index, follow',
  openGraph: {
    title: 'BlockCoder — 方块世界的代码师',
    description:
      '专注于前端开发、全栈技术和编程实践的个人技术博客。',
    type: 'website',
    locale: 'zh_CN',
    siteName: 'BlockCoder',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BlockCoder — 方块世界的代码师',
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
    <html
      lang="zh-CN"
      className={`${lexend.variable} ${notoSerifSC.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Inline script to set theme before paint — prevents flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var t = localStorage.getItem('bc-theme');
                  var r = t === 'dark' ? 'dark'
                        : t === 'light' ? 'light'
                        : window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  document.documentElement.setAttribute('data-theme', r);
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
