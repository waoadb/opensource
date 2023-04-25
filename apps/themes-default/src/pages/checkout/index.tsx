/* Dependencies */
import { useCallback, useEffect, useRef, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';

// Services
import { httpClient } from '@/services/httpClient/httpClient';

// Different Breed
import { differentBreedClient } from '@/services/differentBreedClient/differentBreedClient';
import '@waoadb/react-sdk/build/index.css';
import {
  DynamicCheckoutForms,
  DynamicCheckoutFormsImperativeMethods,
  useDifferentBreedCart,
} from '@waoadb/react-sdk';

// Layouts
import Layout from '@/layout/Layout';

// Components
import { Heading } from '@/components/Atoms/Heading/Heading';
import { CheckoutSummary } from '@/components/Molecules/CheckoutSummary/CheckoutSummary';
import { Placeholder } from '@/components/Molecules/Placeholder/Placeholder';

// Models
import { ClientCacheModels, ClientCartModels } from '@waoadb/contracts-client';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
type PageProps = {
  profile: ClientCacheModels.CacheProfile;
};

/**
 * Page: Checkout
 * @param props - Page props.
 * @returns
 */
const Page = ({ profile }: PageProps) => {
  // Hooks
  const router = useRouter();
  const dynamicFormsRef = useRef<DynamicCheckoutFormsImperativeMethods>(null);

  // State
  const [renderForm, setRenderForm] = useState(false);

  // Different Breed
  const {
    retrieveCheckoutConfig,
    cartState: { cart, cart_id, checkoutConfig },
  } = useDifferentBreedCart(differentBreedClient);

  // Callbacks
  const handleSubmit = useCallback(
    async (payload: ClientCartModels.ValidateCartRequest) => {
      try {
        //  Validate the cart
        await differentBreedClient.cart
          .validateCart(cart_id!, {
            ...payload,
          })
          .catch((error) => {
            throw error;
          });

        // Finalise the cart
        await httpClient.markCartAsSold(cart_id!, payload).catch((error) => {
          throw error;
        });

        // Set the orders
        router.push('/checkout/complete');
      } catch (error) {
        console.log(error);
      }
    },
    [cart_id, router]
  );

  // UseEffects
  useEffect(() => {
    if (cart) {
      retrieveCheckoutConfig();
      setRenderForm(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);

  return (
    <>
      {/* SEO */}
      <NextSeo
        title={`${profile.title} | Cart`}
        noindex={true}
        nofollow={true}
        description={`Proceed to purchase the active items in your cart.`}
        openGraph={{
          title: `${profile.title} | Checkout`,
          description: `Proceed to purchase the active items in your cart.`,
          images: [
            {
              url: profile.image?.url || '',
              alt: profile.image?.alt_text || '',
            },
          ],
        }}
        canonical={`${process.env.NEXT_PUBLIC_SITE_URL}/checkout`}
      />
      {/* / SEO */}

      {/* Main */}
      <Layout profile={profile}>
        {/* Checkout */}
        {cart && cart.entries.length > 0 && (
          <section className="container mx-auto my-12 lg:mt-4 lg:py-10 min-h-70vh">
            <Heading level="h1" style="h1">
              Your Cart
            </Heading>

            <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-4 mt-10">
              {/* Cart Entries */}
              <section className="w-full lg:col-span-2">
                <Heading level="h2" style="h2" className="mb-4">
                  Required Details
                </Heading>
                {renderForm && checkoutConfig && (
                  <DynamicCheckoutForms
                    cart={cart}
                    checkoutConfig={checkoutConfig}
                    onSubmit={handleSubmit}
                    ref={dynamicFormsRef}
                  />
                )}
              </section>
              {/* / Cart Entries */}

              {/* Summary */}
              <section className="w-full">
                <Heading level="h2" style="h2" className="mb-4">
                  Summary
                </Heading>
                <CheckoutSummary
                  cart={cart}
                  handleFinalise={() =>
                    dynamicFormsRef.current?.triggerSubmit()
                  }
                />
              </section>
              {/* / Summary */}
            </div>
          </section>
        )}
        {/* / Checkout */}
        {/* Placeholder */}
        {cart && !cart.entries.length && (
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
