import Header from './Header';
import Footer from './Footer';
import { Lightbox } from './Lightbox';
import SkipLink from './SkipLink';
import BackToTop from './BackToTop';
import { CommandPalette } from './CommandPalette';
import { DevA11yBadge } from './DevA11yBadge';

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <>
      <SkipLink />
      <Header />
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      <Footer />
      <BackToTop />
      <Lightbox />
      <CommandPalette />
      <DevA11yBadge />
    </>
  );
}
