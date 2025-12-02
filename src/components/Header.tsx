'use client';

import Link from 'next/link';
import { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/30 border-b border-white/30 shadow-lg">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 relative">
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-400 to-purple-500 group-hover:scale-110 transition-transform duration-300"></div>
              <div className="absolute inset-1 rounded-md bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <span className="text-white text-sm font-bold">BC</span>
              </div>
            </div>
            <div className="text-xl font-bold text-gray-800 group-hover:title-gradient transition-all duration-300">
              BlockCoder
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link href="/" className="nav-link px-4 py-2 rounded-lg hover:bg-white/20 transition-all duration-300">
              🏠 首页
            </Link>
            <Link href="/posts" className="nav-link px-4 py-2 rounded-lg hover:bg-white/20 transition-all duration-300">
              📚 文章
            </Link>
            <Link href="/categories" className="nav-link px-4 py-2 rounded-lg hover:bg-white/20 transition-all duration-300">
              📁 分类
            </Link>
            <Link href="/tags" className="nav-link px-4 py-2 rounded-lg hover:bg-white/20 transition-all duration-300">
              🏷️ 标签
            </Link>
            <Link href="/about" className="nav-link px-4 py-2 rounded-lg hover:bg-white/20 transition-all duration-300">
              👨‍💻 关于
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-white/20 transition-all duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/30 bg-white/20 backdrop-blur-sm rounded-b-lg">
            <nav className="flex flex-col space-y-2">
              <Link 
                href="/" 
                className="nav-link px-4 py-3 rounded-lg hover:bg-white/20 transition-all duration-300" 
                onClick={() => setIsMenuOpen(false)}
              >
                🏠 首页
              </Link>
              <Link 
                href="/posts" 
                className="nav-link px-4 py-3 rounded-lg hover:bg-white/20 transition-all duration-300" 
                onClick={() => setIsMenuOpen(false)}
              >
                📚 文章
              </Link>
              <Link 
                href="/categories" 
                className="nav-link px-4 py-3 rounded-lg hover:bg-white/20 transition-all duration-300" 
                onClick={() => setIsMenuOpen(false)}
              >
                📁 分类
              </Link>
              <Link 
                href="/tags" 
                className="nav-link px-4 py-3 rounded-lg hover:bg-white/20 transition-all duration-300" 
                onClick={() => setIsMenuOpen(false)}
              >
                🏷️ 标签
              </Link>
              <Link 
                href="/about" 
                className="nav-link px-4 py-3 rounded-lg hover:bg-white/20 transition-all duration-300" 
                onClick={() => setIsMenuOpen(false)}
              >
                👨‍💻 关于
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;