/* Dependencies */
// Components
import { FooterSocialLink } from '@/components/Atoms/FooterSocialLink/FooterSocialLink';

// Models
import { ClientCacheModels } from '@waoadb/contracts-client';
type Props = {
  socialLinks: ClientCacheModels.CacheProfileSocialMediaItem[];
};

/**
 * Footer Social
 * @param props - Component props.
 * @returns
 */
export const FooterSocial = ({ socialLinks }: Props) => {
  return (
    <ul className="lg:mt-2 flex flex-row flex-wrap gap-2">
      {socialLinks.map((socialLink, index) => (
        <FooterSocialLink socialLink={socialLink} key={index} />
      ))}
    </ul>
  );
};
