/* Dependencies */
import Link from 'next/link';

/**
 * Footer Navigation
 * @returns
 */
export const FooterNavigation = () => {
  return (
    <nav className="w-full" title="Footer Navigation">
      <ul className="flex flex-row flex-wrap items-center gap-4 mb-8 w-full justify-center lg:justify-end">
        <li>
          <Link
            href={'/events'}
            className="font-semibold opacity-80 transition-opacity hover:opacity-100 block"
          >
            What&apos;s on
          </Link>
        </li>
        <li>
          <Link
            href={'/venues'}
            className="font-semibold opacity-80 transition-opacity hover:opacity-100 block"
          >
            Venues
          </Link>
        </li>
        <li>
          <Link
            href={'/about-us'}
            className="font-semibold opacity-80 transition-opacity hover:opacity-100 block"
          >
            About us
          </Link>
        </li>
      </ul>
    </nav>
  );
};
