'use client';

/* Dependencies */
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';

// Services
import { differentBreedClient } from '@/services/differentBreedClient/differentBreedClient';

// Layouts
import Layout from '@/Layouts/Layout';

// Components
import { Error404 } from '@/components/Organisms/Error404/Error404';

// Models
import { ClientCacheModels } from '@waoadb/contracts-client';

/**
 * Page: 404
 * @param props - Page props.
 * @returns
 */
const Page = () => {
  const router = useRouter();
  const [profile, setProfile] = useState<ClientCacheModels.CacheProfile>();

  // Callbacks
  const getProfile = useCallback(async () => {
    // Get the profile
    const profileResponse = await differentBreedClient.profile
      .retrieveProfile()
      .then((response) => response.payload)
      .catch((error) => {
        console.log(error);
        return null;
      });

    if (!profileResponse) {
      router.push('/500');
      return null;
    }

    setProfile(profileResponse);
  }, []);

  // Effects
  useEffect(() => {
    getProfile();
    // eslint-disable-exhaustive-deps
  }, []);

  // Handle No Profile
  if (!profile) {
    return null;
  }

  return (
    <>
      <NextSeo
        title={`${profile.title} | Not Found`}
        nofollow={true}
        noindex={true}
        description={`Page could not be found.`}
        openGraph={{
          title: `${profile.title} | Not Found`,
          description: `Page could not be found.`,
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
        <Error404 />
      </Layout>
    </>
  );
};

export default Page;
