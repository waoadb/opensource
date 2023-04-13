import { Heading } from '@/components/Atoms/Heading/Heading';
import { Paragraph } from '@/components/Atoms/Paragraph/Paragraph';

export const RefundPolicyCard = () => {
  return (
    <div className="bg-gray-200 min-h-28 text-center flex flex-col items-center justify-center py-4 px-2">
      <Heading level="h5" style="h5">Refund Policy</Heading>
      <Paragraph variant="large">You can get a refund up to 30 days before the event starts.</Paragraph>
    </div>
  );
};
