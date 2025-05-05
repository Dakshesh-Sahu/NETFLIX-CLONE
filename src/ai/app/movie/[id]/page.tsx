import Image from 'next/image';
import { getMockMovieById, getMockMoviesByGenre } from '@/lib/mock-data'; // Using mock data
import { Button } from '@/components/ui/button';
import { Play, Plus, Info } from 'lucide-react';
import { MovieCarousel } from '@/components/movie-carousel';
import { notFound } from 'next/navigation';

interface MovieDetailPageProps {
  params: { id: string };
}

export default async function MovieDetailPage({ params }: MovieDetailPageProps) {
  const movie = await getMockMovieById(params.id);

  if (!movie) {
    notFound(); // Or show a specific "Movie Not Found" component
  }

  // Fetch related movies (e.g., by genre)
  const relatedMovies = await getMockMoviesByGenre(movie.genre);
  // Filter out the current movie from related movies
  const filteredRelatedMovies = relatedMovies.filter(m => m.id !== movie.id);

  return (
    <div className="pb-16">
        {/* Hero Section for Movie */}
        <div className="relative h-[50vh] md:h-[70vh] w-full text-white">
            {movie.backdropUrl && (
                <Image
                src={movie.backdropUrl}
                alt={`Backdrop for ${movie.title}`}
                fill
                className="object-cover opacity-70"
                 priority
                 data-ai-hint="movie scene background"
                />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-background/50 via-background/10 to-transparent"></div>


            <div className="absolute bottom-[10%] md:bottom-[15%] left-4 md:left-16 z-10 max-w-2xl">
                <h1 className="text-3xl md:text-5xl font-bold mb-3 drop-shadow-lg">
                {movie.title}
                </h1>
                 <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
                    {movie.year && <span>{movie.year}</span>}
                    {movie.rating && <span className="border px-1.5 py-0.5 rounded text-xs border-muted-foreground">{movie.rating.toFixed(1)}</span>}
                    {movie.duration && <span>{movie.duration}</span>}
                     <span className="border px-1.5 py-0.5 rounded text-xs border-muted-foreground">{movie.genre}</span>
                </div>
                <p className="text-sm md:text-base mb-5 line-clamp-3 md:line-clamp-4 drop-shadow-md">
                {movie.description}
                </p>
                <div className="flex flex-wrap gap-3">
                <Button size="lg" className="bg-white text-black hover:bg-white/90">
                    <Play className="mr-2 h-6 w-6 fill-black" />
                    Play Trailer
                </Button>
                 <Button size="lg" variant="outline" className="bg-transparent border-white/50 hover:bg-white/10">
                    <Plus className="mr-2 h-6 w-6" />
                    My List
                 </Button>
                {/* Add Watch Together Button Here */}
                 <Button size="lg" variant="secondary" className="bg-gray-500/70 text-white hover:bg-gray-500/60">
                     <Info className="mr-2 h-6 w-6" />
                    Watch Together
                 </Button>
                </div>
            </div>
        </div>

        {/* Content Details (Tabs maybe? Cast, Crew, Details, More Like This) */}
         {/* For simplicity, just showing related movies for now */}
         <div className="mt-8 md:mt-12">
             {filteredRelatedMovies.length > 0 && (
                <MovieCarousel title={`More like ${movie.genre}`} movies={filteredRelatedMovies} />
            )}
         </div>

    </div>
  );
}

// Optional: Generate static paths if you have a known set of movies
// export async function generateStaticParams() {
//   const movies = await getAllMovieIds(); // Function to get all movie IDs
//   return movies.map((movie) => ({
//     id: movie.id,
//   }));
// }