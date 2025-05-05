import Image from 'next/image';
import Link from 'next/link';
import type { Movie } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Play, Info } from 'lucide-react';

interface HeroSectionProps {
  featuredMovie: Movie;
}

export function HeroSection({ featuredMovie }: HeroSectionProps) {
  return (
    <div className="relative h-[60vh] md:h-[80vh] w-full mb-8 md:mb-12 text-white">
      {/* Background Image */}
      {featuredMovie.backdropUrl && (
        <Image
          src={featuredMovie.backdropUrl}
          alt={`Backdrop for ${featuredMovie.title}`}
          fill
          className="object-cover"
          priority // Prioritize loading the hero image
          data-ai-hint="movie scene background"
        />
      )}
       {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-background/50 via-background/10 to-transparent"></div>


      {/* Content */}
      <div className="absolute bottom-[15%] md:bottom-[25%] left-4 md:left-16 z-10 max-w-xl">
        <h1 className="text-3xl md:text-5xl font-bold mb-3 drop-shadow-lg">
          {featuredMovie.title}
        </h1>
        <p className="text-sm md:text-base mb-5 line-clamp-3 drop-shadow-md">
          {featuredMovie.description}
        </p>
        <div className="flex space-x-3">
          <Button size="lg" className="bg-white text-black hover:bg-white/90">
            <Play className="mr-2 h-6 w-6 fill-black" />
            Play
          </Button>
          <Button
            asChild // Use Link inside Button
            size="lg"
            variant="secondary"
            className="bg-gray-500/70 text-white hover:bg-gray-500/60"
          >
            <Link href={`/movie/${featuredMovie.id}`}>
              <Info className="mr-2 h-6 w-6" />
              More Info
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}