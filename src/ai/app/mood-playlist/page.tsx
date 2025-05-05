'use client';

import React, { useState, useTransition } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MovieCarousel } from '@/components/movie-carousel';
import { generateMoodPlaylist, MoodPlaylistOutput } from '@/ai/flows/mood-playlist-generator';
import { Loader2 } from 'lucide-react';
import { getMockMoviesByGenre } from '@/lib/mock-data'; // Use mock data fetcher
import type { Movie } from '@/lib/types';

const FormSchema = z.object({
  mood: z.string().min(2, {
    message: "Mood must be at least 2 characters.",
  }),
});

export default function MoodPlaylistPage() {
  const [playlistResult, setPlaylistResult] = useState<MoodPlaylistOutput | null>(null);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      mood: "",
    },
  });

 async function onSubmit(data: z.infer<typeof FormSchema>) {
    setError(null);
    setPlaylistResult(null); // Clear previous results

    startTransition(async () => {
      try {
        // Step 1: Generate Genre List from AI
        const aiResponse = await generateMoodPlaylist({ mood: data.mood });

        if (!aiResponse || !aiResponse.playlist) {
             throw new Error('AI did not return a valid playlist structure.');
        }

         console.log("AI Response:", aiResponse);


        // Step 2: Fetch Movies for each Genre using mock data function
        const populatedPlaylist = await Promise.all(
          aiResponse.playlist.map(async (playlistItem) => {
             console.log(`Fetching movies for genre: ${playlistItem.genre}`);
             // Use the mock data fetcher here
            const movies = await getMockMoviesByGenre(playlistItem.genre);
             console.log(`Fetched ${movies.length} movies for ${playlistItem.genre}`);
            return {
              ...playlistItem,
              movies: movies as Movie[], // Ensure type correctness
            };
          })
        );

         console.log("Populated Playlist:", populatedPlaylist);

        // Filter out genres with no movies found
        const finalPlaylist = populatedPlaylist.filter(item => item.movies.length > 0);

         console.log("Final Playlist (filtered):", finalPlaylist);


        if(finalPlaylist.length === 0) {
             setError(`Couldn't find any movies for the mood "${data.mood}". Try a different mood.`);
             setPlaylistResult(null);
        } else {
            setPlaylistResult({ playlist: finalPlaylist });
        }

      } catch (err) {
        console.error("Error generating playlist:", err);
        setError(err instanceof Error ? err.message : "An unexpected error occurred.");
        setPlaylistResult(null);
      }
    });
  }


  return (
    <div className="container mx-auto px-4 md:px-16 py-8 md:py-12">
      <Card className="max-w-2xl mx-auto mb-12 bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl font-bold">Mood Playlist Generator</CardTitle>
          <CardDescription>Enter a mood (e.g., happy, adventurous, melancholic) and we'll generate a genre-mixing playlist of movie trailers for you.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="mood"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Current Mood</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Energetic and Fun" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isPending} className="w-full">
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate Playlist"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {isPending && (
         <div className="text-center py-10">
            <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
            <p className="mt-4 text-muted-foreground">Generating your mood-based playlist...</p>
         </div>
      )}

      {error && (
        <Card className="max-w-4xl mx-auto mb-12 border-destructive bg-destructive/10">
            <CardHeader>
                <CardTitle className="text-destructive">Error</CardTitle>
            </CardHeader>
            <CardContent>
                <p>{error}</p>
            </CardContent>
        </Card>
      )}

      {playlistResult && !isPending && !error && (
        <div className="space-y-8 md:space-y-12">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">Your "{form.getValues('mood')}" Playlist</h2>
          {playlistResult.playlist.map((item) => (
             // Render only if movies array is not empty
             item.movies.length > 0 && (
                <MovieCarousel key={item.genre} title={item.genre} movies={item.movies} />
             )
          ))}
        </div>
      )}
    </div>
  );
}