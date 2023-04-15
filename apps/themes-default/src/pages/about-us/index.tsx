/* Dependencies */
import { GetServerSideProps } from 'next';
import { NextSeo } from 'next-seo';
import { useMemo } from 'react';

// Services
import { differentBreedClient } from '@/services/differentBreedClient/differentBreedClient';

// Layouts
import Layout from '@/Layouts/Layout';

// Components
import { CalendarIcon } from '@heroicons/react/24/outline';
import { FeaturedEventBanner } from '@/components/Organisms/FeaturedEventBanner/FeaturedEventBanner';
import { EventCardList } from '@/components/Organisms/EventCardList/EventCardList';
import { Placeholder } from '@/components/Molecules/Placeholder/Placeholder';

// Models
import { ClientCacheModels } from '@waoadb/contracts-client';
import { CircleImage } from '@/components/Molecules/CircleImage/CircleImage';
import { ProfileDetails } from '@/components/Molecules/ProfileDetails/ProfileDetails';
import { SocialLinksList } from '@/components/Molecules/SocialLinksList/SocialLinksList';
import { SupportDetails } from '@/components/Molecules/SupportDetails/SupportDetails';
type PageProps = {
  /**
   * The profile of the organisation.
   */
  profile: ClientCacheModels.CacheProfile;
};

/**
 * Page: About Us
 * @param props - Page props.
 * @returns
 */
const Page = ({ profile }: PageProps) => {
  return (
    <>
      <NextSeo
        title={profile.title}
        description={`Find out more about ${profile.title}.`}
        openGraph={{
          title: profile.title,
          description: `Find out more about ${profile.title}.`,
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
        <section className="w-full max-w-xl mx-auto py-10 lg:py-20 px-4 lg:px-0">
          <div className="w-full max-w-sm">
            <CircleImage profile={profile} />
          </div>

          <div className="w-full my-8">
            <ProfileDetails profile={profile} />
          </div>
          {profile.social_media && profile.social_media.length > 0 && (
            <SocialLinksList socialItems={profile.social_media} />
          )}
          {profile.support_details && (
            <div className="w-full my-8">
              <SupportDetails supportDetails={profile.support_details} />
            </div>
          )}
        </section>
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
