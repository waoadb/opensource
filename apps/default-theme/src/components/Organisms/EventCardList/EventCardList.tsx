import React from 'react';
// Components
import { EventCard } from '@/components/Molecules/EventCard/EventCard';
import { Heading } from '@/components/Atoms/Heading/Heading';
import Cta from '@/components/Atoms/Cta/Cta';

type EventCardListProps = {
  title?: string;
}
export const EventCardList = ({
  title,
}: EventCardListProps) => {
  return (
    <div className="container mx-auto my-10 lg:my-20">
      { title && <div className="flex flex-col gap-4 mb-4 lg:flex-row items-center justify-between">
        <Heading level="h2" style="h4" className="text-2xl lg:text-3xl">
          {title}
        </Heading>
        <Cta href={'/whats-on'} variant='hollow' text={'View All Events'} />
      </div>}

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => <EventCard key={i.toString()} className="col-span-1" />)}
      </ul>
    </div>
  );
};
