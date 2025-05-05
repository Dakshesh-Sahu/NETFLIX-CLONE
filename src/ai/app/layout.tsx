import type {Metadata} from 'next';
import {Inter} from 'next/font/google'; // Using Inter as a common web font
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from "@/components/ui/toaster"
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'NETFLIX - Your Mood, Your Movies', // Updated title
  description: 'A Netflix clone with mood-based playlists and watch together features.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable
        )}
      >
        <Header />
        <main className="pt-16"> {/* Add padding-top to avoid overlap with fixed header */}
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}