/* Dependencies */
import { useCallback, useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';

// Helpers
import { createCartCallbackUrls } from '@/helpers/createCartCallbackUrls/createCartCallbackUrls';

// Different Breed
import { differentBreedClient } from '@/services/differentBreedClient/differentBreedClient';
import { useDifferentBreedCart } from '@waoadb/react-sdk';

// Layouts
import Layout from '@/layout/Layout';

// Components
import { Heading } from '@/components/Atoms/Heading/Heading';
import { Placeholder } from '@/components/Molecules/Placeholder/Placeholder';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { CartSummary } from '@/components/Molecules/CartSummary/CartSummary';
import { CartEntries } from '@/components/Organisms/CartEntries/CartEntries';

// Models
import { ClientCacheModels } from '@waoadb/contracts-client';
type PageProps = {
  profile: ClientCacheModels.CacheProfile;
};

/**
 * Page: Cart
 * @param props - Page props.
 * @returns
 */
const Page = ({ profile }: PageProps) => {
  // Hooks
  const router = useRouter();

  // State
  const [showCreateCustomer, setShowCreateCustomer] = useState(false);

  // Different Breed
  const {
    cartState: { cart, cart_id, checkoutLink },
    retrieveCheckoutLink,
  } = useDifferentBreedCart(differentBreedClient, createCartCallbackUrls());

  // Callbacks
  const handleCheckoutClick = useCallback(() => {
    if (!cart) return null;

    // Create checkout link
    retrieveCheckoutLink();
  }, [router, cart]);

  // Effects
  useEffect(() => {
    if (checkoutLink) {
      window.location.href = checkoutLink.checkout_link;
    }
  }, [checkoutLink]);

  return (
    <>
      {/* SEO */}
      <NextSeo
        title={`${profile.title} | Cart`}
        noindex={true}
        nofollow={true}
        description={`View the active items in your cart.`}
        openGraph={{
          title: `${profile.title} | Cart`,
          description: `View the active items in your cart.`,
          images: [
            {
              url: profile.image?.url || '',
              alt: profile.image?.alt_text || '',
            },
          ],
        }}
        canonical={`${process.env.NEXT_PUBLIC_SITE_URL}/cart`}
      />
      {/* / SEO */}

      {/* Main */}
      <Layout profile={profile}>
        {/* Placeholder */}
        {(!cart || !cart.entries.length) && (
          <section className="w-full min-h-70vh flex flex-row flex-wrap">
            <Placeholder
              title="Your cart is empty"
              content="Add some items to your cart to view them here."
              icon={
                <ShoppingCartIcon width={24} height={24} className="mx-auto" />
              }
            />
          </section>
        )}
        {/* / Placeholder */}

        {/* Cart */}
        {cart && cart.entries.length > 0 && (
          <section className="container mx-auto my-12 lg:mt-4 lg:py-10 min-h-70vh">
            <Heading level="h1" style="h1">
              Your Cart
            </Heading>

            <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-4 mt-10">
              {/* Cart Entries */}
              <section className="w-full lg:col-span-2">
                <Heading level="h2" style="h2" className="mb-4">
                  Entries
                </Heading>
                <CartEntries />
              </section>
              {/* / Cart Entries */}

              {/* Summary */}
              <section className="w-full">
                <Heading level="h2" style="h2" className="mb-4">
                  Summary
                </Heading>
                <CartSummary
                  cart={cart}
                  handleCheckoutClick={handleCheckoutClick}
                />
              </section>
              {/* / Summary */}
            </div>
          </section>
        )}
        {/* / Cart */}
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
