import { Paragraph } from '@/components/Atoms/Paragraph/Paragraph';
import { Button } from '@/components/Atoms/Button/Button';

export const CheckoutSummary = () => {
  const numberFormat = (number: number) => {
    return number.toLocaleString('en-GB', {
      style: 'currency',
      currency: 'GBP',
    });
  }
  return (
    <div className="bg-indigo-100 p-4 rounded-md">
      <div className="divide-y divide-gray-500">
        <div className="block space-y-4 py-2">
          {/*As a row*/}
          <div className="w-full flex flex-row flex-wrap justify-between gap-4">
            <div>
              <span className="block font-semibold">Event Name</span>
              <span className="block">Date: Tuesday, 22nd April</span>
            </div>
            <div><span className="font-medium">{numberFormat(48)}</span></div>
          </div>
          {/*As a row*/}
          <div className="w-full flex flex-row flex-wrap justify-between gap-4">
            <div>
              <span className="block font-semibold">Event Name</span>
              <span className="block">Date: Tuesday, 22nd April</span>
            </div>
            <div><span className="font-medium">{numberFormat(55.99)}</span></div>
          </div>
        </div>

        <div className="block space-y-4 py-2">
          {/*As a row*/}
          <div className="w-full flex flex-row flex-wrap justify-between gap-2">
            <div>
              <span className="block font-semibold">Processing fees</span>
            </div>
            <div>+ <span className="font-medium">{numberFormat(55.99)}</span></div>
            <Paragraph variant="small" className="block w-full">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt praesentium quasi
              repudiandae? Aliquam blanditiis commodi cumque dolorum.
            </Paragraph>
          </div>
          {/*As a row*/}
          <div className="w-full flex flex-row flex-wrap justify-between gap-2">
            <div>
              <span className="block font-semibold">Student discount</span>
            </div>
            <div>- <span className="font-medium">{numberFormat(12.99)}</span></div>
            <Paragraph variant="small" className="block w-full">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt praesentium quasi
              repudiandae? Aliquam blanditiis commodi cumque dolorum.
            </Paragraph>
          </div>
        </div>
        <div className="block space-y-4 py-2">
          <div className="text-right w-full">
            <span>Order Total: </span>
            <span className="font-semibold">{numberFormat(55.99)}</span>
          </div>
          <div className="flex flex-col gap-2">
            <Button variant="secondary" className="text-lg" fullWidth={true}>Complete Checkout</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

