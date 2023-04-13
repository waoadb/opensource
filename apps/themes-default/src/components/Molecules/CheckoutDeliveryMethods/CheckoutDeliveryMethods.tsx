import { Heading } from '@/components/Atoms/Heading/Heading';
import { Radio } from '@/components/Molecules/Forms/Radio/Radio';

export const CheckoutDeliveryMethods = () => {
  return (
    <div className='bg-indigo-100 p-4 rounded-md divide-y divide-gray-400'>
      <div className="py-2">
        <Heading level='h5' className='mb-4'>Tickets Delivery Method</Heading>
        <div className='space-y-2 pb-2'>
          {[
            { id: 'optionA', label: 'Digital tickes' },
            { id: 'optionB', label: 'Collect at Venue' },
            { id: 'optionC', label: 'Delivery' }
          ].map((radio, i) => (
            <Radio key={radio.id + i.toString()} id={radio.id} name='deliveryMethod' label={radio.label} />
          ))}
        </div>
      </div>
      <div className="py-2 pt-4">
        <Heading level='h5' className='mb-4'>Addons Delivery Method</Heading>
        <div className='space-y-2'>
          {[
            { id: 'optionA_1', label: 'Collect at Venue' },
            { id: 'optionB_1', label: 'Delivery' }
          ].map((radio, i) => (
            <Radio key={radio.id + i.toString()} id={radio.id} name='addonTicketsDeliveryMethod' label={radio.label} />
          ))}
        </div>
      </div>
    </div>
  );
};
