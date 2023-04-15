/* Dependencies */
import { useMemo, ComponentProps } from 'react';

// Components
import { EventCard } from '@/components/Molecules/EventCard/EventCard';
import { Heading } from '@/components/Atoms/Heading/Heading';
import { Link } from '@/components/Atoms/Link/Link';

// Models
import { ClientCacheModels } from '@waoadb/contracts-client';
type EventCardListProps = {
  /**
   * Title to be rendered.
   */
  title?: string;
  /**
   * Link to be rendered.
   */
  link?: ComponentProps<typeof Link>;
  /**
   * Events to render
   */
  events: ClientCacheModels.CacheEvent[];
  /**
   * Supress accessibility readout.
   */
  supressAccessibilityReadout?: boolean;
};

/**
 * Event Card List
 * @param params - Component params.
 * @returns
 */
export const EventCardList = ({
  title,
  link,
  events,
  supressAccessibilityReadout,
}: EventCardListProps) => {
  const accessibleReadOut = useMemo(() => {
    return `Render Updated: Now Showing ${events.length} new events.`;
  }, [events]);

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
        {events.map((event) => (
          <EventCard key={event.event_id} event={event} />
        ))}
      </ul>
    </>
  );
};
