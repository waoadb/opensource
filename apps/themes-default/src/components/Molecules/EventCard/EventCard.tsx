/* Dependencies */
import { useMemo } from 'react';

// Helpers
import { formatDateRange } from '@/helpers/formatDateRange/formatDateRange';
import { truncateString } from '@/helpers/truncateString/truncateString';

// Components
import { Heading } from '@/components/Atoms/Heading/Heading';
import { Paragraph } from '@/components/Atoms/Paragraph/Paragraph';
import { Link } from '@/components/Atoms/Link/Link';
import { ImageAtom } from '@/components/Atoms/ImageAtom/ImageAtom';
import { AccessibilityList } from '../AccessibilityList/AccessibilityList';

// Models
import { ClientCacheModels } from '@waoadb/contracts-client';
type Props = {
  /**
   * Event to render
   */
  event: ClientCacheModels.CacheEvent;
  /**
   * Attribute to be used.
   */
  as?: 'div' | 'li';
};

/**
 * Event Card
 * @param props - Component props.
 * @returns
 */
export const EventCard = ({ event, as: El = 'li' }: Props) => {
  // state
  const dateRange = useMemo(() => {
    if (
      !event.performance_summary.first_performance ||
      !event.performance_summary.last_performance
    ) {
      return 'Coming Soon!';
    }

    return formatDateRange(
      event.performance_summary.first_performance.start_date,
      event.performance_summary.first_performance.start_time,
      event.performance_summary.last_performance.end_date,
      event.performance_summary.last_performance.end_time,
      false
    );
  }, [event]);
  const truncatedSummary = useMemo(() => {
    if (event.details.summary) {
      return truncateString(event.details.summary, 100);
    }
    return null;
  }, [event]);

  return (
    <El className="w-full rounded-lg overflow-hidden border border-gray-200 border-solid">
      {event.details.picture && (
        <div className="w-full">
          <ImageAtom
            imageSrc={event.details.picture.url}
            altText={event.details.picture.alt_text || ''}
            position="object-center"
            fit="object-cover"
            ratio="16:9"
            restrictSize="card"
          />
        </div>
      )}
      <div className="py-4 px-4">
        <Heading level="h3" style="h4" className="font-semibold">
          {event.details.name}
        </Heading>
        <Paragraph
          style="small"
          className="mb-2"
          suppressHydrationWarning={true}
        >
          {dateRange}
        </Paragraph>

        {event.accessibility?.enabled && (
          <AccessibilityList
            accessibility={event.accessibility.items.map((item) => item.id)}
            color="black"
            size="small"
          />
        )}

        {truncatedSummary && (
          <Paragraph style="small">{event.details.summary}</Paragraph>
        )}
        <Link
          href={`/events/${event.event_id}`}
          accessibleTitle={`View event page for ${event.details.name}`}
          className="mt-4"
        >
          Book now
        </Link>
      </div>
    </El>
  );
};
