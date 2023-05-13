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

// Models
import {
  ClientCartModels,
  ClientGenericModels,
} from '@waoadb/contracts-client';
import { CoreDetailsFormValues } from '../../Forms/CoreDetailsForm/CoreDetailsForm';

type ShippingAddressFieldsProps = {
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
 * Get Shipping Address Fields
 * @param props - The component props.
 */
export const ShippingAddressFields = ({
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
  configFields,
}: ShippingAddressFieldsProps) => {
  // Config
  const { errorsShippingAddressPropMatch } = useMemo(() => {
    return getCoreFieldsFormConfig(configFields);
  }, [configFields]);

  return (
    <FieldSet title="Shipping Address" titleSize="h4">
      <FormErrorMessage
        errors={errors}
        touched={touched}
        propMatch={errorsShippingAddressPropMatch}
      />

      <div className="db-w-full db-grid db-grid-cols-1 db-gap-2 db-mt-2">
        {/* Address Name */}
        <div className="db-w-full">
          <Input
            name="shipping_address.name"
            label="Address Name"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.shipping_address!.name!}
            error={handleFieldError(errors, touched, 'shipping_address.name')}
            required={true}
            inputMode="text"
            type="text"
          />
        </div>
        {/* / Address Name */}
        {/* Address Line 1 */}
        <div className="db-w-full">
          <Input
            name="shipping_address.address_line_1"
            label="Address Line 1"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.shipping_address!.address_line_1!}
            error={handleFieldError(
              errors,
              touched,
              'shipping_address.address_line_1'
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
            name="shipping_address.address_line_2"
            label="Address Line 2"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.shipping_address!.address_line_2!}
            error={handleFieldError(
              errors,
              touched,
              'shipping_address.address_line_2'
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
            name="shipping_address.address_line_3"
            label="Address Line 3"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.shipping_address!.address_line_3!}
            error={handleFieldError(
              errors,
              touched,
              'shipping_address.address_line_3'
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
              name="shipping_address.postcode"
              label="Postcode"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.shipping_address!.postcode!}
              error={handleFieldError(
                errors,
                touched,
                'shipping_address.postcode'
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
              name="shipping_address.city"
              label="City / Town"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.shipping_address!.city!}
              error={handleFieldError(errors, touched, 'shipping_address.city')}
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
            name="shipping_address.country"
            label="Country"
            options={ClientGenericModels.countryCodes.map((country) => {
              return {
                value: country.code,
                key: country.title,
              };
            })}
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.shipping_address!.country!}
            placeholder="---"
            error={handleFieldError(
              errors,
              touched,
              'shipping_address.country'
            )}
            required={true}
          />
        </div>
        {/* / Country */}
      </div>
    </FieldSet>
  );
};
