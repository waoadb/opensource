/* Dependencies */
import { forwardRef, useMemo, useImperativeHandle } from 'react';
import { setNestedObjectValues, useFormik } from 'formik';

// Helpers
import { getCoreFieldsFormConfig } from '../../helpers/getCoreFieldsFormConfig/getCoreFieldsValidationSchema';

// Fields
import { BillingAddressFields } from '../../Fields/BillingAddressFields/BillingAddressField';
import { ShippingAddressFields } from '../../Fields/ShippingAddressFields/ShippingAddressFields';
import { DynamicFormCoreField } from '../../Fields/DynamicFormCoreField/DynamicFormCoreField';

// Components
import { FormErrorMessage } from '../../../../Molecules/Forms/FormErrorMessage/FormErrorMessage';
import { FieldSet } from '../../../../Molecules/Forms/FieldSet/FieldSet';

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

type EnabledFields = {
  enabledFields: Array<CoreDetailsFormFieldKeys>;
  filteredEnabledFields: Array<CoreDetailsFormFieldKeys>;
};

export type CoreDetailsFormValues = {
  core_details: Partial<ClientCartModels.CartCollectedDetailsCore>;
  billing_address: ClientCartModels.CartAttendeeAddress;
  shipping_address: ClientCartModels.CartAttendeeAddress;
};

/**
 * Form - Core Details
 * Forwards a ref to the parent component.
 * @param params - DynamicCheckoutFormProps
 */
export const CoreDetailsForm = forwardRef<
  CoreDetailsFormImperativeMethods,
  CoreDetailsFormProps
>(({ config, defaultValues }, forwardedRef) => {
  // State
  // Enabled Core Fields & Config
  const { enabledFields, filteredEnabledFields } =
    useMemo<EnabledFields>(() => {
      const enabledFields = Object.keys(config.collected_core.fields).filter(
        (key) =>
          key.includes('_enabled') &&
          config.collected_core.fields[key as CoreDetailsFormFieldKeys] === true
      ) as CoreDetailsFormFieldKeys[];

      const filteredEnabledFields = enabledFields.filter(
        (field) =>
          !['title_enabled', 'first_name_enabled', 'surname_enabled'].includes(
            field
          )
      );

      return { enabledFields, filteredEnabledFields };
    }, [config.collected_core.fields]);

  // Get the form config
  const { initialValues, schema, errorsPropMatch } = useMemo(() => {
    return getCoreFieldsFormConfig(config.collected_core.fields);
  }, [config.collected_core.fields]);

  // Create Formik Instance
  const formik = useFormik({
    initialValues: defaultValues || initialValues,
    validationSchema: schema,
    onSubmit: () => {},
  });

  // Imperative Methods
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

  // Build The Form
  return (
    <div className="db-w-full">
      <form onSubmit={formik.handleSubmit}>
        <FieldSet title="Core Details" titleSize="h4">
          {/* Error Message */}
          <FormErrorMessage
            errors={formik.errors}
            touched={formik.touched}
            propMatch={errorsPropMatch}
          />
          {/* / Error Message */}

          <div className="db-w-full db-grid db-grid-cols-1 db-gap-2 db-mt-2">
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
              <BillingAddressFields
                values={formik.values}
                errors={formik.errors}
                touched={formik.touched}
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                configFields={config.collected_core.fields}
              />
            )}
            {/* / Billing Address */}

            <hr className="db-bg-black db-my-4" />

            {/* Shipping Address */}
            {enabledFields.includes('shipping_address_enabled') && (
              <ShippingAddressFields
                values={formik.values}
                errors={formik.errors}
                touched={formik.touched}
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                configFields={config.collected_core.fields}
              />
            )}
            {/* / Shipping Address */}
          </div>
        </FieldSet>
      </form>
    </div>
  );
});

// Set the display name
CoreDetailsForm.displayName = 'CoreDetailsForm';
