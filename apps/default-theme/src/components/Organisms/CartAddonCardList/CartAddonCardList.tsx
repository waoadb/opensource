import { CartAddonCard } from '@/components/Molecules/CartAddonCard/CartAddonCard';

export const CartAddonCardList = () => {
  return (
    <ul className="block divide-y divide-gray-500">
      <CartAddonCard title='VIP Experience' />
      <CartAddonCard title='VIP Experience' />
      <CartAddonCard title='VIP Experience' />
    </ul>
  );
};
