import type { Movie, Playlist } from '@/lib/types';

// Mock Movie Data (replace with actual API calls or more diverse data)
export const mockMovies: Movie[] = [
  {
    id: '1',
    title: 'Stranger Things',
    description: 'When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.',
    posterUrl: 'https://picsum.photos/seed/stranger/200/300',
    backdropUrl: 'https://picsum.photos/seed/strangerback/1280/720',
    genre: 'Sci-Fi',
    trailerUrl: 'https://www.youtube.com/watch?v=b9EkMc79ZSU', // Example YouTube URL
    rating: 8.7,
    duration: '50m',
    year: 2016,
  },
  {
    id: '2',
    title: 'The Witcher',
    description: 'Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beasts.',
    posterUrl: 'https://picsum.photos/seed/witcher/200/300',
    backdropUrl: 'https://picsum.photos/seed/witcherback/1280/720',
    genre: 'Fantasy',
    trailerUrl: 'https://www.youtube.com/watch?v=ndl1W4ltcmg',
    rating: 8.2,
    duration: '1h',
    year: 2019,
  },
  {
    id: '3',
    title: 'Breaking Bad',
    description: 'A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine in order to secure his family\'s future.',
    posterUrl: 'https://picsum.photos/seed/breaking/200/300',
    backdropUrl: 'https://picsum.photos/seed/breakingback/1280/720',
    genre: 'Drama',
    trailerUrl: 'https://www.youtube.com/watch?v=HhesaQXLuRY',
    rating: 9.5,
    duration: '49m',
    year: 2008,
  },
  {
    id: '4',
    title: 'Inception',
    description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    posterUrl: 'https://picsum.photos/seed/inception/200/300',
    backdropUrl: 'https://picsum.photos/seed/inceptionback/1280/720',
    genre: 'Sci-Fi',
    trailerUrl: 'https://www.youtube.com/watch?v=YoHD9XEInc0',
    rating: 8.8,
    duration: '2h 28m',
    year: 2010,
  },
  {
    id: '5',
    title: 'The Dark Knight',
    description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    posterUrl: 'https://picsum.photos/seed/darkknight/200/300',
    backdropUrl: 'https://picsum.photos/seed/darkknightback/1280/720',
    genre: 'Action',
    trailerUrl: 'https://www.youtube.com/watch?v=EXeTwQWrcwY',
    rating: 9.0,
    duration: '2h 32m',
    year: 2008,
  },
  {
    id: '6',
    title: 'Parasite',
    description: 'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.',
    posterUrl: 'https://picsum.photos/seed/parasite/200/300',
    backdropUrl: 'https://picsum.photos/seed/parasiteback/1280/720',
    genre: 'Thriller',
    trailerUrl: 'https://www.youtube.com/watch?v=5xH0HfJHsaY',
    rating: 8.6,
    duration: '2h 12m',
    year: 2019,
  },
    {
    id: '7',
    title: 'Spirited Away',
    description: 'During her family\'s move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits, and where humans are changed into beasts.',
    posterUrl: 'https://picsum.photos/seed/spirited/200/300',
    backdropUrl: 'https://picsum.photos/seed/spiritedback/1280/720',
    genre: 'Animation',
    trailerUrl: 'https://www.youtube.com/watch?v=ByXuk9QqQkk',
    rating: 8.6,
    duration: '2h 5m',
    year: 2001,
  },
  {
    id: '8',
    title: 'The Matrix',
    description: 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
    posterUrl: 'https://picsum.photos/seed/matrix/200/300',
    backdropUrl: 'https://picsum.photos/seed/matrixback/1280/720',
    genre: 'Action',
    trailerUrl: 'https://www.youtube.com/watch?v=vKQi3bBA1y8',
    rating: 8.7,
    duration: '2h 16m',
    year: 1999,
  },
   {
    id: '9',
    title: 'Pulp Fiction',
    description: 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
    posterUrl: 'https://picsum.photos/seed/pulp/200/300',
    backdropUrl: 'https://picsum.photos/seed/pulpback/1280/720',
    genre: 'Crime',
    trailerUrl: 'https://www.youtube.com/watch?v=s7EdQ4FqbhY',
    rating: 8.9,
    duration: '2h 34m',
    year: 1994,
  },
   {
    id: '10',
    title: 'Forrest Gump',
    description: 'The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.',
    posterUrl: 'https://picsum.photos/seed/forrest/200/300',
    backdropUrl: 'https://picsum.photos/seed/forrestback/1280/720',
    genre: 'Comedy',
    trailerUrl: 'https://www.youtube.com/watch?v=bLvqoHBptjg',
    rating: 8.8,
    duration: '2h 22m',
    year: 1994,
  },
];

// Group movies by genre for easier access
export const mockPlaylists: Playlist[] = mockMovies.reduce((acc, movie) => {
  const existingPlaylist = acc.find(p => p.genre === movie.genre);
  if (existingPlaylist) {
    existingPlaylist.movies.push(movie);
  } else {
    acc.push({ genre: movie.genre, movies: [movie] });
  }
  return acc;
}, [] as Playlist[]);

// Function to simulate fetching movies by genre
export async function getMockMoviesByGenre(genre: string): Promise<Movie[]> {
  console.log(`Simulating fetch for genre: ${genre}`);
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  const filteredMovies = mockMovies.filter(movie => movie.genre.toLowerCase() === genre.toLowerCase());
   console.log(`Found ${filteredMovies.length} movies for genre: ${genre}`);
  // Return a copy to prevent accidental modification of mock data
  return [...filteredMovies];
}

// Function to simulate fetching all playlists/genres
export async function getMockPlaylists(): Promise<Playlist[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 200));
  // Return a copy
  return [...mockPlaylists];
}

// Function to simulate fetching a single movie by ID
export async function getMockMovieById(id: string): Promise<Movie | undefined> {
   // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 100));
  return mockMovies.find(movie => movie.id === id);
}

// Function to get a random featured movie
export function getFeaturedMovie(): Movie {
    return mockMovies[Math.floor(Math.random() * mockMovies.length)];
}

// Simulate fetching data for the main browse page
export async function getBrowsePageData(): Promise<{ featured: Movie; playlists: Playlist[] }> {
  const [featured, playlists] = await Promise.all([
    Promise.resolve(getFeaturedMovie()), // Assuming synchronous for simplicity here
    getMockPlaylists(),
  ]);
  return { featured, playlists };
}