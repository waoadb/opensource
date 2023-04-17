/* Dependencies */
import Link from 'next/link';
import Image from 'next/image';

// Components
import { Paragraph } from '@/components/Atoms/Paragraph/Paragraph';
import { FooterSocial } from '@/components/Molecules/FooterSocial/FooterSocial';
import { FooterNavigation } from '@/components/Molecules/FooterNavigation/FooterNavigation';

// Models
import { ClientCacheModels } from '@waoadb/contracts-client';

type Props = {
  profile: ClientCacheModels.CacheProfile;
};

/**
 * Footer
 * @param props - Component props.
 * @returns
 */
export const Footer = ({ profile }: Props) => {
  return (
    <footer className="bg-gray-200 block w-full">
      <div className="container mx-auto py-10">
        {/* Profile Details */}
        <div className="w-full flex flex-col gap-4 mb-4 lg:flex-row items-center justify-center lg:justify-between">
          <div className="w-full flex flex-row flex-wrap justify-center lg:justify-start">
            <Link
              href={'/'}
              className="mb-4 flex flex-row justify-center lg:justify-start w-full "
            >
              <Image src="/demoLogo.svg" alt="" width={202} height={40} />
              <span className="sr-only">Return to home page.</span>
            </Link>
            <div className="flex flex-col flex-wrap items-center justify-center lg:items-start gap-2">
              <Paragraph className="font-semibold flex-0 text-center">
                {profile.title}
              </Paragraph>
              {profile.social_media && profile.social_media.length > 0 && (
                <FooterSocial socialLinks={profile.social_media} />
              )}
            </div>
          </div>

          <FooterNavigation />
        </div>
        {/* Profile Details */}

        {/* Base */}
        <div className="flex flex-col gap-4 mb-4 lg:flex-row items-center justify-between">
          <Link
            href={'https://differentbreed.events'}
            target="_blank"
            referrerPolicy="no-referrer"
            className="inline-flex items-center gap-2 order-3 lg:-order-1 hover:text-indigo-500 focus:text-indigo-500 transition-colors"
          >
            <Image
              src="/assets/differentBreedLogo.svg"
              alt=""
              width="24"
              height="24"
            />
            <span className="text-sm opacity-90">
              {' '}
              Powered by Different Breed &reg;
            </span>
          </Link>

          <nav className="order-1" title="Legal Links Navigation">
            <ul className="flex flex-row flex-wrap items-center gap-4 justify-center lg:justify-normal">
              <li>
                <Link
                  href={'https://differentbreed.events/legal/terms-of-service'}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="text-sm opacity-90 transition-opacity hover:opacity-100 block"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href={'https://differentbreed.events/legal/privacy-policy'}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="text-sm opacity-90 transition-opacity hover:opacity-100 block"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href={'https://differentbreed.events/legal/cookie-policy'}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="text-sm opacity-90 transition-opacity hover:opacity-100 block"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </nav>

          <div className="order-2">
            <Paragraph style="small">
              &copy; {new Date().getFullYear()} Profile name. All rights
              reserved.
            </Paragraph>
          </div>
        </div>
        {/* / Base */}
      </div>
    </footer>
  );
};
