import { AddonCard } from '@/components/Molecules/AddonCard/AddonCard';

export const AddonCardList = () => {
  return (
    <div className="container mx-auto">
      <ul className="grid grid-cols-2 lg:grid-cols-3 divide-y divide-gray-500">
        {Array.from({ length: 4 }).map((_, i) => ( <AddonCard key={i.toString()} className="col-span-2" title={'Test Addon'} /> ))}
      </ul>
    </div>
  );
};
