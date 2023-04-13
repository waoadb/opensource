import { Heading } from '@/components/Atoms/Heading/Heading';
import { IconList } from '@/components/Molecules/IconList/IconList';
import { Button } from '@/components/Atoms/Button/Button';
import { className } from 'postcss-selector-parser';

type PerformanceCardProps = {
  className?: string;
  soldOut?: boolean;
}

export const PerformanceCard = ({
                                  soldOut = false
                                }: PerformanceCardProps) => {
  return (
    <li className={`pb-4 pt-8 ${className ?? ''}`}>
      <div className='flex flex-row flex-wrap items-center justify-between gap-4'>
        <div className='w-full lg:w-auto lg:grow space-y-1'>
          <Heading level='h5' style='h4'>TItle</Heading>
          <div>Date: 22nd January 2024</div>
          <div>Time: 19:00 pm - 01:00 am</div>
        </div>
        <div className='w-full lg:w-auto lg:shrink lg:text-right'>
          <IconList className='mb-4' />
          <Button className='w-full xl:w-auto' variant={soldOut ? 'secondary' : 'primary'}
                  disabled={soldOut}>{soldOut ? 'Sold out' : 'Book now'}</Button>
        </div>
      </div>
    </li>
  );
};
