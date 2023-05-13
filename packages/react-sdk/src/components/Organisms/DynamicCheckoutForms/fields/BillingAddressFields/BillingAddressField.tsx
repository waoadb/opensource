/* Dependencies */
import { useMemo } from 'react';
import { FormikErrors, FormikTouched } from 'formik';

// Helpers
import { handleFieldError } from '../../../../../helpers/handleFieldError/handleFieldError';
import { getCoreFieldsFormConfig } from '../../helpers/getCoreFieldsFormConfig/getCoreFieldsValidationSchema';

// Components
import { FieldSet } from '../../../../Molecules/Forms/FieldSet/FieldSet';
import { Input } from '../../../../Molecules/Forms/Input/Input';
import { Select } from '../../../../Molecules/Forms/Select/Select';
import { FormErrorMessage } from '../../../../Molecules/Forms/FormErrorMessage/FormErrorMessage';
import { CoreDetailsFormValues } from '../../Forms/CoreDetailsForm/CoreDetailsForm';

// Models
import {
  ClientCartModels,
  ClientGenericModels,
} from '@waoadb/contracts-client';

type BillingAddressFieldsProps = {
  /**
   * The core fields.
   */
  configFields: ClientCartModels.ConfigCollectedCoreFields;
  /**
   * The form values.
   */
  values: Partial<CoreDetailsFormValues>;
  /**
   * The form errors.
   */
  errors: FormikErrors<Partial<CoreDetailsFormValues>>;
  /**
   * The form touched fields.
   */
  touched: FormikTouched<Partial<CoreDetailsFormValues>>;
  /**
   * The form handle blur.
   */
  handleBlur: (e: React.FocusEvent<any>) => void;
  /**
   * The form handle change.
   */
  handleChange: (e: React.ChangeEvent<any>) => void;
};

/**
 * Get Billing Address Fields
 * @param props - The component props.
 */
export const BillingAddressFields = ({
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
  configFields,
}: BillingAddressFieldsProps) => {
  // Config
  const { errorsBillingAddressPropMatch } = useMemo(() => {
    return getCoreFieldsFormConfig(configFields);
  }, [configFields]);

  return (
    <FieldSet title="Billing Address" titleSize="h4">
      <FormErrorMessage
        errors={errors}
        touched={touched}
        propMatch={errorsBillingAddressPropMatch}
      />

      <div className="db-w-full db-grid db-grid-cols-1 db-gap-2 db-mt-2">
        {/* Address Name */}
        <div className="db-w-full">
          <Input
            name="billing_address.name"
            label="Address Name"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.billing_address!.name!}
            error={handleFieldError(errors, touched, 'billing_address.name')}
            required={true}
            inputMode="text"
            type="text"
          />
        </div>
        {/* / Address Name */}
        {/* Address Line 1 */}
        <div className="db-w-full">
          <Input
            name="billing_address.address_line_1"
            label="Address Line 1"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.billing_address!.address_line_1!}
            error={handleFieldError(
              errors,
              touched,
              'billing_address.address_line_1'
            )}
            required={true}
            inputMode="text"
            type="text"
          />
        </div>
        {/* / Address Line 1 */}
        {/* Address Line 2 */}
        <div className="db-w-full">
          <Input
            name="billing_address.address_line_2"
            label="Address Line 2"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.billing_address!.address_line_2!}
            error={handleFieldError(
              errors,
              touched,
              'billing_address.address_line_2'
            )}
            required={false}
            inputMode="text"
            type="text"
          />
        </div>
        {/* / Address Line 2 */}
        {/* Address Line 3 */}
        <div className="db-w-full">
          <Input
            name="billing_address.address_line_3"
            label="Address Line 3"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.billing_address!.address_line_3!}
            error={handleFieldError(
              errors,
              touched,
              'billing_address.address_line_3'
            )}
            required={false}
            inputMode="text"
            type="text"
          />
        </div>
        {/* / Address Line 3 */}
        <div className="db-w-full db-grid db-gap-2 db-grid-cols-1 sm:db-grid-cols-2">
          {/* Postcode */}
          <div className="db-w-full">
            <Input
              name="billing_address.postcode"
              label="Postcode"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.billing_address!.postcode!}
              error={handleFieldError(
                errors,
                touched,
                'billing_address.postcode'
              )}
              required={true}
              inputMode="text"
              type="text"
            />
          </div>
          {/* / Postcode */}
          {/* City */}
          <div className="db-w-full">
            <Input
              name="billing_address.city"
              label="City / Town"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.billing_address!.city!}
              error={handleFieldError(errors, touched, 'billing_address.city')}
              required={true}
              inputMode="text"
              type="text"
            />
          </div>
          {/* / City */}
        </div>
        {/* Country */}
        <div className="db-w-full">
          <Select
            name="billing_address.country"
            label="Country"
            options={ClientGenericModels.countryCodes.map((country) => {
              return {
                value: country.code,
                key: country.title,
              };
            })}
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.billing_address!.country!}
            placeholder="---"
            error={handleFieldError(errors, touched, 'billing_address.country')}
            required={true}
          />
        </div>
        {/* / Country */}
      </div>
    </FieldSet>
  );
};
