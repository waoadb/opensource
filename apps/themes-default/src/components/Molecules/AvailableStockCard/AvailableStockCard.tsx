/* Dependencies */
// Components
import { Heading } from '@/components/Atoms/Heading/Heading';
import { Paragraph } from '@/components/Atoms/Paragraph/Paragraph';

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
  /**
   * Icon to render.
   */
  icon: React.ReactNode;
};

/**
 * Available Stock Card
 * @param props - Component props.
 */
export const AvailableStockCard = ({ title, icon, total }: Props) => {
  return (
    <div className="text-center flex flex-col items-center justify-center py-4 px-2 border border-gray-200 border-solid rounded-lg">
      <div className="w-full">
        {icon}
        <Heading level="h2" style="h4" className="mt-2">
          {total}
        </Heading>
        <Paragraph style="base" className="mt-1">
          {title}
        </Paragraph>
      </div>
    </div>
  );
};
