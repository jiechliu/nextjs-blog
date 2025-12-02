'use client';

import { ReactNode } from 'react';
import AnimatedBackground from './AnimatedBackground';
import MouseFollower from './MouseFollower';

interface ClientWrapperProps {
  children: ReactNode;
}

const ClientWrapper = ({ children }: ClientWrapperProps) => {
  return (
    <>
      <AnimatedBackground />
      <MouseFollower />
      <div className="relative z-10 min-h-screen">
        {children}
      </div>
    </>
  );
};

export default ClientWrapper;