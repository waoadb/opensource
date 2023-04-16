/* Dependencies */
import * as yup from 'yup';

// Models
import { ClientCartModels } from '@waoadb/contracts-client';
import { CustomDetailsFormValues } from '../../forms/CustomDetailsForm/CustomDetailsForm';

/**
 * Get Custom Fields Form Config.
 * @param custom_fields - The custom fields to be configured.
 * @returns
 */
export const getCustomFieldsFormConfig = (
  custom_fields: ClientCartModels.ConfigCollectedCustomField[]
) => {
  // Create the initial values for the custom fields.
  const initialValues: CustomDetailsFormValues = {
    custom_details: custom_fields.map((field) => {
      return {
        field_id: field.field_id,
        field_value: '',
      };
    }),
  };

  // Create the validation schema for the custom fields.
  const schema = yup.object().shape({
    custom_details: yup.array(
      yup.object({
        field_id: yup.string().required(),
        field_value: yup.string().when('field_id', {
          is: (field_id: string) => {
            const field = custom_fields.find((f) => f.field_id === field_id);
            return field?.field_required;
          },
          then: () => yup.string().required('Field is required'),
          otherwise: () => yup.string(),
        }),
      })
    ),
  });

  // Error Messages
  const errorsPropMatch = {
    custom_details: "Field's highlighted below",
  };

  // Return the form config.
  return {
    schema,
    initialValues,
    errorsPropMatch,
  };
};
