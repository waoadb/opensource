/* Dependencies */
import { useMemo } from 'react';

// Helpers
import { formatDateRange } from '@/helpers/formatDateRange/formatDateRange';
import { addUrlParams } from '@/helpers/addUrlPrarms/addUrlParams';

// Components
import { Heading } from '@/components/Atoms/Heading/Heading';
import { Paragraph } from '@/components/Atoms/Paragraph/Paragraph';
import { Image } from '@/components/Atoms/Image/Image';
import { Link } from '@/components/Atoms/Link/Link';
import { AccessibilityList } from '@/components/Molecules/AccessibilityList/AccessibilityList';

// Models
import { ClientCacheModels } from '@waoadb/contracts-client';
type Props = {
  event: ClientCacheModels.CacheEvent;
};

/**
 * Featured Event Banner
 * @param props - Component props.
 * @returns
 */
export const FeaturedEventBanner = ({ event }: Props) => {
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
  return (
    <section className="relative flex h-[70vh] w-full flex-col overflow-hidden md:min-h-[800px]">
      {/* Image */}
      <div className="absolute inset-0 after:absolute after:inset-0 after:bg-black/40">
        {event.details.picture && (
          <Image
            imageSrc={addUrlParams(event.details.picture.url, 'w=1200&q=80')}
            altText={event.details.picture.alt_text}
            blurhash={event.details.picture.blurhash}
            position="object-center"
            fit="object-cover"
            ratio="auto"
            absolute={true}
          />
        )}
      </div>
      {/* / Image */}
      {/* Content */}
      <div className="relative mt-auto w-full text-white">
        <div className="container mx-auto">
          <div className="pb-8">
            <Heading level="h1" style="h1" className="block">
              <span>Featured title here</span>
            </Heading>

            <Paragraph style="base" className="my-2">
              {dateRange}
            </Paragraph>

            {event.accessibility.enabled && (
              <AccessibilityList
                accessibility={event.accessibility.items.map((item) => item.id)}
                color="white"
              />
            )}

            <Link
              href={`/events/${event.event_id}`}
              className="w-full md:w-auto mt-2"
              variant="primary"
              accessibleTitle={`View event page for ${event.details.name}`}
            >
              Book now
            </Link>
          </div>
        </div>
      </div>
      {/* Content */}
    </section>
  );
};
