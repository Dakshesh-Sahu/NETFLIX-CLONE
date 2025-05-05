'use server';

/**
 * @fileOverview Generates a genre-mixed playlist based on mood.
 *
 * - generateMoodPlaylist - A function that handles the playlist generation process.
 * - MoodPlaylistInput - The input type for the generateMoodPlaylist function.
 * - MoodPlaylistOutput - The return type for the generateMoodPlaylist function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';
import {getMoviesByGenre, Movie} from '@/services/tmdb';

const MoodPlaylistInputSchema = z.object({
  mood: z.string().describe('The mood for which to generate a playlist.'),
});
export type MoodPlaylistInput = z.infer<typeof MoodPlaylistInputSchema>;

const MoodPlaylistOutputSchema = z.object({
  playlist: z.array(
    z.object({
      genre: z.string().describe('The genre of the movie.'),
      movies: z.array(
        z.object({
          id: z.string(),
          title: z.string(),
          posterUrl: z.string(),
          genre: z.string(),
          trailerUrl: z.string(),
        })
      ),
    })
  ).describe('A list of genres and their movies based on mood.'),
});
export type MoodPlaylistOutput = z.infer<typeof MoodPlaylistOutputSchema>;

export async function generateMoodPlaylist(input: MoodPlaylistInput): Promise<MoodPlaylistOutput> {
  return moodPlaylistFlow(input);
}

const moodPlaylistPrompt = ai.definePrompt({
  name: 'moodPlaylistPrompt',
  input: {
    schema: z.object({
      mood: z.string().describe('The mood for which to generate a playlist.'),
    }),
  },
  output: {
    schema: z.array(
      z.object({
        genre: z.string().describe('The genre of the movie.'),
        reason: z.string().describe('The reason for including this genre for this mood.')
      })
    ).describe('A list of genres to include and the reason for including it, based on the mood.'),
  },
  prompt: `You are a playlist generator. The user will provide you a mood, and you will return a list of genres that are relevant to this mood, and the reason why.

Mood: {{{mood}}}

Return a list of genres and reasons.`,
});

const moodPlaylistFlow = ai.defineFlow<
  typeof MoodPlaylistInputSchema,
  typeof MoodPlaylistOutputSchema
>({
  name: 'moodPlaylistFlow',
  inputSchema: MoodPlaylistInputSchema,
  outputSchema: MoodPlaylistOutputSchema,
}, async input => {
  const genreSelection = await moodPlaylistPrompt(input);

  const playlist = await Promise.all(
    genreSelection.output!.map(async genre => {
      const movies = await getMoviesByGenre(genre.genre);
      return {
        genre: genre.genre,
        movies,
      };
    })
  );

  return {
    playlist,
  };
});