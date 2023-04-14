/* Dependencies */
import { useMemo } from 'react';
import { LockClosedIcon } from '@heroicons/react/24/outline';

// Helpers
import { formatDateRange } from '@/helpers/formatDateRange/formatDateRange';
import { addUrlParams } from '@/helpers/addUrlPrarms/addUrlParams';

// Components
import { BackButton } from '@/components/Atoms/BackButton/BackButton';
import { Link } from '@/components/Atoms/Link/Link';
import { Heading } from '@/components/Atoms/Heading/Heading';
import { Paragraph } from '@/components/Atoms/Paragraph/Paragraph';
import { Image } from '@/components/Atoms/Image/Image';

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
    <div className="relative flex h-screen w-full flex-col overflow-hidden md:min-h-[800px] lg:h-auto pt-20">
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

        <div className="absolute z-[2] left-0 w-full top-0 p-4 pt-8">
          <div className="container mx-auto">
            <BackButton
              title="What's on"
              accessibleTitle="Return to the what's on page"
              href="/"
            />
          </div>
        </div>
      </div>
      {/* / Image */}

      {/* Content */}
      <div className="relative mt-auto w-full text-white p-4 pb-8">
        <div className="container mx-auto">
          <div className="space-y-2 md:space-y-4 pb-8">
            <Heading
              level="h1"
              style="h1"
              className="block truncate leading-tight"
            >
              {event.details.name}
            </Heading>
            <Paragraph style="large">Date: {dateRange}</Paragraph>
            {event.accessibility.enabled && (
              <>
                <span className="sr-only">Facilities available</span>
                <ul className="flex flex-row items-center gap-2">
                  {event.accessibility.items.map((item) => (
                    <li key={item.id}>
                      <span className="sr-only">{item.title}</span>
                      <LockClosedIcon
                        name="Captions"
                        width={36}
                        height={36}
                        title={item.title}
                      />
                    </li>
                  ))}
                </ul>
              </>
            )}

            <Link
              className="w-full lg:w-auto"
              variant="primary"
              href={'#performances'}
            >
              View performances
            </Link>
          </div>
        </div>
      </div>
      {/* Content */}
    </div>
  );
};
