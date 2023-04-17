/* Dependencies */
import { GetServerSideProps } from 'next';
import { NextSeo } from 'next-seo';

// Services
import { differentBreedClient } from '@/services/differentBreedClient/differentBreedClient';

// Layouts
import Layout from '@/Layouts/Layout';

// Components
import { Heading } from '@/components/Atoms/Heading/Heading';

// Models
import { ClientCacheModels } from '@waoadb/contracts-client';
import { Paragraph } from '@/components/Atoms/Paragraph/Paragraph';
import { Link } from '@/components/Atoms/Link/Link';

type PageProps = {
  profile: ClientCacheModels.CacheProfile;
};

/**
 * Page: Order Complete
 * @param props - Page props.
 * @returns
 */
const Page = ({ profile }: PageProps) => {
  return (
    <>
      {/* SEO */}
      <NextSeo
        title={`${profile.title} | Checkout Complete`}
        noindex={true}
        nofollow={true}
        description="Your order has been processed successfully."
        openGraph={{
          title: `${profile.title} | Checkout Complete`,
          description: 'Your order has been processed successfully.',
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
        <section className="container mx-auto my-12 lg:mt-4 py-10 text-center">
          <Heading level="h1" style="h1" className="mb-2">
            Order Complete!
          </Heading>
          <Paragraph style="base" className="mt-4 max-w-lg mx-auto">
            Hey there! Your order has been processed and we&apos;re on it!
            You&apos;ll get an email confirmation real soon with a link to your
            tickets.
          </Paragraph>
          <Link
            variant="primary"
            href="/events"
            accessibleTitle="Return to the upcoming events page"
            className="mt-6"
          >
            Return to events
          </Link>
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
