/* Dependencies */
import React from 'react';

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
  link?: React.ComponentProps<typeof Link>;
  /**
   * Events to render
   */
  events: ClientCacheModels.CacheEvent[];
};

/**
 * Event Card List
 * @param params - Component params.
 * @returns
 */
export const EventCardList = ({ title, link, events }: EventCardListProps) => {
  return (
    <section className="container mx-auto my-10 lg:my-20">
      {title && (
        <div className="flex flex-col gap-4 mb-4 md:flex-row md:items-center justify-between">
          <Heading level="h2" style="h4" className="text-2xl lg:text-3xl">
            {title}
          </Heading>
          {link && <Link {...link} />}
        </div>
      )}

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((event) => (
          <EventCard key={event.event_id} event={event} />
        ))}
      </ul>
    </section>
  );
};
