/* Dependencies */
import { useMemo } from 'react';

// Helpers
import { addUrlParams } from '@/helpers/addUrlPrarms/addUrlParams';
import { formatDateRange } from '@/helpers/formatDateRange/formatDateRange';
import { truncateString } from '@/helpers/truncateString/truncateString';

// Components
import { Heading } from '@/components/Atoms/Heading/Heading';
import { Paragraph } from '@/components/Atoms/Paragraph/Paragraph';
import { Link } from '@/components/Atoms/Link/Link';
import { IconList } from '@/components/Molecules/IconList/IconList';
import { Image } from '@/components/Atoms/Image/Image';

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
          <Image
            imageSrc={addUrlParams(event.details.picture.url, 'w=300&q=80')}
            altText={event.details.picture.alt_text || ''}
            blurhash={event.details.picture.blurhash}
            position="object-center"
            fit="object-cover"
            ratio="16:9"
          />
        </div>
      )}
      <div className="py-4 px-4">
        <Heading level="h3" style="h4" className="font-semibold">
          {event.details.name}
        </Heading>
        <Paragraph style="small" className="mb-2">
          {dateRange}
        </Paragraph>
        <IconList />
        {truncatedSummary && (
          <Paragraph style="small" className="text-gray-500">
            {event.details.summary}
          </Paragraph>
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