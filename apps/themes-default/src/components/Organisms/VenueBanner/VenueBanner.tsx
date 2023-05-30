/* Dependencies */
import { useMemo } from 'react';

// Helpers
import { formatVenueAddress } from '@/helpers/formatVenueAddress/formatVenueAddress';

// Components
import { Heading } from '@/components/Atoms/Heading/Heading';
import { ImageAtom } from '@/components/Atoms/ImageAtom/ImageAtom';
import { Link } from '@/components/Atoms/Link/Link';
import { AccessibilityList } from '@/components/Molecules/AccessibilityList/AccessibilityList';

// Models
import { ClientCacheModels } from '@waoadb/contracts-client';
type Props = {
  /**
   * Venue
   */
  venue: ClientCacheModels.CacheVenue;
};

/**
 * Venue Banner
 * @param props - Component props.
 */
export const VenueBanner = ({ venue }: Props) => {
  // State
  const address = useMemo(() => {
    return formatVenueAddress(venue);
  }, [venue]);
  const accessibility = useMemo<
    Array<keyof ClientCacheModels.CacheVenue['accessibility']>
  >(() => {
    const items: Array<keyof ClientCacheModels.CacheVenue['accessibility']> =
      [];
    if (venue.accessibility.accessible_toilets) {
      items.push('accessible_toilets');
    }
    if (venue.accessibility.orientation_familiarisation_visits) {
      items.push('orientation_familiarisation_visits');
    }

    return [...items];
  }, [venue]);

  return (
    <section className="w-full h-auto min-h-[400px] grid grid-cols-1 md:grid-cols-2 gap-8 items-center container mx-auto my-12">
      <div className="w-full rounded-lg overflow-hidden">
        {/* Desktop Image */}

        {venue.picture && (
          <ImageAtom
            imageSrc={venue.picture.url}
            altText={venue.picture.alt_text}
            fit="object-cover"
            ratio="1:1"
            restrictSize="card"
            lazyload={false}
            position="object-center"
            className="hidden md:block"
          />
        )}
        {/* / Desktop Image */}
        {/* Mobile Image */}
        {venue.picture && (
          <ImageAtom
            imageSrc={venue.picture.url}
            altText={venue.picture.alt_text}
            fit="object-cover"
            ratio="16:9"
            restrictSize="card"
            lazyload={false}
            position="object-center"
            className="md:hidden"
          />
        )}
        {/* / Mobile Image */}
      </div>
      <div className="w-full">
        <Heading level="h1" style="h1">
          {venue.name}
        </Heading>

        <div className="w-full my-4">
          <Heading level="h2" style="h4">
            Address
          </Heading>
          <address
            className="text-sm lg:text-base not-italic my-2"
            dangerouslySetInnerHTML={{ __html: address }}
          />
          <Link
            href={`https://www.google.com/maps/search/${venue.postcode}`}
            target="_blank"
            variant="primary"
            accessibleTitle={'View venue'}
          >
            Get Directions
          </Link>
        </div>

        {accessibility.length > 0 && (
          <div className="w-full mt-4">
            <Heading level="h2" style="h4" className="mb-2">
              Accessibility
            </Heading>
            <AccessibilityList
              color="black"
              accessibility={accessibility}
              align="left"
              size="base"
            />
          </div>
        )}
      </div>
    </section>
  );
};
