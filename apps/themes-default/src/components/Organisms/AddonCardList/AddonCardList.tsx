/* Dependencies */
// Components
import { AddonCard } from '@/components/Molecules/AddonCard/AddonCard';

// Models
import {
  ClientCacheModels,
  ClientCartModels,
  ClientGenericModels,
} from '@waoadb/contracts-client';
type Props = {
  /**
   * Addons to render.
   */
  addons: ClientCacheModels.CachePerformance['stock']['addons'];
  /**
   * Event id.
   */
  event_id: string;
  /**
   * Performance id.
   */
  performance_id: string;
  /**
   * Currency
   */
  currency: ClientGenericModels.CurrencyCode['code'];
  /**
   * Handle Submit
   */
  handleSubmit: (
    payload: ClientCartModels.AddAddonToCartRequest,
    title: string,
    callback: () => void
  ) => void;
};

/**
 * Addon Card List
 * @param params - Component props.
 * @returns
 */
export const AddonCardList = ({
  event_id,
  performance_id,
  addons,
  handleSubmit,
  currency,
}: Props) => {
  return (
    <ul className="grid grid-cols-1 divide-y divide-gray-500">
      {addons.map((addon) => (
        <AddonCard
          key={addon.addon_id}
          event_id={event_id}
          performance_id={performance_id}
          addon={addon}
          onSubmit={handleSubmit}
          currency={currency}
        />
      ))}
    </ul>
  );
};
