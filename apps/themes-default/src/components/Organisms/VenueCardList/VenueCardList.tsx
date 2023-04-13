
import React from 'react';
import { VenueCard } from '@/components/Molecules/VenueCard/VenueCard';

export const VenueCardList = () => {
  return (
    <div className="container mx-auto my-10 lg:my-20">
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => <VenueCard key={i.toString()} className="col-span-1" />)}
      </ul>
    </div>
  );
};
