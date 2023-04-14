import Link from 'next/link';
import { Icon } from '@/components/Atoms/Icons/DemoIcons';

export const SocialLinksList = () => {
  return (
    <ul className="flex flex-row flex-wrap gap-3">
      <li>
        <Link
          href="/"
          className="flex flex-row items-center border-2 border-indigo-300 text-indigo-600 rounded p-1 px-3 gap-3 hover:bg-indigo-100 transition-colors"
        >
          <span>
            <Icon name="Twitter" width="22" height="22" />
          </span>
          <span>Twitter</span>
        </Link>
      </li>
      <li>
        <Link
          href="/"
          className="flex flex-row items-center border-2 border-indigo-300 text-indigo-600 rounded p-1 px-3 gap-3 hover:bg-indigo-100 transition-colors"
        >
          <span>
            <Icon name="Facebook" width="22" height="22" />
          </span>
          <span>Facebook</span>
        </Link>
      </li>
      <li>
        <Link
          href="/"
          className="flex flex-row items-center border-2 border-indigo-300 text-indigo-600 rounded p-1 px-3 gap-3 hover:bg-indigo-100 transition-colors"
        >
          <span>
            <Icon name="Linkedin" width="22" height="22" />
          </span>
          <span>Linkedin</span>
        </Link>
      </li>
    </ul>
  );
};
