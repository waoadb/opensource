import Image from 'next/image';
import { Heading } from '@/components/Atoms/Heading/Heading';
import { Paragraph } from '@/components/Atoms/Paragraph/Paragraph';
import Link from 'next/link';
import Cta from '@/components/Atoms/Cta/Cta';
import { IconList } from '@/components/Molecules/IconList/IconList';
type EventCardProps = {
  className?: string;
}

export const EventCard = ({
  className,
}: EventCardProps) => {
  return (
    <li className={`group ${className}`}>
      <Link href={'/'} className="aspect-w-16 aspect-h-9 overflow-hidden block relative">
        <Image src="https://picsum.photos/640/480/" alt="Event" fill={true} className="absolute w-full h-full object-center object-cover transition-transform duration-700 group-hover:scale-105" />
      </Link>
      <div className="py-2">
        <Heading level="h3" style="h4" className="font-semibold">Event title</Heading>
        <Paragraph variant="small" className="mb-2">Date: Mon 01 May 2023 - 21:00pm</Paragraph>
        <IconList />
        <Paragraph variant="small" className="text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing  elit.
          Sed euismod, nunc sit amet aliquam lacinia, nunc nisl aliquet nisl, nec aliquam nisl nisl sit amet lorem.</Paragraph>
        <Cta href={'/'} text={'Book now'} className="mt-4"/>
      </div>
    </li>
  );
};
