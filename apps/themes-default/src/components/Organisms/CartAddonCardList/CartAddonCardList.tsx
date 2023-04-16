/* Dependencies */
// Components
import { CartAddonCard } from '@/components/Molecules/CartAddonCard/CartAddonCard';

// Models
import { ClientCartModels } from '@waoadb/contracts-client';
type Props = {
  /**
   * Addons to render.
   */
  addons: ClientCartModels.CartEntryAddon[];
  /**
   * Cart entry id.
   */
  entry_id: string;
  /**
   * Handle Submit
   */
  handleSubmit: (
    payload: ClientCartModels.RemoveAddonFromCartRequest,
    callback: () => void
  ) => void;
};

/**
 * Cart Addon Card List
 * @param props - Component props.
 * @returns
 */
export const CartAddonCardList = ({
  addons,
  entry_id,
  handleSubmit,
}: Props) => {
  return (
    <ul className="grid grid-cols-1 divide-y divide-gray-500">
      {addons.map((addon) => (
        <CartAddonCard
          key={addon.addon_entry_id}
          entry_id={entry_id}
          addon={addon}
          onSubmit={handleSubmit}
        />
      ))}
    </ul>
  );
};
