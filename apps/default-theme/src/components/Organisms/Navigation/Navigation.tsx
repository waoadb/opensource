import Link from 'next/link';
import { useRouter } from 'next/router';

export const Navigation = () => {
  const { pathname } = useRouter();
  return (
    <nav>
      <ul className="flex flex-col md:flex-row flex-wrap items-center gap-8 md:gap-0">
        <li className="lg:mr-4">
          <Link href={'/whats-on'} className={`font-semibold text-lg md:text-base transition-opacity hover:opacity-100 block p-2 ${pathname === '/whats-on' ? 'opacity-100' : 'opacity-80'}`}>What&apos;s on</Link>
        </li>
        <li className="lg:mr-4">
          <Link href={'/venues'} className={`font-semibold text-lg md:text-base transition-opacity hover:opacity-100 block p-2 ${pathname === '/venues' ? 'opacity-100' : 'opacity-80'}`}>Venues</Link>
        </li>
        <li className="lg:mr-4">
          <Link href={'/about-us'} className={`font-semibold text-lg md:text-base transition-opacity hover:opacity-100 block p-2 ${pathname === '/about-us' ? 'opacity-100' : 'opacity-80'}`}>About us</Link>
        </li>
      </ul>
    </nav>
  );
};
