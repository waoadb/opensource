/* Dependencies */
import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
// import classNames from 'classnames';
import { useRouter } from 'next/router';

// Components
import { Header } from '@/components/Organisms/Header/Header';
import { Footer } from '@/components/Organisms/Footer/Footer';

// Models
import { ClientCacheModels } from '@waoadb/contracts-client';
import { SkipToContent } from '@/components/Atoms/SkipToContent/SkipToContent';
type Props = PropsWithChildren<{
  /**
   * The profile of the organisation.
   */
  profile: ClientCacheModels.CacheProfile;
  /**
   * Overrides the default behaviour of the layout to prevent transparency.
   */
  preventTransparency?: boolean;
}>;

/**
 * Layout
 * @param props - Component props.
 * @returns
 */
export default function Layout({
  children,
  profile,
  preventTransparency = false,
}: Props) {
  // Hooks
  const { pathname } = useRouter();

  // State
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const menuOffset = useMemo(() => {
    return (
      ['/events/'].some((path) => pathname.includes(path)) || pathname === '/'
    );
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
  }, [menuOpen, closeMenu, openMenu]);

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
    // Runs on mount only
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  return (
    <>
      {/* Header */}
      <header className="w-full">
        <SkipToContent />
        <Header
          toggleMenu={toggleMenu}
          menuOpen={menuOpen}
          transparent={!preventTransparency && menuOffset}
          profile={profile}
        />
      </header>
      {/* / Header */}
      {/* Main */}
      {/* <main
        className={classNames('flex-1 w-full block', {
          '-mt-[72px]': menuOffset && !preventTransparency,
          'pt-[72px]': !menuOffset || preventTransparency,
        })}
        id="main"
      >
        {children}
      </main> */}
      {/* Main */}
      {/* Footer */}
      <Footer profile={profile} />
      {/* / Footer */}
    </>
  );
}
