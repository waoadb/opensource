/* Dependencies */

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
        imageSrc={image.url}
        altText={image.alt_text}
        blurhash={image.blurhash}
        position="object-center"
        fit="object-cover"
        ratio="1:1"
      />
    </div>
  );
};
