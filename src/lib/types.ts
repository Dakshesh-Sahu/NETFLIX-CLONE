/**
 * Represents a movie entity.
 */
export interface Movie {
    id: string;
    title: string;
    description: string;
    posterUrl: string;
    backdropUrl?: string; // Optional backdrop for hero section
    genre: string;
    trailerUrl: string; // Assume this is a direct video URL or YouTube ID
    rating?: number; // Optional rating
    duration?: string; // Optional duration like "2h 15m"
    year?: number; // Optional release year
  }
  
  /**
   * Represents a playlist containing movies grouped by genre.
   */
  export interface Playlist {
    genre: string;
    movies: Movie[];
  }
  
  /**
   * Represents a room for the "Watch Together" feature.
   */
  export interface WatchTogetherRoom {
    id: string;
    movieId: string;
    createdAt: Date;
    // Add other relevant fields like participants, current playback time, etc.
  }