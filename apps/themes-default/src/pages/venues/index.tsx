/* Dependencies */
import { useCallback, useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import { NextSeo } from 'next-seo';
import { BuildingOfficeIcon } from '@heroicons/react/24/outline';

// Services
import { differentBreedClient } from '@/services/differentBreedClient/differentBreedClient';

// Layouts
import Layout from '@/Layouts/Layout';

// Components
import { Pagination } from '@/components/Molecules/Pagination/Pagination';
import { Heading } from '@/components/Atoms/Heading/Heading';
import { Placeholder } from '@/components/Molecules/Placeholder/Placeholder';
import { VenueCardList } from '@/components/Organisms/VenueCardList/VenueCardList';

// Client Side Only Components
const VenueFilters = dynamic(
  () =>
    import('@/components/Molecules/VenueFilters/VenueFilters').then(
      (component) => component.VenueFilters
    ),
  {
    ssr: false,
  }
);

// Models
import { ClientCacheModels } from '@waoadb/contracts-client';
type PageProps = {
  profile: ClientCacheModels.CacheProfile;
  initialVenues: ClientCacheModels.CacheVenue[];
};

/**
 * Page: Venues
 * @param props - Page props.
 * @returns
 */
const Page = ({ profile, initialVenues }: PageProps) => {
  //  // State
  const [venues, setVenues] =
    useState<ClientCacheModels.CacheVenue[]>(initialVenues);
  const [totalVenues, setTotalVenues] = useState<number>(initialVenues.length);
  const [filters, setFilters] =
    useState<ClientCacheModels.RetrieveVenuesRequest>({
      limit: 6,
      skip: 0,
    });

  // Callbacks
  const retrieveVenues = useCallback(async () => {
    const response = await differentBreedClient.venues
      .retrieveVenues({
        ...filters,
      })
      .catch(() => {
        return null;
      });

    // Set Venues
    if (response) {
      setVenues(response.payload);
      setTotalVenues(response.meta.total);
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
    retrieveVenues();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  return (
    <>
      {/* SEO */}
      <NextSeo
        title={`${profile.title} | Venues`}
        description={`Discover the venues where ${profile.title} events take place.`}
        openGraph={{
          title: `${profile.title} | Venues`,
          description: `Discover the venues where ${profile.title} events take place.`,
          images: [
            {
              url: profile.image?.url || '',
              alt: profile.image?.alt_text || '',
            },
          ],
        }}
        canonical={`${process.env.NEXT_PUBLIC_SITE_URL}/venues`}
      />
      {/* / SEO */}

      {/* Main */}
      <Layout profile={profile}>
        <section className="container mx-auto my-12 lg:mt-4 py-10">
          <Heading level="h1" style="h1" className="mb-4">
            Venues
          </Heading>

          {/* Venue Filters */}
          <VenueFilters onSubmit={handleFiltersChange} />
          {/* / Venue Filters */}

          {/* Venue List */}
          {totalVenues > 0 && (
            <>
              <div className="w-full my-4">
                <VenueCardList venues={venues} />
                {totalVenues > filters.limit && (
                  <div className="w-full my-4">
                    <Pagination
                      pageCount={Math.ceil(totalVenues / filters.limit)}
                      currentPage={Math.ceil(filters.skip / filters.limit)}
                      onPageChange={handlePageChange}
                    />
                  </div>
                )}
              </div>
            </>
          )}
          {/* / Venue List */}

          {/* Placeholder */}
          {totalVenues === 0 && (
            <div className="w-full my-4">
              <Placeholder
                title="No Venues Found"
                content=""
                icon={
                  <BuildingOfficeIcon
                    width={25}
                    height={25}
                    className="mx-auto"
                  />
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
  try {
    // Get the profile and events
    const response = await Promise.all([
      differentBreedClient.profile.retrieveProfile(),
      differentBreedClient.venues.retrieveVenues({
        limit: 6,
        skip: 0,
      }),
    ]).catch((error) => {
      throw error;
    });

    // Extract responses
    const [profileResponse, venuesRepsonse] = response;

    // Return the props
    return {
      props: {
        profile: profileResponse.payload,
        initialVenues: venuesRepsonse.payload,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

// Export the page
export default Page;
