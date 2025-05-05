import type { Movie } from '@/lib/types';
import { getMockMoviesByGenre as fetchMockMovies } from '@/lib/mock-data';

/**
 * Asynchronously retrieves a list of movies by genre using the mock data source.
 *
 * @param genre The genre of movies to retrieve.
 * @returns A promise that resolves to a list of Movie objects.
 */
export async function getMoviesByGenre(genre: string): Promise<Movie[]> {
  // Use the imported mock data function
  return fetchMockMovies(genre);
}

// Keep the interface definition
/**
 * Represents a movie.
 */
export interface Movie {
  /**
   * The ID of the movie.
   */
  id: string;
  /**
   * The title of the movie.
   */
  title: string;
   /**
   * The description of the movie.
   */
  description: string;
  /**
   * The poster URL of the movie.
   */
  posterUrl: string;
   /**
   * The backdrop URL of the movie. Optional.
   */
  backdropUrl?: string;
  /**
   * The genre of the movie.
   */
  genre: string;
  /**
   * The trailer URL of the movie.
   */
  trailerUrl: string; // Assume this is a direct video URL or YouTube ID
   /**
   * Optional rating
   */
  rating?: number;
   /**
    * Optional duration like "2h 15m"
    */
  duration?: string;
   /**
    * Optional release year
    */
  year?: number;
}