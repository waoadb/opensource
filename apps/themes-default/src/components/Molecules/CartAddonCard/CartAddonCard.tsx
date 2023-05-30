/* Dependencies */
import { Formik } from 'formik';
import * as Yup from 'yup';

// Helpers
import { formatCurrency } from '@waoadb/js-client-sdk';
import { handleFieldError } from '@/helpers/handleFieldError/handleFieldError';

// Components
import { Heading } from '@/components/Atoms/Heading/Heading';
import { Paragraph } from '@/components/Atoms/Paragraph/Paragraph';
import { ImageAtom } from '@/components/Atoms/ImageAtom/ImageAtom';
import { Button } from '@/components/Atoms/Button/Button';
import { Select } from '../Forms/Select/Select';

// Validation
const validationSchema = Yup.object().shape({
  addon_entry_id: Yup.string()
    .uuid('Invalid cart entry id')
    .required('Required'),
  entry_id: Yup.string().uuid('Invalid cart entry id').required('Required'),
});

// Models
import {
  ClientCartModels,
  ClientGenericModels,
} from '@waoadb/contracts-client';
type Props = {
  /**
   * Addon
   */
  addon: ClientCartModels.CartAddon;
  /**
   * Currency
   */
  currency: ClientGenericModels.CurrencyCode['code'];
  /**
   * Cart entry id
   */
  entry_id: string;
  /**
   * Handle Submit
   */
  onSubmit: (
    addon: ClientCartModels.RemoveAddonFromCartRequest,
    title: string,
    callback: () => void
  ) => void;
};

/**
 * Cart Addon Card
 * @param props - Component props.
 * @returns
 */
export const CartAddonCard = ({
  addon,
  entry_id,
  onSubmit,
  currency,
}: Props) => {
  return (
    <li className="w-full py-4">
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
        {/* Image */}
        {addon.picture && (
          <div className="relative overflow-hidden w-full rounded-lg">
            <ImageAtom
              imageSrc={addon.picture.url}
              altText={addon.picture.alt_text}
              ratio="1:1"
              fit="object-cover"
              position="object-center"
              restrictSize="card"
            />
          </div>
        )}
        {/* / Image */}
        {/* Content */}
        <div className="w-full md:col-span-2 h-full flex flex-col flex-wrap justify-center">
          <div className="w-full">
            <Heading level="h3" style="h4" className="mb-2">
              {addon.name}
            </Heading>

            {addon.description && (
              <Paragraph className="mt-0">{addon.description}</Paragraph>
            )}

            <Paragraph className="mt-1">
              <span aria-atomic={true} aria-live="polite">
                <span className="sr-only">Price:</span>
                {formatCurrency(addon.price, currency)}
              </span>
            </Paragraph>

            <Formik
              initialValues={{
                addon_entry_id: addon.addon_entry_id,
                entry_id,
              }}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                onSubmit(
                  {
                    addon_entry_id: values.addon_entry_id,
                    entry_id: values.entry_id,
                  },
                  addon.name,
                  () => {
                    setSubmitting(false);
                    resetForm();
                  }
                );
              }}
            >
              {({
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isValid,
                isSubmitting,
              }) => (
                <form onSubmit={handleSubmit} className="mt-2">
                  <div className="w-full grid grid-cols-1 md:grid-cols-3 items-end gap-2 mt-2">
                    <div className="w-full md:col-span-2">
                      <Select
                        labelVisible={true}
                        label="Variant"
                        placeholder="Select a variant"
                        name="variant_id"
                        disabled={true}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={addon.variant_id}
                        options={[
                          {
                            value: addon.variant_id,
                            key: addon.variant_name,
                          },
                        ]}
                        error={handleFieldError(errors, touched, 'variant_id')}
                      />
                    </div>

                    <Button
                      className="w-full mt-2 md:mt-0"
                      type="submit"
                      variant="hollowAlert"
                      accessibleTitle={`Remove single ${
                        addon.name
                      }, priced at ${formatCurrency(
                        addon.price,
                        currency
                      )} from your cart.`}
                      disabled={!isValid || isSubmitting}
                    >
                      Remove
                    </Button>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      {/* / Content */}
    </li>
  );
};
