/* Dependencies */
import { useCallback, useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import { NextSeo } from 'next-seo';
import dayjs from 'dayjs';
import {
  CalendarDaysIcon,
  TicketIcon,
  TrophyIcon,
} from '@heroicons/react/24/outline';

// Services
import { differentBreedClient } from '@/services/differentBreedClient/differentBreedClient';

// Layouts
import Layout from '@/layout/Layout';

// Components
import { EventBanner } from '@/components/Organisms/EventBanner/EventBanner';
import { OnlineEventCard } from '@/components/Molecules/OnlineEventCard/OnlineEventCard';
import { AvailableStockCard } from '@/components/Molecules/AvailableStockCard/AvailableStockCard';
import { RefundPolicyCard } from '@/components/Molecules/RefundPolicyCard/RefundPolicyCard';
import { EventDescription } from '@/components/Molecules/EventDescription/EventDescription';
import { EventSummary } from '@/components/Molecules/EventSummary/EventSummary';
import { PerformanceCardList } from '@/components/Organisms/PerformanceCardList/PerformanceCardList';
import { Pagination } from '@/components/Molecules/Pagination/Pagination';
import { VenueCard } from '@/components/Molecules/VenueCard/VenueCard';
import { TBCEventCard } from '@/components/Molecules/TBCEventCard/TBCEventCard';
import { Heading } from '@/components/Atoms/Heading/Heading';
import { Placeholder } from '@/components/Molecules/Placeholder/Placeholder';
import { BookNowModal } from '@/components/Organisms/BookNowModal/BookNowModal';

// Client Side Only Components
const PerformanceFilters = dynamic(
  () =>
    import('@/components/Molecules/PerformanceFilters/PerformanceFilters').then(
      (component) => component.PerformanceFilters
    ),
  {
    ssr: false,
  }
);

// Models
import { ClientCacheModels } from '@waoadb/contracts-client';
type View = 'list' | 'calendar';
type PageParams = {
  id: string;
};
type PageProps = {
  event: ClientCacheModels.CacheEvent;
  profile: ClientCacheModels.CacheProfile;
};

/**
 * Page: Event
 * @param props - Page props.
 * @returns
 */
const Page = ({ event, profile }: PageProps) => {
  // State
  const [performances, setPerformances] = useState<
    ClientCacheModels.CachePerformance[]
  >([]);
  const [performancesView, setPerformancesView] = useState<View>('list');
  const [totalPerformances, setTotalPerformances] = useState<number>(0);
  const [filters, setFilters] =
    useState<ClientCacheModels.RetrievePerformancesRequest>({
      event_id: event.event_id,
      date_from: dayjs().format('YYYY-MM-DD'),
      limit: 6,
      skip: 0,
    });
  const [selectedPerformanceId, setSelectedPerformanceId] = useState<string>();
  const [showBookNowModal, setShowBookNowModal] = useState<boolean>(false);

  // Callbacks
  const retrievePerformances = useCallback(async () => {
    const response = await differentBreedClient.performances
      .retrievePerformances(filters)
      .catch(() => {
        return null;
      });

    if (response) {
      setPerformances(response.payload);
      setTotalPerformances(response.meta.total);
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
      payload: Omit<
        ClientCacheModels.RetrievePerformancesRequest,
        'event_id' | 'skip' | 'limit'
      >
    ) => {
      setFilters((filters) => ({
        ...filters,
        ...payload,
        skip: 0,
      }));
    },
    []
  );

  // Effects
  useEffect(() => {
    retrievePerformances();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, retrievePerformances]);

  return (
    <>
      {/* SEO */}
      {/* Fallback to Event when SEO is not provided. */}
      {!event.marketing?.seo && (
        <NextSeo
          title={`${profile.title} | ${event.details.name}`}
          description={event.details.description}
          openGraph={{
            title: `${profile.title} | ${event.details.name}`,
            description: event.details.description,
            images: [
              {
                url: event.details.picture?.url || '',
                alt: event.details.picture?.alt_text || '',
              },
            ],
          }}
          canonical={`${process.env.NEXT_PUBLIC_SITE_URL}/events/${event.event_id}`}
        />
      )}
      {/* Render Event SEO */}
      {event.marketing?.seo && (
        <NextSeo
          title={`${profile.title} | ${event.marketing.seo.title}`}
          description={event.marketing.seo.description}
          openGraph={{
            title: `${profile.title} | ${event.marketing.seo.o_title}`,
            description: event.marketing.seo.o_description,
            images: [
              {
                url: event.marketing.seo.picture?.url || '',
                alt: event.marketing.seo.picture?.alt_text || '',
              },
            ],
          }}
          canonical={`${process.env.NEXT_PUBLIC_SITE_URL}/events/${event.event_id}`}
        />
      )}
      {/* / SEO */}

      {/* Main */}
      <Layout profile={profile}>
        {/* Banner */}
        <EventBanner event={event} backLink="/events" />
        {/* / Banner */}

        {/* Details */}
        <section className="container mx-auto mt-8">
          <div className="grid lg:grid-cols-3 gap-4 mt-4">
            {/* Content */}
            <article className="w-full lg:col-span-2">
              {event.details.summary && (
                <EventSummary content={event.details.summary} />
              )}
              {event.details.summary && event.details.description && (
                <hr className="my-4" />
              )}
              {event.details.description && (
                <EventDescription content={event.details.description} />
              )}
            </article>
            {/* / Content */}
            {/* Side Bar */}
            <aside className="w-full grid grid-cols-1 gap-4 lg:gap-2 mt-6 lg:mt-0">
              {event.location && event.location.venue && (
                <VenueCard
                  as={'div'}
                  venue={event.location.venue}
                  showDirections={true}
                />
              )}
              {event.location && event.location.type === 'online' && (
                <OnlineEventCard />
              )}
              {event.location && event.location.type === 'tbc' && (
                <TBCEventCard />
              )}
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                <AvailableStockCard
                  title="Available Tickets"
                  total={0}
                  icon={
                    <TicketIcon width={25} height={25} className="mx-auto" />
                  }
                />
                <AvailableStockCard
                  title="Available Addons"
                  total={0}
                  icon={
                    <TrophyIcon width={25} height={25} className="mx-auto" />
                  }
                />
              </div>
              <RefundPolicyCard
                refundPolicy={event.commerce_settings.refund_policy}
              />
            </aside>
            {/* / Side Bar */}
          </div>
        </section>
        {/* / Details */}

        {/* Performances */}
        <section
          className="container mx-auto mt-12 mb-12 lg:mt-4"
          id="performances"
        >
          <div className="w-full mb-2">
            <Heading level="h2" style="h2">
              Performances ({totalPerformances} Available)
            </Heading>
          </div>

          <PerformanceFilters
            view={performancesView}
            handleViewChange={(view) => setPerformancesView(view)}
            onSubmit={handleFiltersChange}
          />
          {totalPerformances > 0 && (
            <>
              <PerformanceCardList
                performances={performances}
                handleBookNow={(performance_id) => {
                  setSelectedPerformanceId(performance_id);
                  setShowBookNowModal(true);
                }}
              />
              {totalPerformances > filters.limit && (
                <div className="w-full my-4">
                  <Pagination
                    pageCount={Math.ceil(totalPerformances / filters.limit)}
                    currentPage={Math.ceil(filters.skip / filters.limit)}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </>
          )}
          {totalPerformances === 0 && (
            <div className="w-full my-4">
              <Placeholder
                title="No Performances Found"
                content=""
                icon={
                  <CalendarDaysIcon
                    width={25}
                    height={25}
                    className="mx-auto"
                  />
                }
              />
            </div>
          )}
        </section>
        {/* / Performances */}

        {/* Book Now Modal */}
        <BookNowModal
          isOpen={showBookNowModal}
          onClose={() => setShowBookNowModal(false)}
          performance_id={selectedPerformanceId}
          event_id={event.event_id}
          currency={profile.commerce_settings.currency}
        />
        {/* / Book Now Modal */}
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
  // Extract the id
  const { id } = params as PageParams;

  try {
    // Get the profile and events
    const response = await Promise.all([
      differentBreedClient.profile.retrieveProfile(),
      differentBreedClient.events.retrieveEvent({
        event_id: id,
      }),
    ]).catch((error) => {
      throw error;
    });

    // Extract responses
    const [profileResponse, eventResponse] = response;

    // Return the props
    return {
      props: {
        profile: profileResponse.payload,
        event: eventResponse.payload,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default Page;
