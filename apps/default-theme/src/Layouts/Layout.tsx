import Header from '@/components/Organisms/Header/Header';
import React, { useCallback, useEffect, useState } from 'react';
import { Navigation } from '@/components/Organisms/Navigation/Navigation';
import Image from 'next/image';
import { Footer } from '@/components/Organisms/Footer/Footer';
import Link from 'next/link';

export default function Layout({ children }: { children: React.ReactNode }) {
  const mobileMenu = React.useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    // Watch resize toggle menu on medium screens

    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleMenu = useCallback(() => {
    document?.body.classList.toggle('overflow-hidden');
    setMenuOpen(!menuOpen);
  }, [menuOpen]);

  const menuClasses = (isOpen: boolean) => isOpen ? '-translate-x-full opacity-1' : 'translate-x-0 opacity-0';

  return (
    <>
      <Link className="skip-to-content-link" href="#main">
        Skip to content
      </Link>
      <Header toggleMenu={toggleMenu} menuOpen={menuOpen} />
      <div className='relative overflow-hidden flex flex-col min-h-screen'>
        <div
          className={`fixed z-[9] top-0 w-full left-full flex flex-col bottom-0 overflow-y-auto bg-white transition-all ${menuClasses(menuOpen)}`}
          ref={mobileMenu}>
          <div className='py-20 flex-1 flex flex-col items-center justify-center'>
            <Navigation />
          </div>
          <div className='text-center text-sm mb-4'>
          <span className='inline-flex items-center gap-2'>
            <span>
              <Image src='/assets/differentBreedLogo.svg' alt='' width='24' height='24' /></span> Powered by Different Breed &reg;</span>
          </div>
        </div>
        <main className='flex-1 w-full block box-border' id="main">{children}</main>
        <Footer />
      </div>
    </>

  );
}
