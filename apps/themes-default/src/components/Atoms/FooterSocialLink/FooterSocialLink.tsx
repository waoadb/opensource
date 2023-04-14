/* Dependencies */
import Link from 'next/link';
import { useMemo } from 'react';

// Components
import { LockOpenIcon } from '@heroicons/react/24/outline';

// Models
import { ClientCacheModels } from '@waoadb/contracts-client';
type Props = {
  socialLink: ClientCacheModels.CacheProfileSocialMediaItem;
};

/**
 * Footer Social Link
 * @param props - Component props.
 */
export const FooterSocialLink = ({ socialLink }: Props) => {
  // State
  const title = useMemo(() => {
    switch (socialLink.type) {
      case 'facebook': {
        return 'Follow on Facebook';
      }
      case 'twitter': {
        return 'Follow on Twitter';
      }
      case 'instagram': {
        return 'Follow on Instagram';
      }
      case 'tiktok': {
        return 'Follow on TikTok';
      }
      case 'linkedin': {
        return 'Follow on LinkedIn';
      }
      case 'mixcloud': {
        return 'Follow on Mixcloud';
      }
      case 'soundcloud': {
        return 'Follow on Soundcloud';
      }
      default: {
        return '';
      }
    }
  }, [socialLink]);
  const icon = useMemo(() => {
    switch (socialLink.type) {
      case 'facebook': {
        return <LockOpenIcon title={title} width={18} height={18} />;
      }
      case 'twitter': {
        return <LockOpenIcon title={title} width={18} height={18} />;
      }
      case 'instagram': {
        return <LockOpenIcon title={title} width={18} height={18} />;
      }
      case 'tiktok': {
        return <LockOpenIcon title={title} width={18} height={18} />;
      }
      case 'linkedin': {
        return <LockOpenIcon title={title} width={18} height={18} />;
      }
      case 'mixcloud': {
        return <LockOpenIcon title={title} width={18} height={18} />;
      }
      case 'soundcloud': {
        return <LockOpenIcon title={title} width={18} height={18} />;
      }
      default: {
        return <></>;
      }
    }
  }, [socialLink]);

  return (
    <Link
      href={socialLink.url}
      title={title}
      className="inline-flex items-center border text-indigo-600 border-indigo-600 border-solid justify-center bg-transparent rounded-full w-8 h-8 hover:bg-indigo-600 hover:text-white focus:bg-indigo-600 focus:text-white transition-colors duration-200"
      target="_blank"
    >
      {icon}
    </Link>
  );
};
