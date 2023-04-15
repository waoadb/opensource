/* Dependencies */
import { useCallback, useState } from 'react';
import { GetServerSideProps } from 'next';
import { NextSeo } from 'next-seo';

// Services
import { differentBreedClient } from '@/services/differentBreedClient/differentBreedClient';

// Layouts
import Layout from '@/Layouts/Layout';

// Components
import { Heading } from '@/components/Atoms/Heading/Heading';
import { SearchFilters } from '@/components/Molecules/SearchFilters/SearchFilters';
import { SearchNoResults } from '@/components/Molecules/SearchNoResults/SearchNoResults';
import { SearchPlaceholder } from '@/components/Molecules/SearchPlaceholder/SearchPlaceholder';
import { EventCardList } from '@/components/Organisms/EventCardList/EventCardList';

// Models
import { ClientCacheModels } from '@waoadb/contracts-client';
import { VenueCardList } from '@/components/Organisms/VenueCardList/VenueCardList';

type PageProps = {
  profile: ClientCacheModels.CacheProfile;
};

/**
 * Page: Search
 * @param props - Page props.
 * @returns
 */
const Page = ({ profile }: PageProps) => {
  // State
  const [searchQuery, setSearchQuery] = useState<string>();
  const [venuesToRender, setVenuesToRender] = useState<
    ClientCacheModels.CacheVenue[]
  >([]);
  const [eventsToRender, setEventsToRender] = useState<
    ClientCacheModels.CacheEvent[]
  >([]);

  // Callbacks
  const handleSearch = useCallback(async (query: string) => {
    // Perform Search
    const venuesRepsonse = await differentBreedClient.venues
      .retrieveVenues({
        limit: 6,
        skip: 0,
        query: query.trim(),
      })
      .then((response) => response.payload)
      .catch(() => []);

    const eventsResponse = await differentBreedClient.events
      .retrieveEvents({
        limit: 6,
        skip: 0,
        query: query.trim(),
      })
      .then((response) => response.payload)
      .catch(() => []);

    // Set state
    setSearchQuery(query.trim());
    setVenuesToRender(venuesRepsonse);
    setEventsToRender(eventsResponse);
  }, []);
  return (
    <>
      {/* SEO */}
      <NextSeo
        title={`${profile.title} | Search`}
        noindex={true}
        nofollow={true}
        description={`Search for venues and events at ${profile.title}.`}
        openGraph={{
          title: `${profile.title} | Search`,
          description: `Search for venues and events at ${profile.title}.`,
          images: [
            {
              url: profile.image?.url || '',
              alt: profile.image?.alt_text || '',
            },
          ],
        }}
        canonical={`${process.env.NEXT_PUBLIC_SITE_URL}/search`}
      />
      {/* / SEO */}

      {/* Main */}
      <Layout profile={profile}>
        <section className="container mx-auto my-12 lg:mt-4 py-10">
          <Heading level="h1" style="h1" className="mb-2">
            Search
          </Heading>

          <SearchFilters
            onSubmit={(query) => {
              handleSearch(query);
            }}
            query={searchQuery || ''}
          />

          {eventsToRender.length > 0 && (
            <section className="w-full my-10">
              <EventCardList
                events={eventsToRender}
                title="Events"
                link={{
                  accessibleTitle: "View all events on the what's on page",
                  href: '/events',
                  children: 'View all events',
                  variant: 'hollowPrimary',
                  size: 'base',
                  className: 'w-full md:w-auto',
                }}
              />
            </section>
          )}

          {venuesToRender.length > 0 && (
            <>
              {eventsToRender.length > 0 && (
                <hr className="my-10 bg-gray-100 h-[2px] w-full " />
              )}

              <section className="w-full my-10">
                <VenueCardList
                  venues={venuesToRender}
                  title="Venues"
                  link={{
                    accessibleTitle: 'View all venues on the venues page',
                    href: '/venues',
                    children: 'View all venues',
                    variant: 'hollowPrimary',
                    size: 'base',
                    className: 'w-full md:w-auto',
                  }}
                />
              </section>
            </>
          )}

          {/* Placeholder */}
          {!searchQuery && <SearchPlaceholder />}
          {/* / Placeholder */}

          {/* No Results */}
          {searchQuery && !venuesToRender.length && !eventsToRender.length && (
            <SearchNoResults />
          )}
          {/* No Results */}
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
export const getServerSideProps: GetServerSideProps<PageProps> = async () => {
  // Get the profile
  const profileResponse = await differentBreedClient.profile
    .retrieveProfile()
    .then((response) => response.payload)
    .catch(() => {
      return null;
    });

  // Handle error
  if (!profileResponse) {
    return {
      notFound: true,
    };
  }

  // Return the props
  return {
    props: {
      profile: profileResponse,
    },
  };
};

export default Page;
