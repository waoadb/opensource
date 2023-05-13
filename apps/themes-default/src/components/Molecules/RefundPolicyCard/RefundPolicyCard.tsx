/* Dependencies */
import { Heading } from '@/components/Atoms/Heading/Heading';
import { Paragraph } from '@/components/Atoms/Paragraph/Paragraph';
import { CurrencyPoundIcon } from '@heroicons/react/24/outline';

// Models
import { ClientCacheModels } from '@waoadb/contracts-client';
type Props = {
  refundPolicy: ClientCacheModels.CacheEvent['commerce_settings']['refund_policy'];
};

/**
 * Refund Policy Card
 * @param props - Component props.
 */
export const RefundPolicyCard = ({ refundPolicy }: Props) => {
  return (
    <div className="text-center flex flex-col items-center justify-center py-4 px-2 border border-gray-200 border-solid rounded-lg">
      <div className="w-full">
        <CurrencyPoundIcon width="25" height="25" className="mx-auto" />
        <Heading level="h2" style="h4" className="mt-2">
          Refund Policy
        </Heading>
        <Paragraph style="base" className="mt-1">
          {refundPolicy.description}
        </Paragraph>
      </div>
    </div>
  );
};
