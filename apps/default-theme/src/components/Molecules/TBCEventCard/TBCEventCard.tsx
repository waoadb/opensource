import { Heading } from '@/components/Atoms/Heading/Heading';
import { Paragraph } from '@/components/Atoms/Paragraph/Paragraph';

export const TBCEventCard = () => {
  return (
    <div className="bg-gray-200 min-h-70 text-center flex flex-col items-center justify-center py-4 px-2">
      <Heading level="h5" style="h5">Online Event</Heading>
      <Paragraph variant="large">This event has no physical location. <br/> Details will be sent with your purchased tickets</Paragraph>
    </div>
  );
};
