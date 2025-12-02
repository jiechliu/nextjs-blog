'use client';

import { useEffect, useState } from 'react';

const MouseFollower = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <>
      {/* 主光标 */}
      <div
        className={`fixed pointer-events-none z-50 transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          left: mousePosition.x - 10,
          top: mousePosition.y - 10,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div className="w-5 h-5 bg-white/30 rounded-full backdrop-blur-sm border border-white/50 animate-pulse" />
      </div>

      {/* 跟随光晕 */}
      <div
        className={`fixed pointer-events-none z-40 transition-all duration-500 ease-out ${
          isVisible ? 'opacity-60' : 'opacity-0'
        }`}
        style={{
          left: mousePosition.x - 25,
          top: mousePosition.y - 25,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-400/20 via-pink-400/20 to-blue-400/20 blur-md animate-spin-slow" />
      </div>

      {/* 外层光晕 */}
      <div
        className={`fixed pointer-events-none z-30 transition-all duration-700 ease-out ${
          isVisible ? 'opacity-40' : 'opacity-0'
        }`}
        style={{
          left: mousePosition.x - 50,
          top: mousePosition.y - 50,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div className="w-24 h-24 rounded-full bg-gradient-to-r from-indigo-400/10 via-purple-400/10 to-pink-400/10 blur-xl" />
      </div>
    </>
  );
};

export default MouseFollower;