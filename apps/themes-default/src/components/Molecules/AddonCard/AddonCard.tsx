/* Dependencies */
import { ChangeEvent, useMemo, useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import classNames from 'classnames';

// Helpers
import { formatCurrency } from '@waoadb/js-client-sdk';
import { handleFieldError } from '@/helpers/handleFieldError/handleFieldError';

// Components
import { Heading } from '@/components/Atoms/Heading/Heading';
import { Paragraph } from '@/components/Atoms/Paragraph/Paragraph';
import { ImageAtom } from '@/components/Atoms/ImageAtom/ImageAtom';
import { Button } from '@/components/Atoms/Button/Button';
import { Input } from '../Forms/Input/Input';
import { Select } from '../Forms/Select/Select';

// Models
import {
  ClientCacheModels,
  ClientCartModels,
  ClientGenericModels,
} from '@waoadb/contracts-client';

type Props = {
  /**
   * Addon
   */
  addon: ClientCacheModels.CachePerformance['stock']['addons'][0];
  /**
   * Currency
   */
  currency: ClientGenericModels.CurrencyCode['code'];
  /**
   * Event id
   */
  event_id: string;
  /**
   * Performance id
   */
  performance_id: string;
  /**
   * Handle Submit
   */
  onSubmit: (
    addon: ClientCartModels.AddAddonToCartRequest,
    title: string,
    callback: () => void
  ) => void;
};

/**
 * Addon Card
 * @param param props - Component props.
 * @returns
 */
export const AddonCard = ({
  addon,
  event_id,
  performance_id,
  onSubmit,
  currency,
}: Props) => {
  // State
  const [selectedVariant, setSelectedVariant] = useState(addon.variants[0]);

  // Create validation schema
  const validationSchema = useMemo(() => {
    const min_quantity = selectedVariant?.availability.min_quantity || 1;
    const max_quantity = selectedVariant?.availability.max_quantity || 10;

    return Yup.object().shape({
      variant_id: Yup.string()
        .uuid('Must be a valid variant id')
        .required('Please select a variant'),
      quantity: Yup.number()
        .min(min_quantity || 1, `Min Allowed: ${min_quantity}`)
        .max(max_quantity, `Max Allowed: ${max_quantity}`)
        .required('Please enter a quantity'),
    });
  }, [selectedVariant]);

  return (
    <li className="w-full py-4">
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
        {/* Image */}
        <div className="relative overflow-hidden w-full rounded-lg">
          <ImageAtom
            imageSrc={addon.picture?.url || ''}
            altText={addon.picture?.alt_text || ''}
            blurhash={addon.picture?.blurhash}
            ratio="1:1"
            fit="object-cover"
            position="object-center"
            restrictSize="card"
          />
        </div>
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
                {formatCurrency(selectedVariant.price, currency)}
              </span>
            </Paragraph>

            <Formik
              initialValues={{
                quantity: 0,
                variant_id: addon.variants[0].variant_id,
              }}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                onSubmit(
                  {
                    addon_id: addon.addon_id,
                    event_id,
                    performance_id,
                    quantity: values.quantity,
                    variant_id: values.variant_id,
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
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isValid,
                isSubmitting,
              }) => (
                <form onSubmit={handleSubmit} className="mt-2">
                  <Select
                    labelVisible={true}
                    label="Variant"
                    placeholder="Select a variant"
                    name="variant_id"
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                      setSelectedVariant(
                        addon.variants.find(
                          (variant) => variant.variant_id === e.target.value
                        )!
                      );
                      handleChange(e);
                    }}
                    onBlur={handleBlur}
                    value={values.variant_id}
                    options={addon.variants.map((variant) => {
                      return {
                        selected: variant.variant_id === values.variant_id,
                        key: variant.name,
                        value: variant.variant_id,
                      };
                    })}
                    error={handleFieldError(errors, touched, 'variant_id')}
                  />
                  <div
                    className={classNames(
                      'w-full grid grid-cols-1 md:grid-cols-3 gap-2 mt-2',
                      handleFieldError(errors, touched, 'quantity')
                        ? 'items-center'
                        : 'items-end'
                    )}
                  >
                    <div className="w-full md:col-span-2">
                      <Input
                        type="number"
                        label="Quantity"
                        labelVisible={true}
                        name="quantity"
                        inputMode="numeric"
                        placeholder="Quantity"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.quantity}
                        min={selectedVariant.availability.min_quantity || 1}
                        max={selectedVariant.availability.max_quantity || 10}
                        error={handleFieldError(errors, touched, 'quantity')}
                      />
                    </div>
                    <Button
                      className="w-full mt-2 md:mt-0"
                      type="submit"
                      variant="primary"
                      accessibleTitle={`Add ${values.quantity} of ${
                        addon.variants.find(
                          (variant) => variant.variant_id === values.variant_id
                        )?.name
                      } to your cart.`}
                      disabled={!isValid || isSubmitting}
                    >
                      Add To Cart
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
