/* Dependencies */
import { FormikErrors, FormikTouched } from 'formik';

// Helpers
import { handleFieldError } from '../../helpers/handleFieldError/handleFieldError';

// Components
import { Input } from '../Forms/Input/Input';
import { TextArea } from '../Forms/TextArea/TextArea';

// Models
import { ClientCartModels } from '@waoadb/contracts-client';
import { CustomDetailsFormValues } from '../../forms/CustomDetailsForm/CustomDetailsForm';

// Models
type DynamicFormCoreFieldProps = {
  field: ClientCartModels.ConfigCollectedCustomField;
  index: number;
  values: CustomDetailsFormValues;
  errors: FormikErrors<CustomDetailsFormValues>;
  touched: FormikTouched<CustomDetailsFormValues>;
  handleBlur: (e: React.FocusEvent<any>) => void;
  handleChange: (e: React.ChangeEvent<any>) => void;
};

/**
 * Dynamic Form Core Field
 * @param props - The component props.
 * @returns
 */
export const DynamicFormCustomField = ({
  field,
  index,
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
}: DynamicFormCoreFieldProps) => {
  switch (field.field_type) {
    case 'text': {
      return (
        <Input
          name={`custom_details[${index}].field_value`}
          label={field.field_name}
          type="text"
          value={values.custom_details[index].field_value}
          onChange={handleChange}
          onBlur={handleBlur}
          error={handleFieldError(
            errors,
            touched,
            `custom_details[${index}].field_value`
          )}
          required={field.field_required}
          inputMode="text"
          key={field.field_id}
        />
      );
    }
    case 'textarea': {
      return (
        <TextArea
          name={`custom_details[${index}].field_value`}
          label={field.field_name}
          value={values.custom_details[index].field_value}
          onChange={handleChange}
          onBlur={handleBlur}
          error={handleFieldError(
            errors,
            touched,
            `custom_details[${index}].field_value`
          )}
          required={field.field_required}
          key={field.field_id}
        />
      );
    }
    default: {
      return null;
    }
  }
};
