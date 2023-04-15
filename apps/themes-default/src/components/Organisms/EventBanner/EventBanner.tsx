/* Dependencies */
import { useMemo } from 'react';

// Helpers
import { formatDateRange } from '@/helpers/formatDateRange/formatDateRange';
import { addUrlParams } from '@/helpers/addUrlPrarms/addUrlParams';

// Components
import { BackButton } from '@/components/Atoms/BackButton/BackButton';
import { Link } from '@/components/Atoms/Link/Link';
import { Heading } from '@/components/Atoms/Heading/Heading';
import { Paragraph } from '@/components/Atoms/Paragraph/Paragraph';
import { ImageAtom } from '@/components/Atoms/ImageAtom/ImageAtom';
import { AccessibilityList } from '@/components/Molecules/AccessibilityList/AccessibilityList';

// Models
import { ClientCacheModels } from '@waoadb/contracts-client';
type Props = {
  /**
   * Event to render.
   */
  event: ClientCacheModels.CacheEvent;
  /**
   * Back link
   */
  backLink: string;
};

/**
 * Event Banner
 * @param props - Component props.
 * @returns
 */
export const EventBanner = ({ event }: Props) => {
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
    <section className="relative flex h-[90vh] w-full flex-col overflow-hidden md:min-h-[800px] pt-20">
      {/* Image */}
      <div className="absolute inset-0 after:absolute after:inset-0 after:bg-black/40">
        {event.details.picture && (
          <ImageAtom
            imageSrc={addUrlParams(event.details.picture.url, 'w=1200&q=80')}
            altText={event.details.picture.alt_text}
            blurhash={event.details.picture.blurhash}
            position="object-center"
            fit="object-cover"
            ratio="auto"
            absolute={true}
          />
        )}

        <div className="absolute z-[2] left-0 w-full top-[140px] py-4">
          <div className="container mx-auto">
            <BackButton
              title="What's on"
              accessibleTitle="Return to the what's on page"
              href="/events"
            />
          </div>
        </div>
      </div>
      {/* / Image */}

      {/* Content */}
      <div className="relative mt-auto w-full text-white py-8">
        <div className="container mx-auto">
          <div className="pb-8">
            <Heading
              level="h1"
              style="h1"
              className="block truncate leading-tight"
            >
              {event.details.name}
            </Heading>
            <Paragraph style="large" className="my-2">
              Date: {dateRange}
            </Paragraph>

            {event.accessibility?.enabled && (
              <AccessibilityList
                accessibility={event.accessibility.items.map((item) => item.id)}
                color="white"
              />
            )}

            <Link
              className="w-full md:w-auto mt-2"
              variant="primary"
              href={'#performances'}
              accessibleTitle='Scroll to the "Performances" section'
            >
              View performances
            </Link>
          </div>
        </div>
      </div>
      {/* Content */}
    </section>
  );
};
