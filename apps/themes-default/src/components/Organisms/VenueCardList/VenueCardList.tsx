/* Dependencies */
import { useMemo, ComponentProps } from 'react';

// Components
import { VenueCard } from '@/components/Molecules/VenueCard/VenueCard';
import { Link } from '@/components/Atoms/Link/Link';
import { Heading } from '@/components/Atoms/Heading/Heading';

// Models
import { ClientCacheModels } from '@waoadb/contracts-client';
type Props = {
  /**
   * Title to be rendered.
   */
  title?: string;
  /**
   * Link to be rendered.
   */
  link?: ComponentProps<typeof Link>;
  /**
   * Venues to render
   */
  venues: ClientCacheModels.CacheVenue[];
  /**
   * Supress accessibility readout.
   */
  supressAccessibilityReadout?: boolean;
};

/**
 * Venue Card List
 * @param props - Component props.
 * @returns
 */
export const VenueCardList = ({
  venues,
  title,
  link,
  supressAccessibilityReadout,
}: Props) => {
  const accessibleReadOut = useMemo(() => {
    return `Render Updated: Now Showing ${venues.length} new venues.`;
  }, [venues]);

  return (
    <>
      {!supressAccessibilityReadout && (
        <span className="sr-only" aria-live="polite" aria-atomic={true}>
          {accessibleReadOut}
        </span>
      )}

      {title && (
        <div className="flex flex-col gap-4 mb-4 md:flex-row md:items-center justify-between">
          <Heading level="h2" style="h4" className="text-2xl lg:text-3xl">
            {title}
          </Heading>
          {link && <Link {...link} />}
        </div>
      )}

      <ul className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {venues.map((venue) => (
          <VenueCard
            key={venue.venue_id}
            venue={venue}
            as="li"
            showDirections={true}
          />
        ))}
      </ul>
    </>
  );
};
