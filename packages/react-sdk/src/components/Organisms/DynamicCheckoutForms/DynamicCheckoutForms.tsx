/* Dependencies */
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { v4 as uuid } from 'uuid';

// Helpers
import { convertBlankStringsToNull } from '../../../helpers/convertBlankStringsToNull/convertBlankStringsToNull';

// Components
import { CoreDetailsFormImperativeMethods } from './Forms/CoreDetailsForm/CoreDetailsForm';
import { CustomDetailsFormImperativeMethods } from './Forms/CustomDetailsForm/CustomDetailsForm';
import { DeliveryMethodFormImperativeMethods } from './Forms/DeliveryMethodForm/DeliveryMethodForm';
import { DynamicRender } from './Forms/DynamicRender/DynamicRender';

// Models
import { ClientCartModels } from '@waoadb/contracts-client';

type Props = {
  cart: ClientCartModels.Cart;
  checkoutConfig: ClientCartModels.CheckoutConfigItem[];
  onSubmit: (payload: ClientCartModels.ValidateCartRequest) => void;
};

export type DynamicCheckoutFormsImperativeMethods = {
  triggerSubmit: () => Promise<void>;
};

type EntryFormRef = {
  entry_id: string;
  customer?: {
    core: CoreDetailsFormImperativeMethods;
    custom: CustomDetailsFormImperativeMethods;
  };
  attendees: {
    core: CoreDetailsFormImperativeMethods;
    custom: CustomDetailsFormImperativeMethods;
  }[];
  delivery: DeliveryMethodFormImperativeMethods;
};

/**
 * Dynamic Checkout Forms
 * Forwards a ref to the parent component.
 * @param params - DynamicCheckoutFormProps
 * @returns - DynamicCheckoutForm
 * @example
 * const ref = useRef<DynamicCheckoutFormsImperativeMethods>();
 *
 * const triggerSubmit = () => {
 *  ref.current?.triggerSubmit();
 * }
 *
 * const onSubmit = (payload: ClientCartModels.ValidateCartRequest) => {
 *  console.log(payload);
 * }
 *
 * return (
 *  <DynamicCheckoutForms
 *     ref={ref}
 *    cart={cart}
 *    checkoutConfig={checkoutConfig}
 *    onSubmit={onSubmit}
 *  />
 * )
 */
export const DynamicCheckoutForms = forwardRef<
  DynamicCheckoutFormsImperativeMethods,
  Props
>(({ cart, checkoutConfig, onSubmit }, forwardedRef) => {
  // Reference
  const entryFormData = useRef<EntryFormRef[]>([]);

  // Calbacks
  const handleSubmit = useCallback(async () => {
    // Fire Validation
    const validationStatus: boolean[] = [];
    for (const entry of entryFormData.current) {
      if (entry.customer) {
        const coreStatus = await entry.customer?.core?.validate();
        const customStatus = await entry.customer?.custom?.validate();
        validationStatus.push(coreStatus, customStatus);
      }

      if (entry.attendees && entry.attendees.length > 0) {
        for (const attendee of entry.attendees) {
          const coreStatus = await attendee.core?.validate();
          const customStatus = await attendee.custom?.validate();
          validationStatus.push(coreStatus, customStatus);
        }
      }

      const deliveryStatus = await entry.delivery.validate();
      validationStatus.push(deliveryStatus);
    }

    // Remove Undefineds
    const cleanedValidationStatus = validationStatus.filter(
      (status) => status !== undefined
    );

    // Check if all validation passed.
    if (cleanedValidationStatus.includes(false)) {
      setTimeout(() => {
        const firstErrorElement = document.querySelector(
          '.form-error-highlight'
        );
        if (firstErrorElement) {
          firstErrorElement.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          });
        }
      }, 100);
      return;
    }

    // Form the payload.
    const entries: ClientCartModels.ValidateCartRequest = {
      attendees: [],
      delivery: [],
    };

    // Loop the cart entries and build the payload.
    cart.entries.forEach((entry) => {
      // Find the form data for the entry.
      const formData = entryFormData.current.find(
        (formData) => formData.entry_id === entry.entry_id
      );

      if (!formData) return;

      // Extract the checkout config for the entry.
      const { collected_core, collected_custom } = checkoutConfig.find(
        (checkoutConfigEntry) => checkoutConfigEntry.entry_id === entry.entry_id
      )!;

      // Set the delivery methods.
      entries.delivery.push({
        entry_id: entry.entry_id,
        ticket_delivery_method:
          formData.delivery.values.ticket_delivery_method!,
        addon_delivery_method: formData.delivery.values.addon_delivery_method!,
      });

      // Collection Method: Customer
      if (
        collected_core.collection_method === 'customer' &&
        collected_custom.collection_method === 'customer'
      ) {
        // Skip if no customer details.
        if (!formData.customer) return;

        // Core Fields
        const coreDetails = convertBlankStringsToNull(
          formData.customer.core.values
        );

        // Send [] if no custom fields.
        const customDetails = formData.customer.custom
          ? formData.customer.custom.values
          : { custom_details: [] };

        // Clean the custom details
        customDetails.custom_details.forEach((customDetail) =>
          convertBlankStringsToNull(customDetail)
        );

        const billingAddress = coreDetails.billing_address;
        const shippingAddress = coreDetails.shipping_address;

        entries.attendees.push({
          entry_id: entry.entry_id,
          attendee_id: uuid(),
          ticket_entry_id: entry.tickets[0].ticket_entry_id,
          core_details: coreDetails.core_details,
          custom_details: customDetails.custom_details,
          billing_address: billingAddress ? billingAddress : null,
          shipping_address: shippingAddress ? shippingAddress : null,
        });
      }
      // Collection Method: Attendees Or Mixed
      else {
        entry.tickets.forEach((ticket, index) => {
          const coreDetails = convertBlankStringsToNull(
            collected_core.collection_method === 'customer'
              ? formData.customer!.core.values
              : formData.attendees[index].core.values
          );

          // Send [] if no custom fields.
          const customDetails =
            collected_custom.collection_method === 'customer'
              ? formData.customer?.custom?.values || { custom_details: [] }
              : formData.attendees[index]?.custom?.values || {
                  custom_details: [],
                };

          // Clean the custom details
          customDetails.custom_details.forEach((customDetail) =>
            convertBlankStringsToNull(customDetail)
          );

          const billingAddress = coreDetails.billing_address;
          const shippingAddress = coreDetails.shipping_address;

          entries.attendees.push({
            entry_id: entry.entry_id,
            attendee_id: uuid(),
            ticket_entry_id: ticket.ticket_entry_id,
            core_details: coreDetails.core_details,
            custom_details: customDetails.custom_details,
            billing_address: billingAddress ? billingAddress : null,
            shipping_address: shippingAddress ? shippingAddress : null,
          });
        });
      }
    });

    onSubmit(entries);
  }, [cart, checkoutConfig, onSubmit]);

  // Imperative Methods
  useImperativeHandle<any, DynamicCheckoutFormsImperativeMethods>(
    forwardedRef,
    () => {
      return {
        triggerSubmit: handleSubmit,
      };
    },
    [handleSubmit]
  );

  return (
    <ul className="db-w-full db-grid db-grid-cols-1 db-divide-y db-divide-gray-100">
      {cart.entries.map((entry, entryIndex) => (
        <DynamicRender
          key={entry.entry_id}
          entry={entry}
          entryIndex={entryIndex}
          checkoutConfig={checkoutConfig}
          entryFormData={entryFormData}
        />
      ))}
    </ul>
  );
});

// Set the display name
DynamicCheckoutForms.displayName = 'DynamicCheckoutForms';
