// Dependencies
import { Fragment } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Popover, Transition } from '@headlessui/react';
import { useRouter } from 'next/router';
// Components
import SearchForm from '@/components/Molecules/SearchForm/SearchForm';
import { Icon } from '@/components/Atoms/Icons/DemoIcons';
import { Navigation } from '@/components/Organisms/Navigation/Navigation';
import { Button } from '@/components/Atoms/Button/Button';

type HeaderProps = {
  toggleMenu: (value: boolean) => void;
  menuOpen: boolean;
};

export default function Header({ toggleMenu, menuOpen }: HeaderProps) {
  const { pathname } = useRouter();

  return (
    <header
      className={`w-full top-0 left-0 py-4 z-10 ${
        pathname === '/' ? 'fixed text-white bg-black/60' : 'sticky bg-white'
      }`}
    >
      <div className="container mx-auto">
        <div className="flex flex-row flex-wrap w-full justify-between gap-4 items-center">
          <Link
            href={'/'}
            aria-label={'Logo | Navigate back home'}
            className="lg:mr-4 max-w-1/2"
          >
            <Image src="/demoLogo.svg" width={202} height={40} alt="" />
          </Link>
          <div className="hidden md:block md:mr-auto">
            <Navigation />
          </div>
          <div>
            <ul className="flex flex-wrap items-center flex-row gap-2 lg:gap-4 text-[0]">
              <li className="block md:hidden order-3">
                <Button
                  size="slim"
                  className="bg-transparent p-2 group"
                  onClick={toggleMenu}
                  ariaLabel={'Toggle mobile menu'}
                >
                  <span
                    className={`relative w-6 block h-[2px] transition-opacity bg-current ${
                      menuOpen ? 'opacity-0' : 'opacity-100'
                    }`}
                  />
                  <span
                    className={`my-1.5 relative w-6 block h-[2px] after:absolute after:left-0 after:bottom-0 after:w-full after:bg-current before:transition-transform after:transition-transform after:h-[2px] before:absolute before:left-0 before:top-0 before:w-full before:bg-current before:h-[2px] ${
                      menuOpen
                        ? 'after:rotate-45 before:-rotate-45 bg-transparent'
                        : 'bg-current '
                    }`}
                  />
                  <span
                    className={`relative w-6 block h-[2px] transition-opacity bg-current ${
                      menuOpen ? 'opacity-0' : 'opacity-100'
                    }`}
                  />
                </Button>
              </li>
              <li>
                <Link
                  href={'/cart'}
                  className="inline-flex flex-row items-center group gap-2 text-sm"
                >
                  <span className="w-8 h-8 lg:bg-gray-300 group-hover:bg-indigo-600 lg:group-hover:text-white transition-colors rounded-full p-1.5 text-current lg:text-gray-800">
                    <Icon
                      name="ShoppingCart"
                      width={20}
                      height={20}
                      ariaVisible={false}
                    />
                  </span>
                  <span className="sr-only">Toggle cart</span>
                  <span className="hidden lg:block">Cart</span>
                </Link>
              </li>
              <li>
                <Popover as={Fragment}>
                  {({ open }) => (
                    <>
                      <Popover.Button className="inline-flex flex-row items-center group gap-2 text-sm">
                        <span className="w-8 h-8 lg:bg-gray-300 group-hover:bg-indigo-600 lg:group-hover:text-white transition-colors rounded-full p-1.5 text-current lg:text-gray-800">
                          <Icon
                            name="Search"
                            width={20}
                            height={20}
                            ariaVisible={false}
                          />
                        </span>
                        <span className="sr-only">Toggle search</span>
                        <span className="hidden lg:block">Search</span>
                      </Popover.Button>
                      <Transition
                        show={open}
                        as={Fragment}
                        enter="transition duration-100 ease-out"
                        enterFrom="transform scale-95 opacity-0"
                        enterTo="transform scale-100 opacity-100"
                        leave="transition duration-75 ease-out"
                        leaveFrom="transform scale-100 opacity-100"
                        leaveTo="transform scale-95 opacity-0"
                      >
                        <Popover.Panel
                          className="absolute z-10 top-full left-0 w-full bg-white shadow-lg pt-4 pb-6 text-gray-800"
                          focus={true}
                        >
                          <div className="container mx-auto">
                            <SearchForm />
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </>
                  )}
                </Popover>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
