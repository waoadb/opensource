/* Dependencies */
import { useCallback, useRef } from 'react';
import { v4 as uuid } from 'uuid';

// Helpers
import { addUrlParams } from '../../../helpers/addUrlPrarms/addUrlParams';
import { cleanObjects } from './helpers/cleanObjects/cleanObjects';

// Components
import { Accordion } from '../Accordion/Accordion';
import {
  CoreDetailsForm,
  CoreDetailsFormImperativeMethods,
} from './forms/CoreDetailsForm/CoreDetailsForm';
import {
  CustomDetailsForm,
  CustomDetailsFormImperativeMethods,
} from './forms/CustomDetailsForm/CustomDetailsForm';
import {
  DeliveryMethodForm,
  DeliveryMethodFormImperativeMethods,
} from './forms/DeliveryMethodForm/DeliveryMethodForm';

// Models
import { ClientCartModels } from '@waoadb/contracts-client';

type DynamicCheckourFormsProps = {
  cart: ClientCartModels.Cart;
  checkoutConfig: ClientCartModels.CheckoutConfigItem[];
  onSubmit: (payload: ClientCartModels.ValidateCartRequest) => void;
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

export const DynamicCheckoutForms = ({
  cart,
  checkoutConfig,
  onSubmit,
}: DynamicCheckourFormsProps) => {
  const entryFormData = useRef<EntryFormRef[]>([]);

  const handleSubmit = useCallback(async () => {
    // Fire Validation
    const validationStatus: boolean[] = [];
    for (const entry of entryFormData.current) {
      if (entry.customer) {
        const coreStatus = await entry.customer?.core?.validate();
        const customStatus = await entry.customer?.custom?.validate();
        validationStatus.push(coreStatus, customStatus);
      }

      for (const attendee of entry.attendees) {
        const coreStatus = await attendee.core?.validate();
        const customStatus = await attendee.custom?.validate();
        validationStatus.push(coreStatus, customStatus);
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
        if (!formData.customer) return;

        const coreDetails = cleanObjects(formData.customer.core.values);
        const customDetails = formData.customer.custom.values;

        // Clean the cuystom details
        customDetails.custom_details.forEach((customDetail) =>
          cleanObjects(customDetail)
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
          const coreDetails = cleanObjects(
            collected_core.collection_method === 'customer'
              ? formData.customer!.core.values
              : formData.attendees[index].core.values
          );
          const customDetails =
            collected_custom.collection_method === 'customer'
              ? formData.customer!.custom.values
              : formData.attendees[index].custom.values;

          // Clean the custom details
          customDetails.custom_details.forEach((customDetail) =>
            cleanObjects(customDetail)
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
  }, [cart, checkoutConfig]);

  return (
    <>
      <ul className="w-full mt-10 grid grid-cols-1 gap-5">
        {cart.entries.map((entry, entryIndex) => {
          // Get the checkout config for the event
          const configEntry = checkoutConfig.find(
            (configEntry) => configEntry.event_id === entry.event_id
          );

          // If no config entry is found, return null.
          if (!configEntry) return null;

          // Spread the checkout config
          const { collected_core, collected_custom } = configEntry;

          // Check if custom fields has length
          // [] is sent if no custom fields are defined.
          const customFieldsHasLength = collected_custom.fields.length > 0;

          // Check methods for attendees
          const coreAttendees = collected_core.collection_method === 'attendee';
          const customAttendees =
            collected_custom.collection_method === 'attendee' &&
            customFieldsHasLength;

          // Determine render types
          const renderAttendees = coreAttendees || customAttendees;
          const renderCustomer =
            !coreAttendees || (!customAttendees && customFieldsHasLength);

          return (
            <li className="w-full" key={entry.entry_id}>
              {/* Event Details */}
              <div className="mx-auto shadow px-4 py-6 bg-white rounded-md">
                <div className="flex bg-pink-600 rounded-md relative">
                  <div className="flex">
                    <div className="px-4 py-6 border-r border-pink-500">
                      <div className="h-10 w-10">
                        {entry.event.picture?.url && (
                          <img
                            src={addUrlParams(
                              entry.event.picture.url,
                              'w=80&q=80'
                            )}
                            alt={entry.event.picture.alt_text}
                            className="h-full w-full rounded-full overflow-hidden shadow object-cover"
                          />
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col justify-center pl-3 py-2 sm:py-0">
                      <h3 className="text-2xl font-bold text-white pb-1">
                        {entry.event.name}
                      </h3>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center">
                        <p className="text-md text-white leading-5">
                          Tickets: {entry.tickets.length}
                        </p>
                        <p className="text-md text-white leading-5 ml-2">
                          Addons: {entry.addons.length}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* / Event Details */}

              {/* Collection Method: Customer */}
              {renderCustomer && (
                <div className="w-full my-2">
                  <div className="w-full py-2">
                    {!coreAttendees && (
                      <CoreDetailsForm
                        config={configEntry}
                        ref={(el) => {
                          entryFormData.current[entryIndex] = {
                            ...entryFormData.current[entryIndex],
                            entry_id: entry.entry_id,
                            customer: {
                              ...entryFormData.current[entryIndex]?.customer!,
                              core: el!,
                            },
                          };
                        }}
                      />
                    )}

                    {!customAttendees && (
                      <CustomDetailsForm
                        config={configEntry}
                        ref={(el) => {
                          // Update the current entry
                          entryFormData.current[entryIndex] = {
                            ...entryFormData.current[entryIndex],
                            entry_id: entry.entry_id,
                            customer: {
                              ...entryFormData.current[entryIndex]?.customer!,
                              custom: el!,
                            },
                          };
                        }}
                      />
                    )}
                  </div>
                </div>
              )}
              {/* / Collection Method: Customer */}

              {/* Collection Method: Attendees */}
              {renderAttendees && (
                <>
                  {entry.tickets.map((ticket, ticketIndex) => {
                    return (
                      <div className="w-full my-2" key={ticket.ticket_entry_id}>
                        <Accordion
                          title={`${ticket.name}`}
                          unmountOnClose={false}
                          el="div"
                        >
                          <div className="w-full py-2">
                            {coreAttendees && (
                              <CoreDetailsForm
                                config={configEntry}
                                ref={(el) => {
                                  const currentAttendees =
                                    entryFormData.current[entryIndex]
                                      ?.attendees || [];

                                  currentAttendees[ticketIndex] = {
                                    ...currentAttendees[ticketIndex],
                                    core: el!,
                                  };

                                  entryFormData.current[entryIndex] = {
                                    ...entryFormData.current[entryIndex],
                                    entry_id: entry.entry_id,
                                    attendees: currentAttendees,
                                  };
                                }}
                              />
                            )}

                            {customAttendees && (
                              <CustomDetailsForm
                                config={configEntry}
                                ref={(el) => {
                                  const currentAttendees =
                                    entryFormData.current[entryIndex]
                                      ?.attendees || [];

                                  currentAttendees[ticketIndex] = {
                                    ...currentAttendees[ticketIndex],
                                    custom: el!,
                                  };

                                  entryFormData.current[entryIndex] = {
                                    ...entryFormData.current[entryIndex],
                                    entry_id: entry.entry_id,
                                    attendees: currentAttendees,
                                  };
                                }}
                              />
                            )}
                          </div>
                        </Accordion>
                      </div>
                    );
                  })}
                </>
              )}
              {/* / Collection Method: Attendees */}

              {/* Delivery Methods */}
              <DeliveryMethodForm
                config={configEntry}
                showAddonDeliveryMethods={entry.addons.length > 0}
                ref={(el) => {
                  entryFormData.current[entryIndex] = {
                    ...entryFormData.current[entryIndex],
                    entry_id: entry.entry_id,
                    delivery: el!,
                  };
                }}
              />
              {/* / Delivery Methods */}
            </li>
          );
        })}
      </ul>
      <div className="w-full mt-10">
        <button
          className="text-base block font-normal leading-none bg-pink-600 text-white rounded-full px-4 py-4 hover:no-underline hover:opacity-90 focus:opacity-90 mx-auto"
          aria-label={`Make Payment & Finalise Order`}
          onClick={handleSubmit}
        >
          Complete Order
        </button>
      </div>
    </>
  );
};
