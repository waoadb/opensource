/* Dependencies */
import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import classNames from 'classnames';
import { useRouter } from 'next/router';

// Components
import { Header } from '@/components/Organisms/Header/Header';
import { Footer } from '@/components/Organisms/Footer/Footer';

// Models
import { ClientCacheModels } from '@waoadb/contracts-client';
import { SkipToContent } from '@/components/Atoms/SkipToContent/SkipToContent';
type Props = PropsWithChildren<{
  profile: ClientCacheModels.CacheProfile;
}>;

/**
 * Layout
 * @param props - Component props.
 * @returns
 */
export default function Layout({ children, profile }: Props) {
  // Hooks
  const { pathname } = useRouter();

  // State
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const menuOffset = useMemo(() => {
    return ['/', '/events/'].some((path) => pathname.includes(path));
  }, [pathname]);

  // Effects
  useEffect(() => {
    // Close Menu on resize
    let timeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (window.innerWidth >= 1024 && menuOpen) {
          closeMenu();
        }
      }, 50);
    };

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Remove event listener on cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    closeMenu();
  }, [pathname]);

  // Callbacks
  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    document?.body.classList.remove('overflow-hidden');
  }, []);
  const openMenu = useCallback(() => {
    setMenuOpen(true);
    document?.body.classList.add('overflow-hidden');
  }, []);
  const toggleMenu = useCallback(() => {
    if (menuOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }, [menuOpen]);

  return (
    <>
      {/* Header */}
      <header className="w-full">
        <SkipToContent />
        <Header
          toggleMenu={toggleMenu}
          menuOpen={menuOpen}
          transparent={menuOffset}
          profile={profile}
        />
      </header>
      {/* / Header */}
      {/* Main */}
      <main
        className={classNames('flex-1 w-full block', {
          '-mt-[72px]': menuOffset,
        })}
        id="main"
      >
        {children}
      </main>
      {/* Main */}
      {/* Footer */}
      <Footer profile={profile} />
      {/* / Footer */}
    </>
  );
}
