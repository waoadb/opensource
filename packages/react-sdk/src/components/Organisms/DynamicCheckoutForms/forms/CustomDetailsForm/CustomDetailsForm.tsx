/* Dependencies */
import { forwardRef, useMemo, useImperativeHandle } from 'react';
import {
  FieldArray,
  FormikProvider,
  setNestedObjectValues,
  useFormik,
} from 'formik';

// Helpers
import { getCustomFieldsFormConfig } from '../../helpers/getCustomFieldsFormConfig/getCustomFieldsFormConfig';

// Components
import { DynamicFormCustomField } from '../../Fields/DynamicCustomFields/DynamicCustomFields';
import { FormErrorMessage } from '../../../../Molecules/Forms/FormErrorMessage/FormErrorMessage';
import { FieldSet } from '../../../../Molecules/Forms/FieldSet/FieldSet';

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
 * Form - Custom Details
 * Forwards a ref to the parent component.
 * @param params - DynamicCheckoutFormProps
 */
export const CustomDetailsForm = forwardRef<
  CustomDetailsFormImperativeMethods,
  CustomDetailsFormProps
>(({ config, defaultValues }, forwardedRef) => {
  // Get the enabled custom fields and config
  const {
    enabledCustomFields,
    enabledFieldsConfig: { initialValues, schema, errorsPropMatch },
  } = useMemo(() => {
    // Get the enabled custom fields
    const enabledCustomFields = config.collected_custom.fields
      .filter((field) => field.field_enabled === true)
      .reverse();

    // Get the enabled custom fields config
    const enabledFieldsConfig = getCustomFieldsFormConfig(enabledCustomFields);

    // Return the data
    return { enabledCustomFields, enabledFieldsConfig };
  }, [config.collected_custom.fields]);

  // Create Formik Instance
  const formik = useFormik({
    initialValues: defaultValues || initialValues,
    validateOnMount: true,
    validationSchema: schema,
    onSubmit: () => {},
  });

  // Imperative Methods
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
        <FieldSet title="Additional Details" titleSize="h4">
          {/* Error Messages */}
          <FormErrorMessage
            errors={formik.errors}
            touched={formik.touched}
            propMatch={errorsPropMatch}
          />
          {/* / Error Messages */}

          {/*  Custom Fields  */}
          <FormikProvider value={formik}>
            <div className="db-w-full db-space-y-2 db-mt-2">
              <FieldArray
                name="custom_details"
                render={() => (
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
          {/*  / Custom Fields  */}
        </FieldSet>
      </form>
    </div>
  );
});

// Set the display name
CustomDetailsForm.displayName = 'CustomDetailsForm';
