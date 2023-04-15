/* Dependencies */
// Components
import { Image } from '@/components/Atoms/Image/Image';
import { addUrlParams } from '@/helpers/addUrlPrarms/addUrlParams';

// Models
import { ClientCacheModels } from '@waoadb/contracts-client';
type Props = {
  /**
   * Profile
   */
  profile: ClientCacheModels.CacheProfile;
};

/**
 * Circle Image
 * @param props - Component props.
 * @returns
 */
export const CircleImage = ({ profile: { image } }: Props) => {
  if (!image) return null;

  return (
    <div className="w-full rounded-full overflow-hidden">
      <Image
        imageSrc={addUrlParams(image.url, 'w=600&q=80')}
        altText={image.alt_text}
        blurhash={image.blurhash}
        position="object-center"
        fit="object-cover"
        ratio="1:1"
      />
    </div>
  );
};
