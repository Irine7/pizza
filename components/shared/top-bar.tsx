'use client';

import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Categories, Container, SortPopup } from '@/components/shared';

interface Props {
  className?: string;
}

export const TopBar = ({ className }: Props) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={cn(
        'sticky top-0 z-10 py-5 shadow-lg shadow-black/5 transition-colors duration-300',
				isScrolled ? 'bg-white/70 backdrop-blur-3xl' : 'bg-white',
        className
      )}
    >
      <Container>
        <Categories />
        <SortPopup />
      </Container>
    </div>
  );
};
