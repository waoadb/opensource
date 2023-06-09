/* Dependencies */
// Components
import { Heading } from '@/components/Atoms/Heading/Heading';
import { Paragraph } from '@/components/Atoms/Paragraph/Paragraph';
import { MapPinIcon } from '@heroicons/react/24/outline';

/**
 * TBC Event Card
 * @param props - Component props.
 */
export const TBCEventCard = () => {
  return (
    <div className="text-center flex flex-col items-center justify-center py-4 px-2 border border-gray-200 border-solid rounded-lg">
      <div className="w-full">
        <MapPinIcon width="25" height="25" className="mx-auto" />
        <Heading level="h2" style="h4" className="mt-2">
          Location Coming Soon
        </Heading>
        <Paragraph style="base" className="mt-1">
          The location of this event will be posted soon!{' '}
        </Paragraph>
      </div>
    </div>
  );
};
