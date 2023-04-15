/* Dependencies */
// Components
import { Heading } from '@/components/Atoms/Heading/Heading';
import { Paragraph } from '@/components/Atoms/Paragraph/Paragraph';

// Type
import { ClientCacheModels } from '@waoadb/contracts-client';
type Props = {
  /**
   * Profile
   */
  profile: ClientCacheModels.CacheProfile;
};

/**
 * Profile Details
 * @param props - Component Props
 * @returns
 */
export const ProfileDetails = ({ profile }: Props) => {
  return (
    <div className="w-full">
      <Heading level="h1" style="h1" className="mb-4">
        {profile.title}
      </Heading>
      <Paragraph style="base">{profile.bio}</Paragraph>
    </div>
  );
};
