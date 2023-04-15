/* Dependencies */
import { Fragment, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import classNames from 'classnames';

// Context
import { useDifferentBreedCart } from '@/context/DifferentBreedCart/hooks/useDifferentBreedCart';

// Components
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { Popover, Transition } from '@headlessui/react';
import { Navigation } from '@/components/Molecules/Navigation/Navigation';
import { Button } from '@/components/Atoms/Button/Button';

// Models
import { ClientCacheModels } from '@waoadb/contracts-client';
type Props = {
  profile: ClientCacheModels.CacheProfile;
  toggleMenu: (value: boolean) => void;
  menuOpen: boolean;
  transparent?: boolean;
};

/**
 * Header
 * @param props - Component props.
 * @returns
 */
export const Header = ({ toggleMenu, menuOpen, transparent }: Props) => {
  // Hooks
  const {
    cartState: { itemCount },
  } = useDifferentBreedCart();

  // State
  const [hasScrolled, setHasScrolled] = useState(false);
  const menuClasses = useMemo(() => {
    return menuOpen ? '-translate-x-full opacity-1' : 'translate-x-0 opacity-0';
  }, [menuOpen]);

  // Effects
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const scrollHandler = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (
          window.scrollY > 0 ||
          document.documentElement.style.overflow === 'hidden'
        ) {
          setHasScrolled(true);
        } else {
          setHasScrolled(false);
        }
      }, 10);
    };

    window.addEventListener('scroll', scrollHandler);
    scrollHandler();
  }, []);

  return (
    <>
      {/* Desktop */}
      <div
        className={classNames(
          'w-full fixed top-0 left-0 py-4 z-10 transition-colors duration-200',
          {
            'text-white': transparent && !hasScrolled,
            'bg-white': !transparent || hasScrolled,
          }
        )}
      >
        <div className="container mx-auto">
          <div className="flex flex-row flex-wrap w-full justify-between gap-4 items-center">
            <Link
              href={'/'}
              aria-label="Navigate back home"
              className="lg:mr-4 max-w-1/2"
            >
              <Image src="/demoLogo.svg" width={202} height={40} alt="" />
            </Link>
            <div className="hidden lg:block lg:mr-auto">
              <Navigation />
            </div>
            <div>
              <ul className="flex flex-wrap items-center flex-row gap-2 lg:gap-4 text-[0]">
                <li>
                  <Link
                    href={'/cart'}
                    className="inline-flex flex-row items-center group gap-2 text-sm"
                    title={`View your cart, Current item count: ${itemCount}`}
                  >
                    <span className="w-8 h-8 lg:bg-gray-300 group-hover:bg-indigo-600 lg:group-hover:text-white transition-colors rounded-full p-1.5 text-current lg:text-gray-800">
                      <ShoppingCartIcon
                        name="ShoppingCart"
                        title="ShoppingCart"
                        width={20}
                        height={20}
                      />
                    </span>
                    <span className="hidden lg:block">Cart ({itemCount})</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href={'/search'}
                    className="inline-flex flex-row items-center group gap-2 text-sm"
                    title="Access search page"
                  >
                    <span className="w-8 h-8 lg:bg-gray-300 group-hover:bg-indigo-600 lg:group-hover:text-white transition-colors rounded-full p-1.5 text-current lg:text-gray-800">
                      <MagnifyingGlassIcon
                        name="SearchIcon"
                        title="Search Icon"
                        width={20}
                        height={20}
                      />
                    </span>
                    <span className="hidden lg:block">Search</span>
                  </Link>
                </li>

                <li className="block lg:hidden">
                  <Button
                    size="slim"
                    className={classNames('p-2 group border border-solid', {
                      'bg-transparent border-white':
                        transparent && !hasScrolled && !menuOpen,
                      'bg-indigo-600': menuOpen || !transparent || hasScrolled,
                    })}
                    onClick={toggleMenu}
                    accessibleTitle={`${menuOpen ? 'Close' : 'Open'} menu`}
                  >
                    {!menuOpen && (
                      <Bars3Icon
                        width={25}
                        height={25}
                        className={classNames('')}
                      />
                    )}
                    {menuOpen && (
                      <XMarkIcon
                        width={25}
                        height={25}
                        className={classNames('')}
                      />
                    )}
                  </Button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* / Desktop */}

      {/* Mobile */}
      <div
        className={classNames(
          'fixed z-[9] top-0 w-full left-full flex flex-col bottom-0 overflow-y-auto bg-white transition-all lg:hidden',
          menuClasses
        )}
      >
        <div className="py-20 flex-1 flex flex-col items-center justify-center lg:hidden">
          <Navigation />
        </div>
        <div className="text-center text-sm mb-4">
          <Link
            href="https://differentbreed.events"
            className="hover:text-indigo-500 transition-colors duration-200 inline-flex items-center gap-2"
            referrerPolicy="no-referrer"
            target="_blank"
          >
            <span>
              <Image
                src="/assets/differentBreedLogo.svg"
                alt=""
                width="24"
                height="24"
              />
            </span>
            Powered by Different Breed &reg;
          </Link>
        </div>
      </div>
      {/* Mobile */}
    </>
  );
};
