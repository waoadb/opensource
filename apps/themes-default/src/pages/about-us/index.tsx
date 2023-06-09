/* Dependencies */
import { GetServerSideProps } from 'next';
import { NextSeo } from 'next-seo';

// Services
import { differentBreedClient } from '@/services/differentBreedClient/differentBreedClient';

// Layouts
import Layout from '@/layout/Layout';

// Components
import { ClientCacheModels } from '@waoadb/contracts-client';
import { CircleImage } from '@/components/Molecules/CircleImage/CircleImage';
import { ProfileDetails } from '@/components/Molecules/ProfileDetails/ProfileDetails';
import { SocialLinksList } from '@/components/Molecules/SocialLinksList/SocialLinksList';
import { SupportDetails } from '@/components/Molecules/SupportDetails/SupportDetails';

// Models
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
      {/* SEO */}
      <NextSeo
        title={`${profile.title} | About Us`}
        description={`Find out more about ${profile.title}.`}
        openGraph={{
          title: `${profile.title} | About Us`,
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
      {/* / SEO */}

      {/* Main */}
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
  try {
    // Get the profile and events
    const response = await Promise.all([
      differentBreedClient.profile.retrieveProfile(),
    ]).catch((error) => {
      throw error;
    });

    // Extract responses
    const [profileResponse] = response;

    // Return the props
    return {
      props: {
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
