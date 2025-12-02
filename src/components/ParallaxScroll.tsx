'use client';

import { useEffect, useRef } from 'react';

interface ParallaxScrollProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

const ParallaxScroll = ({ children, speed = 0.5, className = '' }: ParallaxScrollProps) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const rect = element.getBoundingClientRect();
      const elementTop = rect.top + scrolled;
      const elementHeight = rect.height;
      const windowHeight = window.innerHeight;

      // 只在元素可见时应用视差效果
      if (scrolled + windowHeight > elementTop && scrolled < elementTop + elementHeight) {
        const yPos = -(scrolled - elementTop) * speed;
        element.style.transform = `translateY(${yPos}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // 初始调用

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speed]);

  return (
    <div ref={elementRef} className={`parallax-element ${className}`}>
      {children}
    </div>
  );
};

export default ParallaxScroll;