/* Dependencies */
import Link from 'next/link';

// Helpers
import { formatVenueAddress } from '@/helpers/formatVenueAddress/formatVenueAddress';

// Components
import { Heading } from '@/components/Atoms/Heading/Heading';
import { Paragraph } from '@/components/Atoms/Paragraph/Paragraph';

// Models
import { ClientCacheModels } from '@waoadb/contracts-client';
type Props = {
  supportDetails: ClientCacheModels.CacheSupportDetails;
};

/**
 * Support Details
 * @param props - Component props.
 * @returns
 */
export const SupportDetails = ({ supportDetails }: Props) => {
  return (
    <div>
      <Heading level="h2" style="h4" className="mb-2">
        Support details
      </Heading>
      <address
        className="text-base font-normal not-italic my-2"
        dangerouslySetInnerHTML={{ __html: formatVenueAddress(supportDetails) }}
      />
      {(supportDetails.email || supportDetails.tel) && (
        <div className="w-full grid grid-cols-1 gap-2">
          {supportDetails.email && (
            <Paragraph>
              Email Address:{' '}
              <Link
                href={`mailto:${supportDetails.email}`}
                className="underline hover:text-indigo-600 focus:text-indigo-600 transition-colors duration-200"
                title={`Send an email to: ${supportDetails.email}`}
              >
                {supportDetails.email}
              </Link>
            </Paragraph>
          )}
          {supportDetails.tel && (
            <Paragraph>
              Phone Number:{' '}
              <Link
                href={`tel:${supportDetails.tel}`}
                className="underline hover:text-indigo-600 focus:text-indigo-600 transition-colors duration-200"
                title={`Call: ${supportDetails.tel}`}
              >
                {supportDetails.tel}
              </Link>
            </Paragraph>
          )}
        </div>
      )}
    </div>
  );
};
