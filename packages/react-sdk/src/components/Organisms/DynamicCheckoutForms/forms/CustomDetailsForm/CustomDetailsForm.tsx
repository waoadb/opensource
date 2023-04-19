/* Dependencies */
import { forwardRef, useImperativeHandle } from 'react';
import {
  FieldArray,
  FormikProvider,
  setNestedObjectValues,
  useFormik,
} from 'formik';

// Helpers
import { getCustomFieldsFormConfig } from '../../../../../helpers/getCustomFieldsFormConfig/getCustomFieldsFormConfig';

// Components
import { DynamicFormCustomField } from '../../fields/DynamicCustomFields/DynamicCustomFields';
import { FormErrorMessage } from '../../../../Molecules/Forms/FormErrorMessage/FormErrorMessage';
import { Heading } from '../../../../Atoms/Heading/Heading';

// Models
import { ClientCartModels } from '@waoadb/contracts-client';

type CustomDetailsFormProps = {
  config: ClientCartModels.CheckoutConfigItem;
  defaultValues?: CustomDetailsFormValues;
};

export type CustomDetailsFormImperativeMethods = {
  isValid: boolean;
  values: CustomDetailsFormValues;
  validate: () => Promise<boolean>;
};

export type CustomDetailsFormValues = {
  custom_details: ClientCartModels.CartCollectedDetailsCustom[];
};

/**
 * Dynamic Checkout Form - Custom Details
 * Forwards a ref to the parent component.
 * @param params - DynamicCheckoutFormProps
 */
export const CustomDetailsForm = forwardRef<
  CustomDetailsFormImperativeMethods,
  CustomDetailsFormProps
>(({ config, defaultValues }, forwardedRef) => {
  // Get the enabled custom fields
  const enabledCustomFields = config.collected_custom.fields
    .filter((field) => field.field_enabled === true)
    .reverse();

  const { initialValues, schema, errorsPropMatch } =
    getCustomFieldsFormConfig(enabledCustomFields);

  const formik = useFormik({
    initialValues: defaultValues || initialValues,
    validationSchema: schema,
    onSubmit: () => {},
  });

  useImperativeHandle<unknown, CustomDetailsFormImperativeMethods>(
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
          Additional Details
        </Heading>

        {/* Error Messages */}
        <FormErrorMessage
          errors={formik.errors}
          touched={formik.touched}
          propMatch={errorsPropMatch}
        />
        {/* / Error Messages */}

        <FormikProvider value={formik}>
          <div className="db-w-full db-space-y-2">
            <FieldArray
              name="custom_details"
              render={(arrayHelpers) => (
                <>
                  {enabledCustomFields.map((field, customIndex) => (
                    <DynamicFormCustomField
                      field={field}
                      index={customIndex}
                      values={formik.values}
                      errors={formik.errors}
                      touched={formik.touched}
                      handleChange={formik.handleChange}
                      handleBlur={formik.handleBlur}
                      key={field.field_id}
                    />
                  ))}
                </>
              )}
            ></FieldArray>
          </div>
        </FormikProvider>
      </form>
    </div>
  );
});

// Set the display name
CustomDetailsForm.displayName = 'CustomDetailsForm';
