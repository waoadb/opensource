/* Dependencies */
import { GetServerSideProps } from 'next';
import { NextSeo } from 'next-seo';

// Services
import { differentBreedClient } from '@/services/differentBreedClient/differentBreedClient';

// Layouts
import Layout from '@/Layouts/Layout';

// Components

// Models
import { ClientCacheModels } from '@waoadb/contracts-client';
import { FeaturedEventBanner } from '@/components/Organisms/FeaturedEventBanner/FeaturedEventBanner';
import { EventCardList } from '@/components/Organisms/EventCardList/EventCardList';
type PageProps = {
  events: ClientCacheModels.CacheEvent[];
  profile: ClientCacheModels.CacheProfile;
};

/**
 * Page: Home
 * @param props - Page props.
 * @returns
 */
const Page = ({ events, profile }: PageProps) => {
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
      <Layout profile={profile}>
        <FeaturedEventBanner />
        <EventCardList title="What's On" />
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
  // Get the profile
  const profileResponse = await differentBreedClient.profile
    .retrieveProfile()
    .then((response) => response.payload)
    .catch((error) => {
      console.log(error);
      return null;
    });

  // Get the events
  const eventsResponse = await differentBreedClient.events
    .retrieveEvents({
      limit: 7,
      skip: 0,
    })
    .then((response) => response.payload)
    .catch((error) => {
      console.log(error);
      return null;
    });

  // Handle error
  if (!eventsResponse || !profileResponse) {
    return {
      notFound: true,
    };
  }

  // Return the props
  return {
    props: {
      events: eventsResponse,
      profile: profileResponse,
    },
  };
};

export default Page;
