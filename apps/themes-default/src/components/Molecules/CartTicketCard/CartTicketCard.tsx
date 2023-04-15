/* Dependencies */
import { Formik } from 'formik';

// Components
import { Heading } from '@/components/Atoms/Heading/Heading';
import { Paragraph } from '@/components/Atoms/Paragraph/Paragraph';
import { Button } from '@/components/Atoms/Button/Button';

// Models
import { ClientCartModels } from '@waoadb/contracts-client';

type Props = {
  /**
   * Ticket
   */
  ticket: ClientCartModels.CartEntryTicket;
  /**
   * Cart entry id
   */
  entry_id: string;
  /**
   * Handle Submit
   */
  onSubmit: (ticket: ClientCartModels.RemoveTicketFromCartRequest) => void;
};

/**
 * Cart Ticket Card
 * @param param props - Component props.
 * @returns
 */

export const CartTicketCard = ({ ticket, entry_id, onSubmit }: Props) => {
  return (
    <li className="w-full py-4">
      <Heading level="h3" className="mb-2">
        {ticket.name}
      </Heading>

      {ticket.description && (
        <Paragraph className="mt-0">{ticket.description}</Paragraph>
      )}

      <Paragraph className="mt-1">
        <span aria-atomic={true} aria-live="polite">
          <span className="sr-only">Price:</span>£{ticket.price.toFixed(2)}
        </span>
      </Paragraph>

      <div className="w-full mt-2">
        <Formik
          initialValues={{
            ticket_entry_id: ticket.ticket_entry_id,
            entry_id,
          }}
          validationSchema={null}
          onSubmit={(values) => {
            onSubmit({
              ticket_entry_id: values.ticket_entry_id,
              entry_id,
            });
          }}
          isInitialValid={true}
        >
          {({ handleSubmit, isSubmitting, isValid }) => (
            <form
              onSubmit={handleSubmit}
              className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 items-center"
            >
              <div className="w-full p-1 h-full flex flex-row items-center bg-gray-100">
                <p>Accessibility Options Soon!</p>
              </div>
              <div className="w-full grid grid-cols-1 md:grid-cols-3 items-end gap-2">
                <div className="w-full md:col-span-2 lg:col-span-2"></div>
                <Button
                  className="w-full mt-2 md:mt-0"
                  type="submit"
                  variant="hollowAlert"
                  accessibleTitle={`Remove single ${
                    ticket.name
                  } ticket, priced at £${ticket.price.toFixed(
                    2
                  )} from your cart.`}
                  disabled={!isValid || isSubmitting}
                >
                  Remove
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </li>
  );
};