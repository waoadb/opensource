/* Dependencies */
// Components
import { Heading } from '@/components/Atoms/Heading/Heading';
import { Paragraph } from '@/components/Atoms/Paragraph/Paragraph';
import { VideoCameraIcon } from '@heroicons/react/24/outline';

/**
 * Online Event Card
 * @param props - Component props.
 */
export const OnlineEventCard = () => {
  return (
    <div className="text-center flex flex-col items-center justify-center py-4 px-2 border border-gray-200 border-solid rounded-lg">
      <div className="w-full">
        <VideoCameraIcon width="25" height="25" className="mx-auto" />
        <Heading level="h2" style="h4" className="mt-2">
          Online Event
        </Heading>
        <Paragraph style="base" className="mt-1">
          This event has no physical location. <br /> Details will be sent with
          your purchased tickets
        </Paragraph>
      </div>
    </div>
  );
};
