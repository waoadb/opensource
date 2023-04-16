import Image from 'next/image';
import { Heading } from '@/components/Atoms/Heading/Heading';
import { Paragraph } from '@/components/Atoms/Paragraph/Paragraph';
import { EventCardHorizontalProps } from '@/components/Molecules/EventCardHorizontal/EventCardHorizontal.model';
import { Link } from '@/components/Atoms/Link/Link';

export const EventCardHorizontal = ({
  className,
}: EventCardHorizontalProps) => {
  return (
    <div
      className={`group grid grid-cols-1 sm:grid-cols-5 gap-6 items-center ${
        className ?? ''
      }`}
    >
      <Link
        href={'/'}
        className="aspect-1 overflow-hidden block sm:col-span-2 relative"
      >
        <Image
          src="https://picsum.photos/640/480/"
          alt="Event"
          fill={true}
          className="absolute w-full h-full object-center object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </Link>
      <div className="py-2 sm:col-span-3">
        <Heading level="h3" style="h4" className="font-semibold">
          Event title
        </Heading>
        <Paragraph style="small" className="mb-2">
          Date: Mon 01 May 2023 - 21:00pm
        </Paragraph>
        <Paragraph style="small" className="text-gray-500">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod,
          nunc sit amet aliquam lacinia, nunc nisl aliquet nisl, nec aliquam
          nisl nisl sit amet lorem.
        </Paragraph>
        <Link href={'/'} accessibleTitle={'Book now'} className="mt-4">
          Book Now
        </Link>
      </div>
    </div>
  );
};
