import { Heading } from '@/components/Atoms/Heading/Heading';
import { IconList } from '@/components/Molecules/IconList/IconList';
import { Input } from '@/components/Molecules/Forms/Input/Input';
import { Button } from '@/components/Atoms/Button/Button';
import { Select } from '@/components/Molecules/Forms/Select/Select';

type TicketCardProps = {
  title: string,
  className?: string;
  student?: boolean;
}

export const TicketCard = ({ title, className, student = false }: TicketCardProps) => {
  const numberFormat = (number: number) => {
    return number.toLocaleString('en-GB', {
      style: 'currency',
      currency: 'GBP'
    });
  };

  return (
    <li className={`py-4 ${className ?? ''}`}>
      <Heading level='h3' className='mb-4'>{student ? 'Student' : title }</Heading>
      <div className='flex flex-row flex-wrap gap-4 justify-between items-center'>
        <div className='w-full lg:w-auto md:min-w-60'>
          <div className='text-xl mb-2'>{numberFormat(18.50)}</div>
          {!student &&           <Select
            id='choseAccess'
            selectClassName='min-w-20'
            labelVisible={true}
            label='Access requirements'
            options={[{ value: '1', text: 'Wheelchair seats' }, { value: '2', text: 'Wheelchair seats' }]}
          />}

        </div>
        <div className='w-full lg:w-auto'>
          {!student ? (<div className='flex flex-col'>
            <div className='w-full text-left lg:text-right'>
              <IconList />
            </div>
            <div className='flex flex-wrap gap-4 items-end'>
              <Input
                id={'ticketQuantity'}
                type="number"
                labelClassName="w-full lg:w-auto"
                labelVisible={true}
                name={'ticketQuantity'}
                placeholder='Quantity'
                onChange={() => {}}
              />
              <Button className="w-full lg:w-auto">Add To Cart</Button>
            </div>
          </div>) : (
            <Button className="w-full lg:w-auto" variant='secondary' disabled>Sold out</Button>
          )}
        </div>
      </div>
    </li>
  );
};
