/* Dependencies */
// Helpers
import { addUrlParams } from '@/helpers/addUrlPrarms/addUrlParams';

// Components
import { ImageAtom } from '@/components/Atoms/ImageAtom/ImageAtom';

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
      <ImageAtom
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
