/* Dependencies */
// Components
import { CartTicketCard } from '@/components/Molecules/CartTicketCard/CartTicketCard';

// Models
import {
  ClientCartModels,
  ClientGenericModels,
} from '@waoadb/contracts-client';
type Props = {
  /**
   * Tickets to render.
   */
  tickets: ClientCartModels.CartTicket[];
  /**
   * Currency
   */
  currency: ClientGenericModels.CurrencyCode['code'];
  /**
   * Cart entry id.
   */
  entry_id: string;
  /**
   * Handle Submit
   */
  handleSubmit: (
    payload: ClientCartModels.RemoveTicketFromCartRequest,
    title: string,
    callback: () => void
  ) => void;
};

/**
 * Cart Ticket Card List
 * @param props - Component props.
 * @returns
 */
export const CartTicketCardList = ({
  tickets,
  entry_id,
  currency,
  handleSubmit,
}: Props) => {
  return (
    <ul className="grid grid-cols-1 divide-y divide-gray-200">
      {tickets.map((ticket) => (
        <CartTicketCard
          key={ticket.ticket_entry_id}
          entry_id={entry_id}
          ticket={ticket}
          onSubmit={handleSubmit}
          currency={currency}
        />
      ))}
    </ul>
  );
};
