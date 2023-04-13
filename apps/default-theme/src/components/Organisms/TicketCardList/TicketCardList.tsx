import { TicketCard } from '@/components/Molecules/TicketCard/TicketCard';

export const TicketCardList = () => {
  return (
    <div className="container mx-auto">
      <ul className="grid grid-cols-1 gap-4 divide-y divide-gray-500">
        {Array.from({ length: 4 }).map((_, i) => (
          <TicketCard title="General Admission" key={i.toString()} student={i === 3} className="col-span-1" />
        ))}
      </ul>
    </div>
  );
};
