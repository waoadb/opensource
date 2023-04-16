/* Dependencies */
import { useCallback, useState } from 'react';
import { GetServerSideProps } from 'next';
import { NextSeo } from 'next-seo';

// Helpers
import { formatDateRange } from '@/helpers/formatDateRange/formatDateRange';

// Services
import { differentBreedClient } from '@/services/differentBreedClient/differentBreedClient';
import { useDifferentBreedCart } from '@/context/DifferentBreedCart/hooks/useDifferentBreedCart';

// Layouts
import Layout from '@/Layouts/Layout';

// Components
import { Heading } from '@/components/Atoms/Heading/Heading';
import { Placeholder } from '@/components/Molecules/Placeholder/Placeholder';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { CartSummary } from '@/components/Molecules/CartSummary/CartSummary';
import { CartAddonCardList } from '@/components/Organisms/CartAddonCardList/CartAddonCardList';
import { Paragraph } from '@/components/Atoms/Paragraph/Paragraph';
import { CartTicketCardList } from '@/components/Organisms/CartTicketCardList/CartTicketCardList';

// Models
import { ClientCacheModels } from '@waoadb/contracts-client';
import { Accordion } from '@/components/Organisms/Accordion/Accordion';
type PageProps = {
  profile: ClientCacheModels.CacheProfile;
};

/**
 * Page: Cart
 * @param props - Page props.
 * @returns
 */
const Page = ({ profile }: PageProps) => {
  // Different Breed
  const {
    removeAddonFromCart,
    removeTicketFromCart,
    cartState: { cart, cart_id },
  } = useDifferentBreedCart();

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
        canonical={`${process.env.NEXT_PUBLIC_SITE_URL}/search`}
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
              <section className="w-full lg:col-span-2">
                <Heading level="h2" style="h2" className="mb-4">
                  Entries
                </Heading>
                <ul className="w-full space-y-4">
                  {cart.entries.map((entry, index) => (
                    <Accordion
                      title={entry.event.name}
                      key={entry.entry_id}
                      defaultOpen={index === 0}
                    >
                      <Paragraph className="w-full">
                        {formatDateRange(
                          entry.performance.start_date,
                          entry.performance.start_time,
                          entry.performance.end_date,
                          entry.performance.end_time,
                          true
                        )}
                      </Paragraph>

                      <section className="w-full mt-4">
                        <Heading level="h4" style="h4">
                          <span className="text-indigo-700 inline-block border-b-2 border-b-current">
                            Tickets
                          </span>
                        </Heading>
                        <CartTicketCardList
                          entry_id={entry.entry_id}
                          tickets={entry.tickets}
                          handleSubmit={(payload, callback) => {
                            removeTicketFromCart(cart_id!, payload);
                            callback();
                          }}
                        />
                      </section>

                      {entry.addons.length > 0 && (
                        <section>
                          <Heading level="h4" style="h4">
                            <span className="text-indigo-700 inline-block border-b-2 border-b-current">
                              Addons
                            </span>
                          </Heading>
                          <CartAddonCardList
                            entry_id={entry.entry_id}
                            addons={entry.addons}
                            handleSubmit={(payload, callback) => {
                              removeAddonFromCart(cart_id!, payload);
                              callback();
                            }}
                          />
                        </section>
                      )}
                    </Accordion>
                  ))}
                </ul>
              </section>
              <section className="w-full sticky">
                <Heading level="h2" style="h2" className="mb-4">
                  Summary
                </Heading>
                <CartSummary cart={cart} />
              </section>
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
