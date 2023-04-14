/* Dependencies */
import { useMemo } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

// Helpers
import { handleFieldError } from '@/helpers/handleFieldError/handleFieldError';

// Components
import { Heading } from '@/components/Atoms/Heading/Heading';
import { Paragraph } from '@/components/Atoms/Paragraph/Paragraph';
import { Button } from '@/components/Atoms/Button/Button';
import { Input } from '../Forms/Input/Input';

// Models
import { ClientCacheModels, ClientCartModels } from '@waoadb/contracts-client';

type Props = {
  /**
   * Ticket
   */
  ticket: ClientCacheModels.CachePerformance['stock']['tickets'][0];
  /**
   * Event id
   */
  event_id: string;
  /**
   * Performance id
   */
  performance_id: string;
  /**
   * Handle Submit
   */
  onSubmit: (addon: ClientCartModels.AddTicketToCartRequest) => void;
};

/**
 * Ticket Card
 * @param param props - Component props.
 * @returns
 */

export const TicketCard = ({
  ticket,
  event_id,
  performance_id,
  onSubmit,
}: Props) => {
  // Create validation schema
  const validationSchema = useMemo(() => {
    const min_quantity = ticket.availability.min_quantity || 1;
    const max_quantity = ticket.availability.max_quantity || 10;

    return Yup.object().shape({
      ticket_id: Yup.string()
        .uuid('Must be a valid variant id')
        .required('Required'),
      quantity: Yup.number()
        .min(min_quantity || 1, `Min Allowed: ${min_quantity}`)
        .max(max_quantity, `Max Allowed: ${max_quantity}`)
        .required('Please enter a quantity'),
      accessibility: Yup.array().required(),
    });
  }, [ticket]);

  return (
    <li className="w-full py-4">
      <Heading level="h3" className="mb-2">
        {ticket.name}
      </Heading>

      {ticket.description && (
        <Paragraph className="mt-0">{ticket.description}</Paragraph>
      )}

      <Paragraph className="mt-1">
        <span aria-atomic={true} aria-live="polite">
          <span className="sr-only">Price:</span>£{ticket.price.toFixed(2)}
        </span>
      </Paragraph>

      <div className="w-full mt-2">
        <Formik
          initialValues={{
            ticket_id: ticket.ticket_id,
            quantity: 0,
            accessibility: [],
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            onSubmit({
              event_id,
              performance_id,
              ticket_id: ticket.ticket_id,
              quantity: values.quantity,
              accessibility: values.accessibility,
            });
          }}
          isInitialValid={false}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            isValid,
          }) => (
            <form
              onSubmit={handleSubmit}
              className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 items-center"
            >
              <div className="w-full p-1 h-full flex flex-row items-center bg-gray-100">
                <p>Accessibility Options Soon!</p>
              </div>
              <div className="w-full grid grid-cols-1 md:grid-cols-4 lg:grid-cols-3 items-end gap-2">
                <div className="w-full md:col-span-2 lg:col-span-2">
                  <Input
                    id={`${ticket.ticket_id}_quantity`}
                    type="number"
                    label="Quantity"
                    labelVisible={true}
                    name="quantity"
                    inputMode="numeric"
                    placeholder="Quantity"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.quantity}
                    min={ticket.availability.min_quantity || 1}
                    max={ticket.availability.max_quantity || 10}
                    error={handleFieldError(errors, touched, 'quantity')}
                  />
                </div>
                <Button
                  className="w-full mt-2 md:mt-0 md:col-span-2 lg:col-span-1"
                  type="submit"
                  variant="primary"
                  accessibleTitle={`Add ${values.quantity} of ${ticket.name} to your cart.`}
                  disabled={!isValid || isSubmitting}
                >
                  Add To Cart
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </div>

      {/* <div className="flex flex-row flex-wrap gap-4 justify-between items-center">
        <div className="w-full lg:w-auto md:min-w-60">
          <div className="text-xl mb-2">{numberFormat(18.5)}</div>
          {!student && (
            <Select
              id="choseAccess"
              selectClassName="min-w-20"
              labelVisible={true}
              label="Access requirements"
              options={[
                { value: '1', text: 'Wheelchair seats' },
                { value: '2', text: 'Wheelchair seats' },
              ]}
            />
          )}
        </div>
        <div className="w-full lg:w-auto">
          {!student ? (
            <div className="flex flex-col">
              <div className="w-full text-left lg:text-right">
                <IconList />
              </div>
              <div className="flex flex-wrap gap-4 items-end">
                <Input
                  id={'ticketQuantity'}
                  type="number"
                  labelClassName="w-full lg:w-auto"
                  labelVisible={true}
                  name={'ticketQuantity'}
                  placeholder="Quantity"
                  onChange={() => {}}
                />
                <Button className="w-full lg:w-auto">Add To Cart</Button>
              </div>
            </div>
          ) : (
            <Button className="w-full lg:w-auto" variant="secondary" disabled>
              Sold out
            </Button>
          )}
        </div>
      </div> */}
    </li>
  );
};
