import { CartTicketCard } from '@/components/Molecules/CartTicketCard/CartTicketCard';

export const CartTicketCardList = () => {
  return (
    <ul className="block divide-y divide-gray-500">
      <CartTicketCard title={'General Admission'} className="block" />
      <CartTicketCard title={'General Admission'} className="block" />
      <CartTicketCard title={'General Admission'} className="block" />
    </ul>
  );
};
