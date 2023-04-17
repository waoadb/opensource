/* Dependencies */
import { useMemo } from 'react';
import classNames from 'classnames';

// Helpers
import { formatVenueAddress } from '@/helpers/formatVenueAddress/formatVenueAddress';
import { getVenueAccessibility } from '@/helpers/getVenueAccessibility/getVenueAccessibility';

// Components
import { Heading } from '@/components/Atoms/Heading/Heading';
import { Link } from '@/components/Atoms/Link/Link';
import { ImageAtom } from '@/components/Atoms/ImageAtom/ImageAtom';
import { Paragraph } from '@/components/Atoms/Paragraph/Paragraph';
import { AccessibilityList } from '../AccessibilityList/AccessibilityList';

// Models
import { ClientCacheModels } from '@waoadb/contracts-client';
type Props = {
  /**
   * Venue To Render
   */
  venue: ClientCacheModels.CacheVenue;
  /**
   * Attribute
   */
  as: 'li' | 'div';
  /**
   * Show Directions Link
   */
  showDirections?: boolean;
};

/**
 * Venue Card
 * @param props - Component props.
 * @returns
 */
export const VenueCard = ({ as: El = 'li', venue, showDirections }: Props) => {
  const venueAddress = useMemo(() => formatVenueAddress(venue), [venue]);
  const venueAccessibility = useMemo(
    () => getVenueAccessibility(venue),
    [venue]
  );
  return (
    <El className="w-full rounded-lg overflow-hidden border border-gray-200 border-solid">
      {venue.picture && (
        <div className="w-full">
          <ImageAtom
            imageSrc={venue.picture.url}
            altText={venue.picture.alt_text || ''}
            blurhash={venue.picture.blurhash}
            position="object-center"
            fit="object-cover"
            ratio="16:9"
          />
        </div>
      )}
      <div className="py-4 px-4">
        <Heading level="h2" style="h4" className="font-semibold mb-1">
          {venue.name}
        </Heading>
        <AccessibilityList accessibility={venueAccessibility} size="small" />
        <Paragraph style="base" className="mt-2">
          <span dangerouslySetInnerHTML={{ __html: venueAddress }}></span>
        </Paragraph>
        <div
          className={classNames('w-full mt-4', {
            'grid grid-cols-1 xl:grid-cols-2 gap-2': showDirections,
          })}
        >
          <Link
            href={`/venues/${venue.venue_id}`}
            variant="primary"
            accessibleTitle={`View venue page for ${venue.name}`}
          >
            View Venue
          </Link>
          {showDirections && (
            <Link
              href={`https://www.google.com/maps/search/${venue.postcode}`}
              target="_blank"
              variant="hollowPrimary"
              accessibleTitle={'View venue'}
            >
              Get Directions
            </Link>
          )}
        </div>
      </div>
    </El>
  );
};
