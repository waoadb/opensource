/* Dependencies */
import { forwardRef, useImperativeHandle } from 'react';
import { setNestedObjectValues, useFormik } from 'formik';

// Helpers
import { getCoreFieldsFormConfig } from '../../helpers/getCoreFieldsFormConfig/getCoreFieldsValidationSchema';

// Components
import { BillingAddressFields } from '../../components/BillingAddressFields/BillingAddressField';
import { ShippingAddressFields } from '../../components/ShippingAddressFields/ShippingAddressFields';
import { DynamicFormCoreField } from '../../components/DynamicFormCoreField/DynamicFormCoreField';

// Models
import { ClientCartModels } from '@waoadb/contracts-client';
import { FormErrorMessage } from '@/components/Molecules/Forms/FormErrorMessage/FormErrorMessage';

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
    <div className="w-full">
      <form onSubmit={formik.handleSubmit}>
        <h3 className="text-xl mb-2">Core Details</h3>

        {/* Error Message */}
        <FormErrorMessage
          errors={formik.errors}
          touched={formik.touched}
          propMatch={errorsPropMatch}
        />
        {/* / Error Message */}

        <div className="w-full grid grid-cols-1 gap-2">
          {/* Core Name Fields */}
          <div className="w-full grid grid-cols-1 md:grid-cols-5 gap-2 md:gap-4">
            <div className="w-full md:col-span-1">
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
            <div className="w-full md:col-span-2">
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
            <div className="w-full md:col-span-2">
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

          <hr className="bg-black my-4" />

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

          <hr className="bg-black my-4" />

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
