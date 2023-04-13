import { PerformanceCard } from '@/components/Molecules/PerformanceCard/PerformanceCard';

export const PerformanceCardList = () => {
  return (
    <div className="container mx-auto">
      <ul className="flex flex-col gap-4 divide-y divide-gray-400">
        <PerformanceCard />
        <PerformanceCard />
        <PerformanceCard />
        <PerformanceCard />
      </ul>
    </div>
  );
};
