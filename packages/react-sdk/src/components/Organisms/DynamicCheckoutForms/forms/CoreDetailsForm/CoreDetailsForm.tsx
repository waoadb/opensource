/* Dependencies */
import { forwardRef, useImperativeHandle } from 'react';
import { setNestedObjectValues, useFormik } from 'formik';

// Helpers
import { getCoreFieldsFormConfig } from '../../helpers/getCoreFieldsFormConfig/getCoreFieldsValidationSchema';

// Components
import { BillingAddressFields } from '../../fields/BillingAddressFields/BillingAddressField';
import { ShippingAddressFields } from '../../fields/ShippingAddressFields/ShippingAddressFields';
import { DynamicFormCoreField } from '../../fields/DynamicFormCoreField/DynamicFormCoreField';
import { Heading } from '../../../../Atoms/Heading/Heading';
import { FormErrorMessage } from '../../../../Molecules/Forms/FormErrorMessage/FormErrorMessage';

// Models
import { ClientCartModels } from '@waoadb/contracts-client';

type CoreDetailsFormProps = {
  config: ClientCartModels.CheckoutConfigItem;
  defaultValues?: Partial<CoreDetailsFormValues>;
};

export type CoreDetailsFormImperativeMethods = {
  isValid: boolean;
  values: Partial<CoreDetailsFormValues>;
  validate: () => Promise<boolean>;
};

export type CoreDetailsFormFieldKeys =
  keyof ClientCartModels.ConfigCollectedCoreFields;

export type CoreDetailsFormValues = {
  core_details: Partial<ClientCartModels.CartCollectedDetailsCore>;
  billing_address: ClientCartModels.CartAttendeeAddress;
  shipping_address: ClientCartModels.CartAttendeeAddress;
};

/**
 * Dynamic Checkout Form - Custom Details
 * Forwards a ref to the parent component.
 * @param params - DynamicCheckoutFormProps
 */
export const CoreDetailsForm = forwardRef<
  CoreDetailsFormImperativeMethods,
  CoreDetailsFormProps
>(({ config, defaultValues }, forwardedRef) => {
  // Get the enabled core fields
  const enabledFields: Array<CoreDetailsFormFieldKeys> = Object.keys(
    config.collected_core.fields
  ).filter(
    (key) =>
      key.includes('_enabled') &&
      config.collected_core.fields[key as CoreDetailsFormFieldKeys] === true
  ) as CoreDetailsFormFieldKeys[];

  const {
    initialValues,
    schema,
    errorsPropMatch,
    errorsBillingAddressPropMatch,
    errorsShippingAddressPropMatch,
  } = getCoreFieldsFormConfig(config.collected_core.fields);

  const formik = useFormik({
    initialValues: defaultValues || initialValues,
    validationSchema: schema,
    onSubmit: () => {},
  });

  useImperativeHandle<unknown, CoreDetailsFormImperativeMethods>(
    forwardedRef,
    () => {
      return {
        isValid: formik.isValid,
        values: formik.values,
        validate: async () => {
          const validationErrors = await formik.validateForm();

          if (Object.keys(validationErrors).length > 0) {
            await formik.setTouched(
              setNestedObjectValues(validationErrors, true)
            );
          }

          return Object.keys(validationErrors).length === 0;
        },
      };
    },
    [formik]
  );

  const filteredEnabledFields = enabledFields.filter(
    (field) =>
      !['title_enabled', 'first_name_enabled', 'surname_enabled'].includes(
        field
      )
  );

  // Build The Form
  return (
    <div className="db-w-full">
      <form onSubmit={formik.handleSubmit}>
        <Heading level="h3" style="h5" className="mb-2">
          Core Details
        </Heading>

        {/* Error Message */}
        <FormErrorMessage
          errors={formik.errors}
          touched={formik.touched}
          propMatch={errorsPropMatch}
        />
        {/* / Error Message */}

        <div className="db-w-full db-grid db-grid-cols-1 db-gap-2">
          {/* Core Name Fields */}
          <div className="db-w-full db-grid db-grid-cols-1 md:db-grid-cols-5 db-gap-2 md:db-gap-4">
            <div className="db-w-full md:db-col-span-1">
              {DynamicFormCoreField({
                field_id: 'title_enabled',
                configFields: config.collected_core.fields,
                values: formik.values,
                errors: formik.errors,
                touched: formik.touched,
                handleChange: formik.handleChange,
                handleBlur: formik.handleBlur,
              })}
            </div>
            <div className="db-w-full md:db-col-span-2">
              {DynamicFormCoreField({
                field_id: 'first_name_enabled',
                configFields: config.collected_core.fields,
                values: formik.values,
                errors: formik.errors,
                touched: formik.touched,
                handleChange: formik.handleChange,
                handleBlur: formik.handleBlur,
              })}
            </div>
            <div className="db-w-full md:db-col-span-2">
              {DynamicFormCoreField({
                field_id: 'surname_enabled',
                configFields: config.collected_core.fields,
                values: formik.values,
                errors: formik.errors,
                touched: formik.touched,
                handleChange: formik.handleChange,
                handleBlur: formik.handleBlur,
              })}
            </div>
          </div>
          {/* / Core Name Fields */}

          {/* Core Details Fields */}
          {filteredEnabledFields.map((field) =>
            DynamicFormCoreField({
              field_id: field,
              configFields: config.collected_core.fields,
              values: formik.values,
              errors: formik.errors,
              touched: formik.touched,
              handleChange: formik.handleChange,
              handleBlur: formik.handleBlur,
            })
          )}
          {/* / Core Details Fields */}

          <hr className="db-bg-black db-my-4" />

          {/* Billing Address */}
          {enabledFields.includes('billing_address_enabled') && (
            <>
              <FormErrorMessage
                errors={formik.errors}
                touched={formik.touched}
                propMatch={errorsBillingAddressPropMatch}
              />

              <BillingAddressFields
                values={formik.values}
                errors={formik.errors}
                touched={formik.touched}
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
              />
            </>
          )}
          {/* / Billing Address */}

          <hr className="db-bg-black db-my-4" />

          {/* Shipping Address */}
          {enabledFields.includes('shipping_address_enabled') && (
            <>
              <FormErrorMessage
                errors={formik.errors}
                touched={formik.touched}
                propMatch={errorsShippingAddressPropMatch}
              />
              <ShippingAddressFields
                values={formik.values}
                errors={formik.errors}
                touched={formik.touched}
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
              />
            </>
          )}
          {/* / Shipping Address */}
        </div>
      </form>
    </div>
  );
});

// Set the display name
CoreDetailsForm.displayName = 'CoreDetailsForm';
