/* Dependencies */
import { GetServerSideProps } from 'next';
import dayjs from 'dayjs';
import { NextSeo } from 'next-seo';
import { useMemo } from 'react';

// Services
import { differentBreedClient } from '@/services/differentBreedClient/differentBreedClient';

// Layouts
import Layout from '@/layout/Layout';

// Components
import { CalendarIcon } from '@heroicons/react/24/outline';
import { FeaturedEventBanner } from '@/components/Organisms/FeaturedEventBanner/FeaturedEventBanner';
import { EventCardList } from '@/components/Organisms/EventCardList/EventCardList';
import { Placeholder } from '@/components/Molecules/Placeholder/Placeholder';

// Models
import { ClientCacheModels } from '@waoadb/contracts-client';
type PageProps = {
  /**
   * The events to display.
   */
  events: ClientCacheModels.CacheEvent[];
  /**
   * The profile of the organisation.
   */
  profile: ClientCacheModels.CacheProfile;
};

/**
 * Page: Home
 * @param props - Page props.
 * @returns
 */
const Page = ({ events, profile }: PageProps) => {
  // State
  const featuredEvent = useMemo(() => {
    return events.length === 0 ? null : events[0];
  }, [events]);
  const otherEvents = useMemo(() => {
    return events.length === 0 ? null : events.slice(1);
  }, [events]);

  return (
    <>
      <NextSeo
        title={profile.title}
        description={`Find out what's on near you and online with ${profile.title}'s events.`}
        openGraph={{
          title: profile.title,
          description: `Find out what's on near you and online with ${profile.title}'s events.`,
          images: [
            {
              url: profile.image?.url || '',
              alt: profile.image?.alt_text || '',
            },
          ],
        }}
        canonical={`${process.env.NEXT_PUBLIC_SITE_URL}`}
      />

      <Layout profile={profile} preventTransparency={events.length === 0}>
        {events.length === 0 && (
          <div className="w-full mt-4">
            <Placeholder
              icon={<CalendarIcon width={25} height={25} className="mx-auto" />}
              title="No events found"
              content="There are no events to show at the moment."
            />
          </div>
        )}

        {/* Featured Event */}
        {featuredEvent && <FeaturedEventBanner event={featuredEvent} />}
        {/* / Featured Event */}

        {/* Other Events */}
        {otherEvents && otherEvents.length > 0 && (
          <section className="w-full my-10 lg:my-20 container mx-auto">
            <EventCardList
              title="What's On"
              link={{
                accessibleTitle: "View all events on the what's on page",
                href: '/events',
                children: 'View all events',
                variant: 'hollowPrimary',
                size: 'base',
                className: 'w-full md:w-auto',
              }}
              events={otherEvents}
            />
          </section>
        )}

        {/* / Other Events */}
      </Layout>
    </>
  );
};

/**
 * Get the page props.
 * @param props - GetServerSideProps props.
 * @returns
 */
export const getServerSideProps: GetServerSideProps<PageProps> = async () => {
  try {
    // Get the profile and events
    const response = await Promise.all([
      differentBreedClient.profile.retrieveProfile(),
      differentBreedClient.events.retrieveEvents({
        limit: 7,
        skip: 0,
        date_from: dayjs().format('YYYY-MM-DD'),
      }),
    ]).catch((error) => {
      throw error;
    });

    // Extract responses
    const [profileResponse, eventsResponse] = response;

    // Return the props
    return {
      props: {
        events: eventsResponse.payload,
        profile: profileResponse.payload,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default Page;
