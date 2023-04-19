/* Dependencies */
import { FormikErrors, FormikTouched } from 'formik';

// Helpers
import { handleFieldError } from '../../../../../helpers/handleFieldError/handleFieldError';

// Components
import { FieldSet } from '../../../../Molecules/Forms/FieldSet/FieldSet';
import { Input } from '../../../../Molecules/Forms/Input/Input';
import { Select } from '../../../../Molecules/Forms/Select/Select';

// Models
import { CoreDetailsFormValues } from '../../forms/CoreDetailsForm/CoreDetailsForm';
import { countries } from '../../models/countries.model';
type ShippingAddressFieldsProps = {
  values: Partial<CoreDetailsFormValues>;
  errors: FormikErrors<Partial<CoreDetailsFormValues>>;
  touched: FormikTouched<Partial<CoreDetailsFormValues>>;
  handleBlur: (e: React.FocusEvent<any>) => void;
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
}: ShippingAddressFieldsProps) => {
  return (
    <FieldSet title="Shipping Address">
      <div className="db-w-full db-grid db-grid-cols-1 db-gap-2">
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
            options={countries.map((country) => {
              return {
                value: country.code,
                key: country.name,
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
