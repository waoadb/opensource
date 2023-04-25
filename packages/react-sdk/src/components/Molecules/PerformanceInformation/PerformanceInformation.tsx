/* Dependencies */
import { useMemo } from 'react';

// Helpers
import { formatDateRange } from '../../../helpers/formatDateRange/formatDateRange';

// Components
import { Paragraph } from '../../Atoms/Paragraph/Paragraph';

// Models
import { ClientCartModels } from '@waoadb/contracts-client';
type Props = {
  /**
   * The performance to display.
   */
  performance: ClientCartModels.CartPerformance;
};

/**
 * Performance Information
 * @param props - The component props.
 */
export const PerformanceInformation = ({ performance }: Props) => {
  // State
  const date = useMemo(() => {
    return formatDateRange(
      performance.start_date,
      performance.start_time,
      performance.end_date,
      performance.end_time,
      true
    );
  }, [performance]);

  // Render
  return <Paragraph style="base">{date}</Paragraph>;
};
