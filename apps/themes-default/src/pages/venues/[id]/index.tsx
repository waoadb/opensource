/* Dependencies */
import { useCallback, useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import dayjs from 'dayjs';
import { NextSeo } from 'next-seo';

// Services
import { differentBreedClient } from '@/services/differentBreedClient/differentBreedClient';

// Layouts
import Layout from '@/Layouts/Layout';

// Components
import { CalendarIcon } from '@heroicons/react/24/outline';
import { Pagination } from '@/components/Molecules/Pagination/Pagination';
import { Heading } from '@/components/Atoms/Heading/Heading';
import { Placeholder } from '@/components/Molecules/Placeholder/Placeholder';
import { EventCardList } from '@/components/Organisms/EventCardList/EventCardList';

// Client Side Only Components
const WhatsOnFilters = dynamic(
  () =>
    import('@/components/Molecules/WhatsOnFilters/WhatsOnFilters').then(
      (component) => component.WhatsOnFilters
    ),
  {
    ssr: false,
  }
);

// Models
import { ClientCacheModels } from '@waoadb/contracts-client';
import { VenueBanner } from '@/components/Organisms/VenueBanner/VenueBanner';
type PageParams = {
  id: string;
};
type View = 'list' | 'calendar';
type PageProps = {
  /**
   * Profile
   */
  profile: ClientCacheModels.CacheProfile;
  /**
   * Venue
   */
  venue: ClientCacheModels.CacheVenue;
  /**
   * Initial Events
   */
  initialEvents: ClientCacheModels.CacheEvent[];
};

/**
 * Page: Venue Page
 * @param props - Page props.
 * @returns
 */
const Page = ({ profile, initialEvents, venue }: PageProps) => {
  //  // State
  const [whatsOnView, setWhatsOnView] = useState<View>('list');
  const [events, setEvents] =
    useState<ClientCacheModels.CacheEvent[]>(initialEvents);
  const [totalEvents, setTotalEvents] = useState<number>(initialEvents.length);
  const [filters, setFilters] =
    useState<ClientCacheModels.RetrieveEventListRequest>({
      limit: 6,
      skip: 0,
      date_from: dayjs().format('YYYY-MM-DD'),
    });

  // Callbacks
  const retrieveEvents = useCallback(async () => {
    const response = await differentBreedClient.events
      .retrieveEventsForVenue({
        venue_id: venue.venue_id,
        ...filters,
      })
      .catch(() => {
        return null;
      });

    // Set Events
    if (response) {
      setEvents(response.payload);
      setTotalEvents(response.meta.total);
    }
  }, [filters, venue.venue_id]);

  const handlePageChange = useCallback((page: number) => {
    setFilters((filters) => ({
      ...filters,
      skip: page * filters.limit,
    }));
  }, []);

  const handleFiltersChange = useCallback(
    (
      payload: Omit<ClientCacheModels.RetrieveVenuesRequest, 'skip' | 'limit'>
    ) => {
      setFilters((filters) => ({
        ...filters,
        ...payload,
        skip: 0,
      }));
    },
    []
  );

  useEffect(() => {
    retrieveEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  return (
    <>
      {/* SEO */}
      <NextSeo
        title={`${profile.title} | ${venue.name}`}
        description={`Discover the upcoming event's at ${venue.name}.`}
        openGraph={{
          title: `${profile.title} | What's On`,
          description: `Discover the upcoming event's at ${venue.name}.`,
          images: [
            {
              url: profile.image?.url || '',
              alt: profile.image?.alt_text || '',
            },
          ],
        }}
        canonical={`${process.env.NEXT_PUBLIC_SITE_URL}/venues/${venue.venue_id}`}
      />
      {/* / SEO */}

      {/* Main */}
      <Layout profile={profile}>
        <VenueBanner venue={venue} />

        <section className="container mx-auto mt-6 pb-10">
          <Heading level="h2" style="h2" className="mb-4">
            What&apos;s On at {venue.name}
          </Heading>

          {/* Event Filters */}
          <WhatsOnFilters
            onSubmit={handleFiltersChange}
            view={whatsOnView}
            handleViewChange={(view) => setWhatsOnView(view)}
          />
          {/* / Event Filters */}

          {/* Event List */}
          {totalEvents > 0 && (
            <>
              <div className="w-full my-4">
                <EventCardList events={events} />
                {totalEvents > filters.limit && (
                  <div className="w-full my-4">
                    <Pagination
                      pageCount={Math.ceil(totalEvents / filters.limit)}
                      currentPage={Math.ceil(filters.skip / filters.limit)}
                      onPageChange={handlePageChange}
                    />
                  </div>
                )}
              </div>
            </>
          )}
          {/* / Event List */}

          {/* Placeholder */}
          {totalEvents === 0 && (
            <div className="w-full my-4">
              <Placeholder
                title="No Venues Found"
                content=""
                icon={
                  <CalendarIcon width={25} height={25} className="mx-auto" />
                }
              />
            </div>
          )}
          {/* Placeholder */}
        </section>
      </Layout>
      {/* / Main */}
    </>
  );
};

/**
 * Get the page props.
 * @param props - GetServerSideProps props.
 * @returns
 */
export const getServerSideProps: GetServerSideProps<PageProps> = async ({
  params,
}) => {
  try {
    // Extract the id
    const { id } = params as PageParams;

    // Get the profile and events
    const response = await Promise.all([
      differentBreedClient.profile.retrieveProfile(),
      differentBreedClient.venues.retrieveVenue({ venue_id: id }),
      differentBreedClient.events.retrieveEventsForVenue({
        venue_id: id,
        limit: 6,
        skip: 0,
        date_from: dayjs().format('YYYY-MM-DD'),
      }),
    ]).catch((error) => {
      throw error;
    });

    // Extract responses
    const [profileResponse, venueResponse, eventsResponse] = response;

    // Return the props
    return {
      props: {
        profile: profileResponse.payload,
        venue: venueResponse.payload,
        initialEvents: eventsResponse.payload,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default Page;
