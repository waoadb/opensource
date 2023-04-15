/* Dependencies */
import { useMemo } from 'react';

// Components
import { PerformanceCard } from '@/components/Molecules/PerformanceCard/PerformanceCard';

// Models
import { ClientCacheModels } from '@waoadb/contracts-client';
type Props = {
  /**
   * Performances to render.
   */
  performances: ClientCacheModels.CachePerformance[];
  /**
   * Handles book now click.
   */
  handleBookNow: (performance_id: string) => void;
};

/**
 * Performance Card List
 * @param props - Component props.
 * @returns
 */
export const PerformanceCardList = ({ performances, handleBookNow }: Props) => {
  const accessibleReadOut = useMemo(() => {
    return `Render Updated: Now showing ${performances.length} new performances for this event.`;
  }, [performances]);

  return (
    <>
      <span className="sr-only" aria-live="polite" aria-atomic={true}>
        {accessibleReadOut}
      </span>
      <ul className="flex flex-col gap-4 divide-y divide-gray-400">
        {performances.map((performance) => {
          return (
            <PerformanceCard
              key={performance.performance_id}
              performance={performance}
              handleBookNow={handleBookNow}
            />
          );
        })}
      </ul>
    </>
  );
};
