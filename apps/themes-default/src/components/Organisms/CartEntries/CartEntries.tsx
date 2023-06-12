/* Dependencies */
// Helpers
import { formatDateRange } from '@/helpers/formatDateRange/formatDateRange';
import { createCartCallbackUrls } from '@/helpers/createCartCallbackUrls/createCartCallbackUrls';

// Different Breed
import { useDifferentBreedCart } from '@waoadb/react-sdk';
import { differentBreedClient } from '@/services/differentBreedClient/differentBreedClient';

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
    cartState: { cart },
  } = useDifferentBreedCart(differentBreedClient, createCartCallbackUrls());

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
          <Paragraph className="w-full" suppressHydrationWarning={true}>
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
              handleSubmit={(payload, title, callback) => {
                removeTicketFromCart(payload, title);
                callback();
              }}
              currency={cart.currency}
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
                handleSubmit={(payload, title, callback) => {
                  removeAddonFromCart(payload, title);
                  callback();
                }}
                currency={cart.currency}
              />
            </section>
          )}
        </Accordion>
      ))}
    </ul>
  );
};
