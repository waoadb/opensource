/* Dependencies */
import { useMemo } from 'react';

// Helpers
import { formatDateRange } from '@/helpers/formatDateRange/formatDateRange';

// Components
import { Heading } from '@/components/Atoms/Heading/Heading';
import { Button } from '@/components/Atoms/Button/Button';
import { Paragraph } from '@/components/Atoms/Paragraph/Paragraph';

// Models
import { ClientCacheModels } from '@waoadb/contracts-client';
import { AccessibilityList } from '../AccessibilityList/AccessibilityList';
type Props = {
  /**
   * Performance to be rendered.
   */
  performance: ClientCacheModels.CachePerformance;
  /**
   * Handles clicking the book now button.
   */
  handleBookNow: (performance_id: string) => void;
};

/**
 * Performance Card
 * @param props - Component props.
 * @returns
 */
export const PerformanceCard = ({ performance, handleBookNow }: Props) => {
  const performanceDateRange = useMemo(
    () =>
      formatDateRange(
        performance.details.start_date,
        performance.details.start_time,
        performance.details.end_date,
        performance.details.end_time
      ),
    [performance]
  );
  return (
    <li className="pb-4 pt-8 w-full">
      <div className="flex flex-row flex-wrap items-center justify-between gap-4">
        <div className="w-full lg:w-auto lg:grow space-y-1">
          <Heading level="h5" style="h4">
            {performance.details.title}
          </Heading>
          <Paragraph>{performanceDateRange}</Paragraph>
        </div>
        <div className="w-full lg:w-auto lg:shrink text-right">
          {performance.accessibility?.enabled && (
            <AccessibilityList
              accessibility={performance.accessibility.items.map(
                (item) => item.id
              )}
              align="right"
            />
          )}
          <Button
            accessibleTitle={`Open booking modal for performance: ${performanceDateRange}`}
            className="w-full xl:w-auto"
            variant="primary"
          >
            Book now
          </Button>
        </div>
      </div>
    </li>
  );
};
