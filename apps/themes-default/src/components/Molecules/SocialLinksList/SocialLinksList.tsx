/* Dependencies */
// Components
import { Link } from '@/components/Atoms/Link/Link';
import {
  SocialAccessibleTitle,
  SocialIcons,
  SocialTitle,
} from '@/components/Atoms/FooterSocialLink/FooterSocialLink';

// Models
import { ClientCacheModels } from '@waoadb/contracts-client';
type Props = {
  socialItems: ClientCacheModels.CacheProfile['social_media'];
};

/**
 * Social Links List
 * @param props - Component props.
 * @returns
 */
export const SocialLinksList = ({ socialItems }: Props) => {
  return (
    <ul className="flex flex-row flex-wrap gap-3">
      {socialItems!.map((item) => {
        return (
          <li key={item.id}>
            <Link
              href={item.url}
              variant="hollowPrimary"
              className="fill-indigo-600 focus:fill-white hover:fill-white"
              accessibleTitle={SocialAccessibleTitle[item.type]}
              target="_blank"
            >
              <span className="flex flex-row items-center">
                {SocialIcons[item.type]}
                <span className="ml-2">{SocialTitle[item.type]}</span>
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
