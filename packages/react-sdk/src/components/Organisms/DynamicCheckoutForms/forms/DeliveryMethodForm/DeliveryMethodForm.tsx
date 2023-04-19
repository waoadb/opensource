/* Dependencies */
import { forwardRef, useImperativeHandle } from 'react';
import { setNestedObjectValues, useFormik } from 'formik';

// Helpers
import { handleFieldError } from '../../../../../helpers/handleFieldError/handleFieldError';
import { getDeliveryMethodsFormConfig } from '../../helpers/getDeliveryMethodFormConfig/getDeliveryMethodFormConfig';

// Components
import { RadioList } from '../../../../Molecules/Forms/RadioList/RadioList';
import { FormErrorMessage } from '../../../../Molecules/Forms/FormErrorMessage/FormErrorMessage';

// Models
import { ClientCartModels } from '@waoadb/contracts-client';
import { Heading } from '../../../../Atoms/Heading/Heading';

export type DeliveryMethodFormImperativeMethods = {
  isValid: boolean;
  values: Partial<ClientCartModels.BaseDeliveryMethods>;
  validate: () => Promise<boolean>;
};

type DeliveryMethodFormProps = {
  /**
   * Checkout config item.
   */
  config: ClientCartModels.CheckoutConfigItem;
  /**
   * Wether to show the addon delivery methods.
   */
  showAddonDeliveryMethods: boolean;
  /**
   * Set the form values.
   * Useful for returning to a previous step.
   */
  defaultValues?: Partial<ClientCartModels.BaseDeliveryMethods>;
};

/**
 * Dynamic Checkout Form - Custom Details
 * Forwards a ref to the parent component.
 * @param params - DynamicCheckoutFormProps
 */
export const DeliveryMethodForm = forwardRef<
  DeliveryMethodFormImperativeMethods,
  DeliveryMethodFormProps
>(({ config, showAddonDeliveryMethods, defaultValues }, forwardedRef) => {
  // Get the config
  const {
    initialValues,
    schema,
    enabledAddonDeliveryMethods,
    enabledTicketDeliveryMethods,
    errorsPropMatch,
  } = getDeliveryMethodsFormConfig(config, showAddonDeliveryMethods);

  const formik = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit: () => {},
  });

  useImperativeHandle<any, DeliveryMethodFormImperativeMethods>(
    forwardedRef,
    () => {
      return {
        isValid: formik.isValid,
        values: formik.values,
        validate: async () => {
          const validationErrors = await formik.validateForm();

          if (Object.keys(validationErrors).length > 0) {
            formik.setTouched(setNestedObjectValues(validationErrors, true));
          }

          return Object.keys(validationErrors).length === 0;
        },
      };
    },
    [formik]
  );

  // Build The Form
  return (
    <div className="db-w-full">
      <form onSubmit={formik.handleSubmit}>
        <Heading level="h3" style="h5" className="mb-2">
          Delivery Methods
        </Heading>

        {/* Error Messages */}
        <FormErrorMessage
          errors={formik.errors}
          touched={formik.touched}
          propMatch={errorsPropMatch}
        />
        {/* / Error Messages */}

        {/* Ticket Delivery Options */}
        <div className="db-w-full">
          <RadioList
            title="Ticket Delivery Method"
            items={enabledTicketDeliveryMethods.map((method) => {
              return {
                name: 'ticket_delivery_method',
                value: method,
                label: method,
                onBlur: formik.handleBlur,
                onChange: formik.handleChange,
                selected: formik.values.ticket_delivery_method === method,
              };
            })}
            required={true}
            error={handleFieldError(
              formik.errors,
              formik.touched,
              'ticket_delivery_method'
            )}
          />
        </div>
        {/* / Ticket Delivery Options */}

        {/* Addon Delivery Options */}
        {showAddonDeliveryMethods && (
          <div className="db-w-full db-mt-4">
            <RadioList
              title="Addon Delivery Method"
              items={enabledAddonDeliveryMethods.map((method) => {
                return {
                  name: 'addon_delivery_method',
                  value: method,
                  label: method,
                  onBlur: formik.handleBlur,
                  onChange: formik.handleChange,
                  selected: formik.values.addon_delivery_method === method,
                };
              })}
              required={true}
              error={handleFieldError(
                formik.errors,
                formik.touched,
                'ticket_delivery_method'
              )}
            />
          </div>
        )}
      </form>
    </div>
  );
});

// Set the display name
DeliveryMethodForm.displayName = 'DeliveryMethodForm';
