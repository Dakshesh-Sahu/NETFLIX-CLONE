'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation'; // Use App Router hooks
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Send, Link as LinkIcon, Copy, ChevronLeft } from 'lucide-react';
import { getMockMovieById } from '@/lib/mock-data'; // Fetch movie details
import type { Movie } from '@/lib/types';
import { useToast } from "@/hooks/use-toast"


// Mock message structure
interface ChatMessage {
  id: string;
  sender: string; // 'user' or 'participant' name/ID
  senderInitial: string;
  text: string;
  timestamp: number;
}

// Mock participant structure
interface Participant {
  id: string;
  name: string;
  initial: string;
}

export default function WatchTogetherRoomPage() {
  const params = useParams();
  const router = useRouter();
  const roomId = params?.roomId as string | undefined;
  const { toast } = useToast();

  const [movie, setMovie] = useState<Movie | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [isLoading, setIsLoading] = useState(true); // For loading state
  const [roomExists, setRoomExists] = useState<boolean | null>(null); // To check if room is valid

  // Simulate fetching room details and movie info
  useEffect(() => {
    const initializeRoom = async () => {
      setIsLoading(true);
      if (!roomId) {
          setRoomExists(false); // Invalid URL structure
          setIsLoading(false);
          return;
      }

      try {
        // --- Room Validation Placeholder ---
        // In a real app, you'd check if `roomId` is valid on your backend.
        // Simulate checking if the room exists (e.g., starts with 'room-')
        const isValidRoom = roomId.startsWith('room-');
        if (!isValidRoom) {
            setRoomExists(false);
            toast({ variant: "destructive", title: "Invalid Room", description: "This Watch Together room does not exist." });
            setIsLoading(false);
            return;
        }
        setRoomExists(true);
        // ---------------------------------


        // --- Fetch Associated Movie Placeholder ---
        // In a real app, the room data on backend would include the movieId.
        // Hardcoding movie ID '1' (Stranger Things) for this demo room.
        const associatedMovieId = '1';
        const fetchedMovie = await getMockMovieById(associatedMovieId);
        if (fetchedMovie) {
          setMovie(fetchedMovie);
        } else {
           console.warn(`Movie with ID ${associatedMovieId} not found for room ${roomId}`);
           // Handle case where movie associated with room isn't found
        }
        // ---------------------------------------


        // --- Simulate Fetching Participants & Chat ---
        setParticipants([
          { id: 'user1', name: 'You', initial: 'Y' },
          { id: 'user2', name: 'Friend A', initial: 'F' },
          { id: 'user3', name: 'Friend B', initial: 'B' },
        ]);
        setMessages([
          { id: 'm1', sender: 'Friend A', senderInitial: 'F', text: 'Hey! Ready to watch?', timestamp: Date.now() - 60000 },
          { id: 'm2', sender: 'You', senderInitial: 'Y', text: 'Yep, just grabbing snacks!', timestamp: Date.now() - 30000 },
        ]);
        // ---------------------------------------

      } catch (error) {
        console.error("Error initializing room:", error);
        setRoomExists(false); // Treat error as room not found/accessible
         toast({ variant: "destructive", title: "Error Loading Room", description: "Could not load room details." });
      } finally {
        setIsLoading(false);
      }
    };

    initializeRoom();
  }, [roomId, toast]);


   const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const message: ChatMessage = {
        id: `msg-${Date.now()}`,
        sender: 'You', // Assume the current user is 'You'
        senderInitial: 'Y',
        text: newMessage.trim(),
        timestamp: Date.now(),
      };
      // In a real app, send this message via WebSocket/backend
      setMessages(prev => [...prev, message]);
      setNewMessage('');
      // Scroll chat to bottom (implementation needed in ScrollArea or parent)
    }
  };

  const copyInviteLink = () => {
        if (!roomId) return;
        const roomUrl = `${window.location.origin}/watch-together/${roomId}`;
        navigator.clipboard.writeText(roomUrl).then(() => {
             toast({
                title: "Invite Link Copied!",
                description: "Watch Together link copied to clipboard.",
            });
        }).catch(err => {
            console.error('Failed to copy: ', err);
             toast({
                 variant: "destructive",
                title: "Copy Failed",
                description: "Could not copy the invite link.",
            });
        });
    };

   if (isLoading) {
     return <div className="flex justify-center items-center h-screen"><Users className="w-12 h-12 animate-pulse text-primary" /> <span className="ml-4 text-xl">Loading Room...</span></div>;
   }

   if (roomExists === false) {
        // Redirect or show 'Not Found' if room is invalid
       return (
           <div className="container mx-auto px-4 py-16 text-center">
                <h1 className="text-2xl font-bold mb-4">Room Not Found</h1>
                <p className="text-muted-foreground mb-6">The Watch Together room ID you entered is invalid or the room doesn't exist.</p>
                <Button onClick={() => router.push('/watch-together')}>Go Back</Button>
           </div>
        );
   }

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-4rem)]"> {/* Adjust height based on header */}

      {/* Main Content Area (Video Player) */}
      <div className="flex-grow bg-black flex flex-col items-center justify-center relative">
         <Button onClick={() => router.push('/watch-together')} variant="ghost" size="icon" className="absolute top-4 left-4 z-20 text-white bg-black/50 hover:bg-black/70">
             <ChevronLeft className="h-6 w-6" />
             <span className="sr-only">Back to Watch Together</span>
         </Button>
        {/* Placeholder for Video Player */}
        <div className="w-full max-w-4xl aspect-video bg-muted flex items-center justify-center text-muted-foreground flex-col p-4">
           <Film className="w-16 h-16 mb-4" />
          <p className="text-lg font-semibold">Video Player Area</p>
          {movie && <p>Now Watching: {movie.title}</p>}
           <p className="text-sm mt-2">(Video player component would go here, synced across users)</p>
        </div>
         {movie && (
             <div className="absolute bottom-4 left-4 z-10 text-white bg-black/60 p-3 rounded-md max-w-xs backdrop-blur-sm">
                 <h3 className="text-lg font-semibold">{movie.title}</h3>
                 <p className="text-xs text-muted-foreground line-clamp-2">{movie.description}</p>
             </div>
         )}
      </div>

      {/* Sidebar (Participants & Chat) */}
      <Card className="w-full md:w-80 lg:w-96 border-l-0 md:border-l flex flex-col rounded-none h-[40vh] md:h-full">
        <CardHeader className="flex-shrink-0 border-b p-4">
          <CardTitle className="text-lg flex justify-between items-center">
             <div className="flex items-center gap-2">
                 <Users className="w-5 h-5" />
                <span>Participants ({participants.length})</span>
             </div>
             <Button variant="outline" size="sm" onClick={copyInviteLink}>
                <LinkIcon className="w-4 h-4 mr-1.5"/> Invite
            </Button>
          </CardTitle>
          {/* Participant List */}
          <div className="flex space-x-2 pt-2 overflow-x-auto horizontal-scrollbar pb-1">
            {participants.map(p => (
              <TooltipProvider key={p.id}>
                  <Tooltip>
                      <TooltipTrigger asChild>
                        <Avatar className="h-8 w-8 border-2 border-background ring-1 ring-muted-foreground">
                          <AvatarFallback className="text-xs bg-primary text-primary-foreground">{p.initial}</AvatarFallback>
                        </Avatar>
                      </TooltipTrigger>
                      <TooltipContent>
                          <p>{p.name}</p>
                      </TooltipContent>
                  </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </CardHeader>

        {/* Chat Area */}
        <CardContent className="flex-grow overflow-hidden p-0">
          <ScrollArea className="h-full p-4">
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2 ${msg.sender === 'You' ? 'justify-end' : ''}`}
                >
                   {msg.sender !== 'You' && (
                     <Avatar className="h-8 w-8">
                        <AvatarFallback>{msg.senderInitial}</AvatarFallback>
                     </Avatar>
                   )}
                  <div
                    className={`max-w-[75%] rounded-lg px-3 py-2 ${
                      msg.sender === 'You'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                     <p className={`text-xs mt-1 ${msg.sender === 'You' ? 'text-primary-foreground/70' : 'text-muted-foreground'} ${msg.sender === 'You' ? 'text-right' : 'text-left'}`}>
                        {/* {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} */}
                     </p>
                  </div>
                   {msg.sender === 'You' && (
                     <Avatar className="h-8 w-8">
                        <AvatarFallback>{msg.senderInitial}</AvatarFallback>
                     </Avatar>
                   )}
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>

        <CardFooter className="p-4 border-t">
          <form onSubmit={handleSendMessage} className="flex w-full items-center gap-2">
            <Input
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-grow"
              aria-label="Chat message input"
            />
            <Button type="submit" size="icon" disabled={!newMessage.trim()}>
              <Send className="h-4 w-4" />
              <span className="sr-only">Send message</span>
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}


// Add Tooltip imports needed for participant list
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Film } from 'lucide-react'; // Add Film import
