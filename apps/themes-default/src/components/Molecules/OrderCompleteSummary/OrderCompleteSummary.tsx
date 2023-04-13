import { Heading } from '@/components/Atoms/Heading/Heading';
import { Paragraph } from '@/components/Atoms/Paragraph/Paragraph';

type OrderCompleteSummaryProps = {
  className?: string;
}
export const OrderCompleteSummary = ({ className } : OrderCompleteSummaryProps) => {
  return (
    <div className={className ?? ''}>
      <Heading level="h1" style="h2" className="mb-4">Order Complete!</Heading>
      <Paragraph variant="large">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, adipisci, alias amet aperiam atque autem
      </Paragraph>
    </div>
  );
};
