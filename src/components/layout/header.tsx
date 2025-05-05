'use client';

import Link from 'next/link';
import { Bell, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

// Define classes outside the component for clarity
const serverBackgroundClass = 'bg-gradient-to-b from-black/70 via-black/30 to-transparent';
const scrolledBackgroundClass = 'bg-background/90 backdrop-blur-sm';

export function Header() {
  // Initialize state with the class the server will render
  const [headerBackground, setHeaderBackground] = useState(serverBackgroundClass);

  useEffect(() => {
    // Function to update background based on scroll position
    const handleScroll = () => {
      if (typeof window !== 'undefined') { // Ensure window is defined
        if (window.scrollY > 10) {
          setHeaderBackground(scrolledBackgroundClass);
        } else {
          setHeaderBackground(serverBackgroundClass);
        }
      }
    };

    // Run once on mount to set initial client-side state correctly based on current scroll
    handleScroll();

    // Add scroll listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup listener on component unmount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ease-in-out px-4 md:px-16 py-3',
        headerBackground // Use the state variable for the dynamic background class
      )}
    >
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-8">
          {/* Branding */}
          <Link href="/" className="text-primary font-bold text-2xl tracking-wider">
            NETFLIX
          </Link>
          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-4">
            <Link href="/" className="text-foreground hover:text-muted-foreground transition-colors text-sm font-medium">Home</Link>
            <Link href="#" className="text-foreground hover:text-muted-foreground transition-colors text-sm">TV Shows</Link>
            <Link href="#" className="text-foreground hover:text-muted-foreground transition-colors text-sm">Movies</Link>
            <Link href="#" className="text-foreground hover:text-muted-foreground transition-colors text-sm">New & Popular</Link>
            <Link href="/mood-playlist" className="text-foreground hover:text-muted-foreground transition-colors text-sm">Mood Playlists</Link>
            <Link href="/watch-together" className="text-foreground hover:text-muted-foreground transition-colors text-sm">Watch Together</Link>
          </nav>
        </div>
        {/* Action Icons */}
        <div className="flex items-center space-x-4">
          {/* Search Input */}
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Titles, people, genres"
              className="pl-10 pr-4 py-1 h-8 bg-transparent border border-muted-foreground/50 focus:bg-background/80 focus:border-foreground transition-colors text-sm"
            />
          </div>
          {/* Notification Icon */}
          <Button variant="ghost" size="icon" className="text-foreground hover:text-muted-foreground">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          {/* Profile Icon */}
          <Button variant="ghost" size="icon" className="text-foreground hover:text-muted-foreground">
            <User className="h-5 w-5" />
            <span className="sr-only">Profile</span>
          </Button>
           {/* Mobile Search Icon */}
          <Button variant="ghost" size="icon" className="sm:hidden text-foreground hover:text-muted-foreground">
            <Search className="h-5 w-5" />
             <span className="sr-only">Search</span>
          </Button>
        </div>
      </div>
    </header>
  );
}