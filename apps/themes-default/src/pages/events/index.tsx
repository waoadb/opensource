/* Dependencies */
import { useCallback, useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import dayjs from 'dayjs';
import { NextSeo } from 'next-seo';
import { CalendarIcon } from '@heroicons/react/24/outline';

// Services
import { differentBreedClient } from '@/services/differentBreedClient/differentBreedClient';

// Layouts
import Layout from '@/Layouts/Layout';

// Components
import { Pagination } from '@/components/Molecules/Pagination/Pagination';
import { Heading } from '@/components/Atoms/Heading/Heading';
import { Placeholder } from '@/components/Molecules/Placeholder/Placeholder';
import { WhatsOnFilters } from '@/components/Molecules/WhatsOnFilters/WhatsOnFilters';
import { EventCardList } from '@/components/Organisms/EventCardList/EventCardList';

// Models
import { ClientCacheModels } from '@waoadb/contracts-client';
type View = 'list' | 'calendar';
type PageProps = {
  /**
   * Profile
   */
  profile: ClientCacheModels.CacheProfile;
  /**
   * Initial Events
   */
  initialEvents: ClientCacheModels.CacheEvent[];
};

/**
 * Page: Events
 * @param props - Page props.
 * @returns
 */
const Page = ({ profile, initialEvents }: PageProps) => {
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
      .retrieveEvents({
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
  }, [filters]);

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
        title={`${profile.title} | What's On`}
        description={`Discover the upcoming event's being produced by ${profile.title}.`}
        openGraph={{
          title: `${profile.title} | What's On`,
          description: `Discover the upcoming event's being produced by ${profile.title}.`,
          images: [
            {
              url: profile.image?.url || '',
              alt: profile.image?.alt_text || '',
            },
          ],
        }}
        canonical={`${process.env.NEXT_PUBLIC_SITE_URL}/events`}
      />
      {/* / SEO */}

      {/* Main */}
      <Layout profile={profile}>
        <section className="container mx-auto my-12 lg:mt-4 py-10">
          <Heading level="h1" style="h1" className="mb-4">
            What&apos;s On
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
export const getServerSideProps: GetServerSideProps<PageProps> = async ({}) => {
  // Get the profile
  const profileResponse = await differentBreedClient.profile
    .retrieveProfile()
    .then((response) => response.payload)
    .catch(() => {
      return null;
    });

  // Get the events
  const eventsResponse = await differentBreedClient.events
    .retrieveEvents({
      limit: 6,
      skip: 0,
      date_from: dayjs().format('YYYY-MM-DD'),
    })
    .then((response) => response.payload)
    .catch(() => {
      return null;
    });

  // Handle error
  if (!profileResponse || !eventsResponse) {
    return {
      notFound: true,
    };
  }

  // Return the props
  return {
    props: {
      profile: profileResponse,
      initialEvents: eventsResponse,
    },
  };
};

export default Page;
