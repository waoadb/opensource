import { OrderCard } from '@/components/Molecules/OrderCard/OrderCard';

export const OrderCardList = () => {
  return (
      <ul className="flex flex-col divide-y divide-gray-400">
        <OrderCard />
        <OrderCard />
        <OrderCard />
        <OrderCard />
      </ul>
  );
};
