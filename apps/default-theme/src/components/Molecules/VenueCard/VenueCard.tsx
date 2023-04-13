import Link from 'next/link';
import Image from 'next/image';
import { Heading } from '@/components/Atoms/Heading/Heading';
import Cta from '@/components/Atoms/Cta/Cta';
import { VenueCardProps } from '@/components/Molecules/VenueCard/VenueCard.model';

export const VenueCard = ({
  className,
}: VenueCardProps) => {
  return (
    <li className={`group ${className}`}>
      <Link href={'/'} className="aspect-w-16 aspect-h-9 overflow-hidden block relative">
        <Image src="https://picsum.photos/640/480/" alt="Event" fill={true} className="absolute w-full h-full object-center object-cover transition-transform duration-700 group-hover:scale-105" />
      </Link>
      <div className="p-2">
        <Heading level="h3" style="h4" className="font-semibold">Venue name</Heading>
        <Cta href={'/'} text={'View venue'} className="mt-4"/>
      </div>
    </li>
  );
};
