/* Dependencies */
// Components
import { TicketCard } from '@/components/Molecules/TicketCard/TicketCard';

// Models
import { ClientCacheModels, ClientCartModels } from '@waoadb/contracts-client';
type Props = {
  /**
   * Tickets to render.
   */
  tickets: ClientCacheModels.CachePerformance['stock']['tickets'];
  /**
   * Event id.
   */
  event_id: string;
  /**
   * Performance id.
   */
  performance_id: string;
  /**
   * Handle Submit
   */
  handleSubmit: (
    payload: ClientCartModels.AddTicketToCartRequest,
    callback: () => void
  ) => void;
};

/**
 * Ticket Card List
 * @param params - Component props.
 * @returns
 */
export const TicketCardList = ({
  event_id,
  performance_id,
  tickets,
  handleSubmit,
}: Props) => {
  return (
    <ul className="grid grid-cols-1 divide-y divide-gray-500">
      {tickets.map((ticket) => (
        <TicketCard
          key={ticket.ticket_id}
          event_id={event_id}
          performance_id={performance_id}
          ticket={ticket}
          onSubmit={handleSubmit}
        />
      ))}
    </ul>
  );
};
