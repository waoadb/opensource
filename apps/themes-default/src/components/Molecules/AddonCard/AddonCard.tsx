import { Heading } from '@/components/Atoms/Heading/Heading';
import { Select } from '@/components/Molecules/Forms/Select/Select';
import { Button } from '@/components/Atoms/Button/Button';
import { Input } from '@/components/Molecules/Forms/Input/Input';
import Link from 'next/link';
import Image from 'next/image';

type AddonCardProps = {
  className?: string;
  title: string;
}
export const AddonCard = ({ className, title }: AddonCardProps) => {
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
            <div className='text-xl mb-2'>{numberFormat(18.50)}</div>
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
            <div className='flex flex-wrap gap-4 items-end'>
              <Input
                id={'ticketQuantity'}
                labelClassName="w-full lg:w-auto"
                type="number"
                labelVisible={true}
                name={'ticketQuantity'}
                placeholder='Quantity'
                onChange={() => {}}
              />
              <Button className="w-full xl:w-auto">Add To Cart</Button>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

