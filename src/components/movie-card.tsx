import Image from 'next/image';
import Link from 'next/link';
import type { Movie } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { PlayCircle, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MovieCardProps {
  movie: Movie;
  showDetailsOnHover?: boolean; // Option to show details card on hover
}

export function MovieCard({ movie, showDetailsOnHover = true }: MovieCardProps) {
  return (
    <Card className="relative group overflow-hidden border-none bg-transparent shadow-none rounded-md aspect-[2/3] transition-transform duration-300 ease-in-out transform hover:scale-105 hover:z-10">
      <Link href={`/movie/${movie.id}`} className="absolute inset-0 z-0">
        <Image
          src={movie.posterUrl}
          alt={movie.title}
          fill
          sizes="(max-width: 768px) 33vw, (max-width: 1200px) 20vw, 15vw"
          className="object-cover rounded-md"
          data-ai-hint="movie poster"
          priority={false} // Avoid prioritizing every card image
        />
         {/* Subtle overlay on hover */}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md"></div>
      </Link>

      {showDetailsOnHover && (
        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
             {/* Position actions within the hover effect */}
            <div className="flex justify-center space-x-2 mt-1 pointer-events-auto">
                 <Button
                    variant="ghost"
                    size="icon"
                    className="bg-white/80 hover:bg-white text-black rounded-full h-8 w-8"
                    onClick={(e) => { e.preventDefault(); alert(`Playing ${movie.title}`); }} // Prevent link navigation
                    aria-label={`Play ${movie.title}`}
                >
                    <PlayCircle className="h-5 w-5" />
                </Button>
                 <Button
                     asChild // Use Link inside Button
                    variant="ghost"
                    size="icon"
                    className="bg-gray-600/80 hover:bg-gray-500/80 text-white rounded-full h-8 w-8"
                    aria-label={`More info about ${movie.title}`}
                 >
                    <Link href={`/movie/${movie.id}`}>
                        <Info className="h-5 w-5" />
                    </Link>
                </Button>
            </div>
           <h3 className="text-white text-xs font-semibold truncate mt-2 text-center">{movie.title}</h3>
        </div>
      )}
       {/* Fallback Title for accessibility and when hover is disabled */}
      {!showDetailsOnHover && (
         <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent">
             <h3 className="text-white text-xs font-semibold truncate">{movie.title}</h3>
         </div>
      )}
    </Card>
  );
}