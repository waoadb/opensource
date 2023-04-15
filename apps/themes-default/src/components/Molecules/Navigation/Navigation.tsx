/* Dependencies */
import Link from 'next/link';
import { useRouter } from 'next/router';
import classNames from 'classnames';

// Models
type MenuItem = {
  title: string;
  href: string;
};
const menuItems: MenuItem[] = [
  {
    title: "What's on",
    href: '/events',
  },
  {
    title: 'Venues',
    href: '/venues',
  },
  {
    title: 'About us',
    href: '/about-us',
  },
];

/**
 * Navigation
 * @returns
 */
export const Navigation = () => {
  const { pathname } = useRouter();

  return (
    <nav title="Primary Navigation">
      <ul className="flex flex-col lg:flex-row flex-wrap items-center gap-8 lg:gap-0">
        {menuItems.map((item) => (
          <li className="lg:mr-4 w-full lg:w-auto" key={item.title}>
            <Link
              href={item.href}
              className={classNames(
                'font-semibold text-4xl lg:text-lg transition-opacity hover:opacity-100 block p-2 text-center lg:text-left',
                {
                  'text-indigo-500': pathname.includes(item.href),
                }
              )}
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
