/* Dependencies */
import { Heading } from '@/components/Atoms/Heading/Heading';

// Models
type Props = {
  /**
   * Total to render.
   */
  total: number;
  /**
   * Title to render.
   */
  title: string;
};

/**
 * Available Stock Card
 * @param props - Component props.
 * @returns
 */
export const AvailableStockCard = ({ total, title }: Props) => {
  return (
    <div className="bg-gray-200 min-h-28 text-center flex flex-col items-center justify-center py-4 px-2">
      <Heading level="h2" style="h3">
        {total}
        <span className="-full block mt-2 text-xl font-normal">{title}</span>
      </Heading>
    </div>
  );
};
