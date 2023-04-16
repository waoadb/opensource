/* Dependencies */
import { useCallback, useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';

// Services
import { differentBreedClient } from '@/services/differentBreedClient/differentBreedClient';
import { useDifferentBreedCart } from '@/context/DifferentBreedCart/hooks/useDifferentBreedCart';
import { httpClient } from '@/services/httpClient/httpClient';

// Layouts
import Layout from '@/Layouts/Layout';

// Components
import { Heading } from '@/components/Atoms/Heading/Heading';
import { DynamicCheckoutForms } from '@/components/Organisms/DynamicCheckoutForms/DynamicCheckoutForms';

// Models
import { ClientCacheModels, ClientCartModels } from '@waoadb/contracts-client';
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

  // State
  const [renderForm, setRenderForm] = useState(false);
  const [showCreateCustomer, setShowCreateCustomer] = useState(false);

  // Different Breed
  const {
    retrieveCheckoutConfig,
    cartState: { cart, cart_id, checkoutConfig },
  } = useDifferentBreedCart();

  // Callbacks
  const handleSubmit = useCallback(
    async (payload: ClientCartModels.ValidateCartRequest) => {
      try {
        // Attach Customer

        await differentBreedClient.cart
          .validateCart(cart_id!, {
            ...payload,
          })
          .catch((error) => {
            console.log(error);
            throw error;
          });

        await httpClient.markCartAsSold(cart_id!, payload).catch((error) => {
          console.log(error);
          throw error;
        });

        alert('Cart has been marked as sold.');
        router.push('/');
      } catch (error) {
        console.log(error);
      }
    },
    [cart_id]
  );

  // UseEffects
  useEffect(() => {
    if (cart) {
      retrieveCheckoutConfig(cart.cart_id);
      setRenderForm(true);
    }
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
                  Entries
                </Heading>
                {renderForm && checkoutConfig && (
                  <DynamicCheckoutForms
                    cart={cart}
                    checkoutConfig={checkoutConfig}
                    onSubmit={handleSubmit}
                  />
                )}
              </section>
              {/* / Cart Entries */}

              {/* Summary */}
              <section className="w-full">
                <Heading level="h2" style="h2" className="mb-4">
                  Summary
                </Heading>
                {/* <CheckoutSummary
                  cart={cart}
                  handleCheckoutClick={handleCheckoutClick}
                /> */}
              </section>
              {/* / Summary */}
            </div>
          </section>
        )}
        {/* / Checkout */}
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
