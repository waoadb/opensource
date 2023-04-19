/* Dependencies */
import { useMemo } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import classNames from 'classnames';

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
  onSubmit: (
    addon: ClientCartModels.AddTicketToCartRequest,
    title: string,
    callback: () => void
  ) => void;
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
      <Heading level="h3" style="h4" className="mb-2">
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
          onSubmit={(values, { setSubmitting, resetForm }) => {
            onSubmit(
              {
                event_id,
                performance_id,
                ticket_id: ticket.ticket_id,
                quantity: values.quantity,
                accessibility: values.accessibility,
              },
              ticket.name,
              () => {
                setSubmitting(false);
                resetForm();
              }
            );
          }}
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
              <div className="w-full p-1 h-full flex flex-row items-center bg-gray-50 px-3">
                <p>Accessibility Options Coming Soon!</p>
              </div>
              <div
                className={classNames(
                  'w-full grid grid-cols-1 md:grid-cols-4 lg:grid-cols-3 gap-2',
                  handleFieldError(errors, touched, 'quantity')
                    ? 'items-center'
                    : 'items-end'
                )}
              >
                <div className="w-full md:col-span-2 lg:col-span-2">
                  <Input
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
    </li>
  );
};
