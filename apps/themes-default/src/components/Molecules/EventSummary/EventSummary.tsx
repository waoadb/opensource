import { Heading } from '@/components/Atoms/Heading/Heading';
import { Paragraph } from '@/components/Atoms/Paragraph/Paragraph';

export const EventSummary = () => {
  return (
    <div className="space-y-4">
      <Heading level="h3" className="text-indigo-700"><span className="inline-block border-b-2 border-b-current">Summary</span></Heading>
      <Paragraph variant="large">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod nunc sit amet aliquam lacinia, nunc nisl aliquet nisl, nec aliquam nisl nisl sit amet lorem. Sed euismod nunc sit amet aliquam lacinia, nunc nisl aliquet nisl, nec aliquam nisl nisl sit amet lorem.
      </Paragraph>
    </div>
  );
};
