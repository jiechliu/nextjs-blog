'use client';

import { useEffect } from 'react';

const ReadingProgress: React.FC = () => {
  useEffect(() => {
    const updateProgress = () => {
      const article = document.querySelector('article');
      const progressBar = document.getElementById('progress-bar');
      const progressText = document.getElementById('reading-progress');
      
      if (!article || !progressBar || !progressText) return;

      const articleTop = article.offsetTop;
      const articleHeight = article.offsetHeight;
      const windowHeight = window.innerHeight;
      const scrollTop = window.pageYOffset;

      // 计算阅读进度
      const progress = Math.min(
        Math.max((scrollTop - articleTop + windowHeight) / articleHeight, 0),
        1
      );

      const percentage = Math.round(progress * 100);
      
      progressBar.style.width = `${percentage}%`;
      progressText.textContent = `${percentage}%`;
    };

    window.addEventListener('scroll', updateProgress);
    window.addEventListener('resize', updateProgress);
    
    // 初始调用
    updateProgress();

    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  return null;
};

export default ReadingProgress;