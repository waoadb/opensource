/* Dependencies */
import { useMemo } from 'react';

// Helpers
import { formatCurrency } from '@waoadb/js-client-sdk';
import { formatDateRange } from '@/helpers/formatDateRange/formatDateRange';

// Components
import { Paragraph } from '@/components/Atoms/Paragraph/Paragraph';
import { Heading } from '@/components/Atoms/Heading/Heading';
import { Button } from '@/components/Atoms/Button/Button';

// Models
import { ClientCartModels } from '@waoadb/contracts-client';
type Props = {
  /**
   * Cart
   */
  cart: ClientCartModels.Cart;
  /**
   * Handle finalise click.
   */
  handleFinalise: () => void;
};

/**
 * Checkout Summary
 * @param props - Component props.
 * @returns
 */
export const CheckoutSummary = ({ cart, handleFinalise }: Props) => {
  // Memo
  const cartTotal = useMemo(() => {
    return cart.entries.reduce((prev, next) => prev + next.entry_total, 0);
  }, [cart]);

  return (
    <div className="px-2 rounded-md border border-gray-100 border-solid">
      {/* Cart Entries */}
      <section className="w-full space-y-4 py-2">
        <ul className="space-y-2">
          {cart.entries.map((entry) => {
            return (
              <li
                key={entry.entry_id}
                className="w-full py-4 px-4 bg-gray-100/70"
              >
                <Heading level="h3" style="h3">
                  {entry.event.name}
                </Heading>
                <Paragraph
                  style="small"
                  className="block w-full mt-1 mb-4"
                  suppressHydrationWarning={true}
                >
                  {formatDateRange(
                    entry.performance.start_date,
                    entry.performance.start_time,
                    entry.performance.end_date,
                    entry.performance.end_time,
                    true
                  )}
                </Paragraph>

                {entry.tickets?.length > 0 && (
                  <>
                    <Heading level="h4" style="h4">
                      Tickets
                    </Heading>
                    <ul className="w-full mt-1 grid grid-cols-1 gap-1">
                      {entry.tickets.map((ticket) => {
                        return (
                          <li
                            key={ticket.ticket_entry_id}
                            className="w-full py-1 flex flex-row flex-wrap justify-between"
                          >
                            <Paragraph
                              style="small"
                              className="w-full max-w-[calc(100%-100px)]"
                            >
                              {ticket.name}
                            </Paragraph>
                            <Paragraph
                              style="small"
                              className="w-auto font-semibold"
                            >
                              {formatCurrency(ticket.price, cart.currency)}
                            </Paragraph>
                          </li>
                        );
                      })}
                    </ul>
                  </>
                )}

                {entry.addons.length > 0 && (
                  <>
                    <hr className="h-[2px] bg-gray-50 w-full my-2" />

                    <Heading level="h4" style="h4">
                      Addons
                    </Heading>
                    <ul className="w-full mt-1 grid grid-cols-1 gap-1">
                      {entry.addons.map((addon) => {
                        return (
                          <li
                            key={addon.addon_entry_id}
                            className="w-full py-1 flex flex-row flex-wrap justify-between"
                          >
                            <Paragraph
                              style="small"
                              className="w-full max-w-[calc(100%-100px)]"
                            >
                              {addon.name}
                            </Paragraph>
                            <Paragraph
                              style="small"
                              className="w-auto font-semibold"
                            >
                              {formatCurrency(addon.price, cart.currency)}
                            </Paragraph>
                          </li>
                        );
                      })}
                    </ul>
                  </>
                )}

                {entry.fees.length > 0 && (
                  <>
                    <hr className="h-[2px] bg-gray-50 w-full my-2" />

                    <Heading level="h4" style="h4">
                      Fees
                    </Heading>
                    <ul className="w-full mt-1 grid grid-cols-1 gap-1">
                      {entry.fees.map((fee) => {
                        return (
                          <li key={fee.fee_entry_id} className="w-full py-1 ">
                            <div className="w-full flex flex-row flex-wrap justify-between">
                              <Paragraph
                                style="small"
                                className="w-full max-w-[calc(100%-100px)]"
                              >
                                {fee.title}
                              </Paragraph>
                              <Paragraph
                                style="small"
                                className="w-auto font-semibold"
                              >
                                + {formatCurrency(fee.total, cart.currency)}
                              </Paragraph>
                            </div>
                            {fee.description && (
                              <Paragraph
                                style="small"
                                className="block w-full mt-1"
                              >
                                {fee.description}
                              </Paragraph>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </>
                )}

                {entry.discounts.length > 0 && (
                  <>
                    <hr className="h-[2px] bg-gray-50 w-full my-2" />

                    <Heading level="h4" style="h4">
                      Discount&apos;s
                    </Heading>
                    <ul className="w-full mt-1 grid grid-cols-1 gap-1">
                      {entry.discounts.map((discount) => {
                        return (
                          <li
                            key={discount.discount_entry_id}
                            className="w-full py-1 "
                          >
                            <div className="w-full flex flex-row flex-wrap justify-between">
                              <Paragraph
                                style="small"
                                className="w-full max-w-[calc(100%-100px)]"
                              >
                                {discount.title}
                              </Paragraph>
                              <Paragraph
                                style="small"
                                className="w-auto font-semibold"
                              >
                                -{' '}
                                {formatCurrency(discount.total, cart.currency)}
                              </Paragraph>
                            </div>
                            {discount.description && (
                              <Paragraph
                                style="small"
                                className="block w-full mt-1"
                              >
                                {discount.description}
                              </Paragraph>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </>
                )}
              </li>
            );
          })}
        </ul>
      </section>
      {/* Cart Entries */}

      {/* Cart Total */}
      <section className="block space-y-4 py-2">
        <Paragraph style="base" className="w-full flex flex-row flex-wrap">
          <span className="w-full max-w-[calc(100%-150px)]">Order Total</span>
          <span className="font-semibold ml-auto text-right">
            {formatCurrency(cartTotal, cart.currency)}
          </span>
        </Paragraph>

        <div className="grid grid-cols-1 gap-2">
          <Button
            accessibleTitle={`Complete your order of ${formatCurrency(
              cartTotal,
              cart.currency
            )}`}
            variant="primary"
            className="text-lg"
            fullWidth={true}
            onClick={handleFinalise}
          >
            Complete Order
          </Button>
        </div>
      </section>
      {/* /Cart Total */}
    </div>
  );
};
