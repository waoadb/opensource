import { Heading } from '@/components/Atoms/Heading/Heading';
import { Select } from '@/components/Molecules/Forms/Select/Select';
import { Button } from '@/components/Atoms/Button/Button';

type CartTicketCardProps = {
  title: string,
  className?: string;
}
export const CartTicketCard = ({ title, className }: CartTicketCardProps) => {
  const numberFormat = (number: number) => {
    return number.toLocaleString('en-GB', {
      style: 'currency',
      currency: 'GBP'
    });
  };

  return (
    <li className={`py-4 ${className ?? ''}`}>
      <Heading level='h3' className='mb-4'>{title}</Heading>
      <div className='flex flex-row flex-wrap gap-4 justify-between items-center'>
        <div className='w-full lg:w-auto md:min-w-60'><Select
            id='choseAccess'
            selectClassName='min-w-20'
            labelVisible={true}
            label='Access requirements'
            options={[{ value: '1', text: 'Wheelchair seats' }, { value: '2', text: 'Wheelchair seats' }]}
          />
        </div>
        <div className='w-full lg:w-auto'>
          <div className='flex flex-col items-end justify-end'>
            <div className='text-xl mb-2'>{numberFormat(18.50)}</div>
            <Button variant="hollowAlert" className="w-full lg:w-auto">Remove</Button>
          </div>
        </div>
      </div>
    </li>
  );
};

