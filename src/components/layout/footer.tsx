import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-background text-muted-foreground py-12 mt-16">
      <div className="container mx-auto px-4 md:px-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-3">
            <Link href="#" className="block text-sm hover:underline">Audio Description</Link>
            <Link href="#" className="block text-sm hover:underline">Investor Relations</Link>
            <Link href="#" className="block text-sm hover:underline">Legal Notices</Link>
          </div>
          <div className="space-y-3">
            <Link href="#" className="block text-sm hover:underline">Help Center</Link>
            <Link href="#" className="block text-sm hover:underline">Jobs</Link>
            <Link href="#" className="block text-sm hover:underline">Cookie Preferences</Link>
          </div>
          <div className="space-y-3">
            <Link href="#" className="block text-sm hover:underline">Gift Cards</Link>
            <Link href="#" className="block text-sm hover:underline">Terms of Use</Link>
            <Link href="#" className="block text-sm hover:underline">Corporate Information</Link>
          </div>
           <div className="space-y-3">
            <Link href="#" className="block text-sm hover:underline">Media Center</Link>
            <Link href="#" className="block text-sm hover:underline">Privacy</Link>
            <Link href="#" className="block text-sm hover:underline">Contact Us</Link>
          </div>
        </div>
        <p className="text-xs">&copy; {new Date().getFullYear()} NETFLIX, Inc. (Netflix Clone Project)</p> {/* Updated website name */}
      </div>
    </footer>
  );
}