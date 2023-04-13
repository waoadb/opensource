import { Heading } from '@/components/Atoms/Heading/Heading';
import { Paragraph } from '@/components/Atoms/Paragraph/Paragraph';
import Cta from '@/components/Atoms/Cta/Cta';
type OrderCardProps = {
  className?: string;
}

export const OrderCard = ({
  className,
}: OrderCardProps) => {
  return (
    <li className={`space-y-4 pt-4 pb-8 ${className ?? ''}`}>
      <Heading level="h3" className="text-indigo-700"><span className="inline-block border-b-2 border-b-current">Event Name (#0123456)</span></Heading>
      <Paragraph>Performance: Mon 01 May 2023 - 21:00pm</Paragraph>
      <Cta href={'/'} text={'View order'} variant='hollow'/>
    </li>
  );
};
