'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation'; // Use App Router's router
import { Film, Users, Link as LinkIcon, Copy } from 'lucide-react';
import { useToast } from "@/hooks/use-toast"


// Placeholder function for creating a room - replace with actual implementation
async function createWatchTogetherRoom(movieId: string): Promise<string> {
  // In a real app, this would interact with a backend/database
  console.log(`Creating room for movie ID: ${movieId}`);
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  // Generate a simple mock room ID
  const roomId = `room-${Math.random().toString(36).substring(2, 9)}`;
  console.log(`Generated room ID: ${roomId}`);
  return roomId;
}


export default function WatchTogetherPage() {
  const router = useRouter();
  const [joinRoomId, setJoinRoomId] = useState('');
  const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null); // Later, use a movie picker
   const [isLoadingCreate, setIsLoadingCreate] = useState(false);
   const [createdRoomId, setCreatedRoomId] = useState<string | null>(null);
   const { toast } = useToast();

  const handleCreateRoom = async () => {
      setIsLoadingCreate(true);
      setCreatedRoomId(null); // Reset previous created ID

      // --- Movie Selection Placeholder ---
      // In a real app, you'd have a modal or search to select a movie.
      // For now, let's use a hardcoded movie ID from mock data.
      const hardcodedMovieId = '1'; // Example: Stranger Things
      // ---------------------------------

      if (!hardcodedMovieId) {
        toast({
            variant: "destructive",
            title: "No Movie Selected",
            description: "Please select a movie to watch together.",
        });
        setIsLoadingCreate(false);
        return;
      }

      try {
          const newRoomId = await createWatchTogetherRoom(hardcodedMovieId);
          setCreatedRoomId(newRoomId);
           toast({
                title: "Room Created!",
                description: `Share the link or ID: ${newRoomId}`,
            });
          // Optionally redirect immediately:
          // router.push(`/watch-together/${newRoomId}`);
      } catch (error) {
          console.error("Failed to create room:", error);
           toast({
                variant: "destructive",
                title: "Error Creating Room",
                description: "Could not create a Watch Together room. Please try again.",
            });
      } finally {
          setIsLoadingCreate(false);
      }
  };

  const handleJoinRoom = (e: React.FormEvent) => {
      e.preventDefault();
      if (joinRoomId.trim()) {
        router.push(`/watch-together/${joinRoomId.trim()}`);
      } else {
           toast({
                variant: "destructive",
                title: "Invalid Room ID",
                description: "Please enter a valid room ID to join.",
            });
      }
  };

   const copyToClipboard = () => {
        if (!createdRoomId) return;
        const roomUrl = `${window.location.origin}/watch-together/${createdRoomId}`;
        navigator.clipboard.writeText(roomUrl).then(() => {
             toast({
                title: "Link Copied!",
                description: "Watch Together link copied to clipboard.",
            });
        }).catch(err => {
            console.error('Failed to copy: ', err);
             toast({
                 variant: "destructive",
                title: "Copy Failed",
                description: "Could not copy the link.",
            });
        });
    };

  return (
    <div className="container mx-auto px-4 md:px-16 py-12 md:py-20 flex flex-col items-center">
      <Users className="w-16 h-16 text-primary mb-6" />
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">Watch Together</h1>
      <p className="text-muted-foreground text-center max-w-xl mb-10 md:mb-16">
        Create a private room, invite your friends with a link, and watch your favorite movies and shows in perfect sync.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 w-full max-w-4xl">
        {/* Create Room Card */}
        <Card className="bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Film className="w-5 h-5 text-primary" />
              Create a New Room
            </CardTitle>
            <CardDescription>Start a new session and invite others.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             {/* Movie Selection Placeholder */}
             <div className="text-center p-4 border border-dashed rounded-md text-muted-foreground">
                 <p>Movie Selection Area</p>
                 <p className="text-xs">(Movie picker component would go here)</p>
                 <p className="text-sm mt-2 font-semibold">[Using "Stranger Things" for demo]</p>
             </div>

            <Button
                onClick={handleCreateRoom}
                disabled={isLoadingCreate}
                className="w-full"
             >
                {isLoadingCreate ? 'Creating...' : 'Create Room'}
            </Button>

            {createdRoomId && (
                <div className="mt-4 p-3 bg-muted rounded-md text-sm space-y-2">
                    <p className="font-semibold">Room Created!</p>
                    <p>Share this link or ID:</p>
                    <div className="flex items-center gap-2 bg-background p-2 rounded">
                        <LinkIcon className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                        <Input
                            readOnly
                            value={`${window.location.origin}/watch-together/${createdRoomId}`}
                            className="flex-grow h-8 text-xs bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                        <Button variant="ghost" size="icon" onClick={copyToClipboard} className="h-7 w-7 flex-shrink-0">
                            <Copy className="w-4 h-4" />
                        </Button>
                    </div>
                    <Button onClick={() => router.push(`/watch-together/${createdRoomId}`)} variant="link" size="sm" className="p-0 h-auto">
                        Go to Room &rarr;
                    </Button>
                </div>
            )}
          </CardContent>
        </Card>

        {/* Join Room Card */}
        <Card className="bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LinkIcon className="w-5 h-5 text-primary" />
              Join an Existing Room
            </CardTitle>
            <CardDescription>Enter the Room ID or link shared with you.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleJoinRoom} className="space-y-4">
              <Input
                type="text"
                placeholder="Enter Room ID or Link"
                value={joinRoomId}
                onChange={(e) => setJoinRoomId(e.target.value)}
                aria-label="Room ID or Link"
              />
              <Button type="submit" className="w-full">Join Room</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}