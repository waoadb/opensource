import Link from 'next/link';
import Image from 'next/image';
import { Heading } from '@/components/Atoms/Heading/Heading';
import { Select } from '@/components/Molecules/Forms/Select/Select';
import { Button } from '@/components/Atoms/Button/Button';

type CartAddonCardProps = {
  className?: string;
  title: string;
}
export const CartAddonCard = ({ className, title }: CartAddonCardProps) => {
  const numberFormat = (number: number) => {
    return number.toLocaleString('en-GB', {
      style: 'currency',
      currency: 'GBP'
    });
  };
  return (
    <li className={`py-4 ${className ?? ''}`}>
      <div className='flex flex-col lg:flex-row w-full gap-4 justify-between lg:items-end'>
        <div className="w-full lg:w-auto flex flex-row gap-4 items-center">
          <Link href={'/'} className="relative overflow-hidden min-w-36 h-36">
            <Image src="https://picsum.photos/640/480/" alt="Event" fill={true} className="absolute w-full h-full object-center object-cover transition-transform duration-700 group-hover:scale-105" />
          </Link>
          <div className='w-full lg:w-auto md:min-w-60'>
            <Heading level='h3' className='mb-4'>{title}</Heading>
            <Select
              id='choseVariant'
              selectClassName='min-w-20'
              labelVisible={true}
              label='Variants'
              options={[{ value: '1', text: 'MD - ' + numberFormat(19) }, { value: '2', text: 'XL - ' + numberFormat(21.99) }]}
            />
          </div>
        </div>
        <div className='w-full lg:w-auto'>
          <div className='flex flex-col lg:flex-row w-full'>
            <div className='flex flex-col items-end'>
              <div className='text-xl mb-2'>{numberFormat(18.50)}</div>
              <Button variant="hollowAlert" className="w-full xl:w-auto">Remove</Button>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
