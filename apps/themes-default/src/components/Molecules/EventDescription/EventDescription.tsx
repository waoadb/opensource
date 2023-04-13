import { Heading } from '@/components/Atoms/Heading/Heading';

type EventDescriptionProps = {
  title: string;
  description: string;
}
export const EventDescription = ({ title, description, }: EventDescriptionProps) => {
  return (
    <div className="space-y-4">
      <Heading level="h3" className="text-indigo-700"><span className="inline-block border-b-2 border-b-current">{title}</span></Heading>
      <div className="text-lg space-y-4 mb-4" dangerouslySetInnerHTML={{ __html: description }}/>
    </div>
  );
};
