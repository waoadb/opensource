/* Dependencies */
import { useCallback, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';

// Helpers
import { formatDateRange } from '@/helpers/formatDateRange/formatDateRange';

// Services
import { useDifferentBreedCart } from '@/context/DifferentBreedCart/hooks/useDifferentBreedCart';

// Components
import { Heading } from '@/components/Atoms/Heading/Heading';
import { CartAddonCardList } from '@/components/Organisms/CartAddonCardList/CartAddonCardList';
import { Paragraph } from '@/components/Atoms/Paragraph/Paragraph';
import { CartTicketCardList } from '@/components/Organisms/CartTicketCardList/CartTicketCardList';
import { Accordion } from '@/components/Organisms/Accordion/Accordion';

/**
 * Cart Entries
 * @returns
 */
export const CartEntries = () => {
  // Different Breed
  const {
    removeAddonFromCart,
    removeTicketFromCart,
    cartState: { cart, cart_id },
  } = useDifferentBreedCart();

  // Handle no cart
  if (!cart) return null;

  return (
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
  );
};
