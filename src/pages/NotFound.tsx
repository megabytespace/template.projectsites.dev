import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSEO } from '@/hooks/useSEO';
import { brand } from '@/brand';

export default function NotFound() {
  useSEO({
    title: `Page not found — ${brand.business.name}`,
    description: `The page you're looking for doesn't exist or has moved.`,
  });

  return (
    <section className="min-h-[80vh] flex items-center justify-center pt-32 pb-20 px-6">
      <div className="text-center max-w-xl mx-auto">
        <p className="font-heading text-[clamp(6rem,18vw,12rem)] font-extrabold leading-none gradient-text">404</p>
        <h1 className="text-3xl md:text-5xl font-bold font-heading text-text mt-4">
          This page wandered off
        </h1>
        <p className="mt-4 text-text-muted text-lg leading-relaxed">
          The page you're looking for doesn't exist, has moved, or never existed. Try the search,
          or head back to the homepage.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild size="lg">
            <Link to="/">
              <Home className="mr-2 h-4 w-4" /> Back home
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <button
              onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))}
            >
              <Search className="mr-2 h-4 w-4" /> Open search (⌘K)
            </button>
          </Button>
          <Button asChild size="lg" variant="ghost">
            <button onClick={() => history.back()}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Go back
            </button>
          </Button>
        </div>
      </div>
    </section>
  );
}
