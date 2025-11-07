'use client';

import { ReactNode } from 'react';

interface StickySidebarProps {
  children: ReactNode;
}

const StickySidebar: React.FC<StickySidebarProps> = ({ children }) => {
  return (
    <div className="sticky top-8">
      <div className="space-y-6 max-h-[calc(100vh-4rem)]">
        {children}
      </div>
    </div>
  );
};

export default StickySidebar;