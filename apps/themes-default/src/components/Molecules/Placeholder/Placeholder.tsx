/* Dependencies */
// Components
import { Heading } from '@/components/Atoms/Heading/Heading';
import { Paragraph } from '@/components/Atoms/Paragraph/Paragraph';

// Models
type Props = {
  /**
   * Title
   */
  title: string;
  /**
   * Content
   */
  content: string;
  /**
   * Icon
   */
  icon: React.ReactNode;
};

/**
 * Placeholder
 * @param props - Component props.
 */
export const Placeholder = ({ title, content, icon }: Props) => {
  return (
    <div className="w-full text-center flex flex-col items-center justify-center py-12 px-2 border border-gray-200 border-solid rounded-lg">
      <div className="w-full">
        {icon}
        <Heading level="h2" style="h4" className="mt-2">
          {title}
        </Heading>
        <Paragraph style="base" className="mt-1">
          {content}
        </Paragraph>
      </div>
    </div>
  );
};
