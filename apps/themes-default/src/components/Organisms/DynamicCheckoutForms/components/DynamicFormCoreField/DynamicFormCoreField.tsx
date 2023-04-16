/* Dependencies */
import { FormikErrors, FormikTouched } from 'formik';

// Helpers
import { cleanFieldId } from '../../helpers/cleanFieldId/cleanFieldId';
import { handleFieldError } from '@/helpers/handleFieldError/handleFieldError';
import { getDynamicFieldConfig } from '../../helpers/getDynamicFieldConfig/getDynamicFieldConfig';

// Components
import { Select } from '@/components/Molecules/Forms/Select/Select';
import { Input } from '@/components/Molecules/Forms/Input/Input';
import { CoreDetailsFormValues } from '../../forms/CoreDetailsForm/CoreDetailsForm';

// Models
import { ClientCartModels } from '@waoadb/contracts-client';
type CollectedCoreFieldsKeys = keyof ClientCartModels.ConfigCollectedCoreFields;
type DynamicFormCoreFieldProps = {
  field_id: CollectedCoreFieldsKeys;
  configFields: ClientCartModels.ConfigCollectedCoreFields;
  values: Partial<CoreDetailsFormValues>;
  errors: FormikErrors<Partial<CoreDetailsFormValues>>;
  touched: FormikTouched<Partial<CoreDetailsFormValues>>;
  handleBlur: (e: React.FocusEvent<any>) => void;
  handleChange: (e: React.ChangeEvent<any>) => void;
};

/**
 * Dynamic Form Core Field
 * @param props - The component props.
 * @returns
 */
export const DynamicFormCoreField = ({
  field_id,
  configFields,
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
}: DynamicFormCoreFieldProps) => {
  // Clean the field id
  const cleanedFieldId = cleanFieldId(field_id);

  // Get the field config
  const fieldConfig = getDynamicFieldConfig(cleanedFieldId, configFields);

  // Render Desired Field
  switch (field_id) {
    case 'title_enabled': {
      return (
        <Select
          name="core_details.title"
          label="Title"
          options={[
            { value: 'Mr', key: 'Mr' },
            { value: 'Mrs', key: 'Mrs' },
            { value: 'Miss', key: 'Miss' },
            { value: 'Ms', key: 'Ms' },
            { value: 'Dr', key: 'Dr' },
            { value: 'Prof', key: 'Prof' },
          ]}
          placeholder="---"
          required={fieldConfig.required}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.core_details!.title!}
          error={handleFieldError(errors, touched, 'core_details.title')}
          key={field_id}
        />
      );
    }
    case 'first_name_enabled': {
      return (
        <Input
          name="core_details.first_name"
          label="First Name"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.core_details!.first_name!}
          error={handleFieldError(errors, touched, 'core_details.first_name')}
          required={fieldConfig.required}
          inputMode="text"
          type="text"
          key={field_id}
        />
      );
    }
    case 'surname_enabled': {
      return (
        <Input
          name="core_details.surname"
          label="Surname Name"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.core_details!.surname!}
          error={handleFieldError(errors, touched, 'core_details.surname')}
          required={fieldConfig.required}
          inputMode="text"
          type="text"
          key={field_id}
        />
      );
    }
    case 'email_enabled': {
      return (
        <Input
          name="core_details.email_address"
          label="Emaill Address"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.core_details!.email_address!}
          error={handleFieldError(
            errors,
            touched,
            'core_details.email_address'
          )}
          required={fieldConfig.required}
          inputMode="text"
          type="text"
          key={field_id}
        />
      );
    }
    case 'mobile_phone_enabled': {
      return (
        <Input
          name="core_details.mobile_phone"
          label="Mobile Phone"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.core_details!.mobile_phone!}
          error={handleFieldError(errors, touched, 'core_details.mobile_phone')}
          required={fieldConfig.required}
          inputMode="tel"
          type="tel"
          key={field_id}
        />
      );
    }
    case 'work_phone_enabled': {
      return (
        <Input
          name="core_details.work_phone"
          label="Work Phone"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.core_details!.work_phone!}
          error={handleFieldError(errors, touched, 'core_details.work_phone')}
          required={fieldConfig.required}
          inputMode="tel"
          type="tel"
          key={field_id}
        />
      );
    }

    case 'job_title_enabled': {
      return (
        <Input
          name="core_details.job_title"
          label="Job Title"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.core_details!.job_title!}
          error={handleFieldError(errors, touched, 'core_details.job_title')}
          required={fieldConfig.required}
          inputMode="text"
          type="text"
          key={field_id}
        />
      );
    }
    case 'company_name_enabled': {
      return (
        <Input
          name="core_details.company_name"
          label="Company Name"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.core_details!.company_name!}
          error={handleFieldError(errors, touched, 'core_details.company_name')}
          required={fieldConfig.required}
          inputMode="text"
          type="text"
          key={field_id}
        />
      );
    }
    case 'gender_enabled': {
      return (
        <Select
          name="core_details.gender"
          label="Gender"
          options={[
            { value: 'Male', key: 'Male' },
            { value: 'Female', key: 'Female' },
            { value: 'Man/Trans Woman', key: 'Trans Man/Trans Woman' },
            { value: 'Man/Woman', key: 'Man/Woman' },
            { value: 'Transgender', key: 'Transgender' },
            {
              value: 'Genderqueer/Gender Non-Conforming',
              key: 'Genderqueer/Gender Non-Conforming',
            },
            { value: 'Non-Binary', key: 'Non-Binary' },
            { value: 'Questioning', key: 'Questioning' },
            { value: 'Prefer Not To Say', key: 'Prefer Not To Say' },
          ]}
          placeholder="---"
          required={fieldConfig.required}
          onChange={handleChange}
          onBlur={handleBlur}
          error={handleFieldError(errors, touched, 'core_details.gender')}
          value={values.core_details!.gender!}
          key={field_id}
        />
      );
    }
    case 'website_url_enabled': {
      return (
        <Input
          name="core_details.website_url"
          label="Website URL"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.core_details!.website_url!}
          error={handleFieldError(errors, touched, 'core_details.website_url')}
          required={fieldConfig.required}
          inputMode="url"
          type="url"
          key={field_id}
        />
      );
    }
  }
};
