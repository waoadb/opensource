/* Dependencies */
// Components
import { Heading } from '@/components/Atoms/Heading/Heading';
import { Paragraph } from '@/components/Atoms/Paragraph/Paragraph';

// Models
type Props = {
  content: string;
};

/**
 * Event Summary
 * @param props - Component props.
 * @returns
 */
export const EventSummary = ({ content }: Props) => {
  return (
    <div className="space-y-4">
      <Heading level="h2" style="h3">
        <span className="text-indigo-700 inline-block border-b-2 border-b-current">
          Event Summary
        </span>
      </Heading>
      <Paragraph style="large">{content}</Paragraph>
    </div>
  );
};
