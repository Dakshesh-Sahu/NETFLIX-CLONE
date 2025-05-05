'use client';

import type { Movie } from '@/lib/types';
import { MovieCard } from '@/components/movie-card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useRef, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface MovieCarouselProps {
  title: string;
  movies: Movie[];
}

const SCROLL_AMOUNT = 300; // Adjust scroll amount as needed
const PEEK_AMOUNT = 50; // How much the arrows peek from the sides

export function MovieCarousel({ title, movies }: MovieCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      // Check if scrolled to the very end
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1); // Use a small tolerance
    }
  };

   const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
        const currentScrollLeft = scrollContainerRef.current.scrollLeft;
        const containerWidth = scrollContainerRef.current.clientWidth;
        // Calculate scroll amount based on visible items (approximate)
        const cardWidthApprox = containerWidth / 5; // Assume roughly 5 cards visible
        const scrollAmount = containerWidth - cardWidthApprox; // Scroll by almost a full view width

        scrollContainerRef.current.scrollBy({
            left: direction === 'left' ? -scrollAmount : scrollAmount,
            behavior: 'smooth',
        });
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      // Initial check
      handleScroll();
      container.addEventListener('scroll', handleScroll);
      // Check on resize as well
      const resizeObserver = new ResizeObserver(handleScroll);
      resizeObserver.observe(container);

      return () => {
        container.removeEventListener('scroll', handleScroll);
        resizeObserver.unobserve(container);
      };
    }
  }, [movies]); // Re-run effect if movies change

  // Don't render the carousel if there are no movies
  if (!movies || movies.length === 0) {
    return null;
  }


  return (
    <div className="mb-8 md:mb-12 group relative">
      <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4 px-4 md:px-16">{title}</h2>
      <div className="relative mx-4 md:mx-16">
         {/* Left Arrow */}
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "absolute left-0 top-1/2 transform -translate-y-1/2 z-20 h-full w-12 bg-gradient-to-r from-background/80 to-transparent rounded-none text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gradient-to-r hover:from-background/90 hover:to-transparent",
            !showLeftArrow && "hidden" // Hide if not needed
          )}
          style={{ paddingLeft: `${PEEK_AMOUNT / 4}px` }} // Adjust padding for visual peek
          onClick={() => scroll('left')}
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-8 w-8" />
        </Button>

        <div
          ref={scrollContainerRef}
          className="flex space-x-2 md:space-x-4 overflow-x-auto pb-4 scroll-smooth horizontal-scrollbar scrollbar-hide" // Hides scrollbar visually but keeps functionality
           style={{ scrollPaddingLeft: `${PEEK_AMOUNT}px`, scrollPaddingRight: `${PEEK_AMOUNT}px`}} // Add padding for scroll snap
        >
          {/* Add padding elements to ensure cards don't hide under arrows */}
           {/* <div className="flex-shrink-0 w-2 md:w-4" /> */}
            {movies.map((movie) => (
              <div key={movie.id} className="flex-shrink-0 w-[calc(50%-0.5rem)] sm:w-[calc(33.33%-0.75rem)] md:w-[calc(25%-1rem)] lg:w-[calc(20%-1rem)] xl:w-[calc(16.66%-1rem)]">
                  <MovieCard movie={movie} />
              </div>
            ))}
            {/* <div className="flex-shrink-0 w-2 md:w-4" /> */}
        </div>

        {/* Right Arrow */}
         <Button
          variant="ghost"
          size="icon"
          className={cn(
            "absolute right-0 top-1/2 transform -translate-y-1/2 z-20 h-full w-12 bg-gradient-to-l from-background/80 to-transparent rounded-none text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gradient-to-l hover:from-background/90 hover:to-transparent",
            !showRightArrow && "hidden" // Hide if not needed
          )}
          style={{ paddingRight: `${PEEK_AMOUNT / 4}px` }} // Adjust padding for visual peek
          onClick={() => scroll('right')}
          aria-label="Scroll right"
        >
          <ChevronRight className="h-8 w-8" />
        </Button>
      </div>
    </div>
  );
}