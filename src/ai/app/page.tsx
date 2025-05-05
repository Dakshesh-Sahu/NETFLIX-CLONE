import { HeroSection } from '@/components/hero-section';
import { MovieCarousel } from '@/components/movie-carousel';
import { getBrowsePageData } from '@/lib/mock-data'; // Using mock data

export default async function Home() {
  // Fetch data (using mock data for now)
  const { featured, playlists } = await getBrowsePageData();

  return (
    <div>
      <HeroSection featuredMovie={featured} />
      <div className="space-y-4 md:space-y-8">
        {playlists.map((playlist) => (
          <MovieCarousel
            key={playlist.genre}
            title={playlist.genre}
            movies={playlist.movies}
          />
        ))}
         {/* Add more carousels if needed */}
         {/* Example: You might have a "Trending Now" or "My List" carousel */}
         {/* <MovieCarousel title="Trending Now" movies={trendingMovies} /> */}
      </div>
    </div>
  );
}