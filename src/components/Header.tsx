'use client';

import Link from 'next/link';
import { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-blue-600">
              JieCheng.Dev
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="nav-link">
              首页
            </Link>
            <Link href="/posts" className="nav-link">
              文章
            </Link>
            <Link href="/categories" className="nav-link">
              分类
            </Link>
            <Link href="/tags" className="nav-link">
              标签
            </Link>
            <Link href="/about" className="nav-link">
              关于
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden px-2 py-1"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                首页
              </Link>
              <Link href="/posts" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                文章
              </Link>
              <Link href="/categories" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                分类
              </Link>
              <Link href="/tags" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                标签
              </Link>
              <Link href="/about" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                关于
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;