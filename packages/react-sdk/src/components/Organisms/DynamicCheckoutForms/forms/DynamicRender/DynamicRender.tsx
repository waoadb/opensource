/* Dependencies */
import { useMemo } from 'react';

// Components
import { Accordion } from '../../../../Molecules/Accordion/Accordion';
import { Heading } from '../../../../Atoms/Heading/Heading';
import { PerformanceInformation } from '../../../../Molecules/PerformanceInformation/PerformanceInformation';

// Forms
import {
  CoreDetailsForm,
  CoreDetailsFormImperativeMethods,
} from '../../Forms/CoreDetailsForm/CoreDetailsForm';
import {
  CustomDetailsForm,
  CustomDetailsFormImperativeMethods,
} from '../../Forms/CustomDetailsForm/CustomDetailsForm';
import {
  DeliveryMethodForm,
  DeliveryMethodFormImperativeMethods,
} from '../../Forms/DeliveryMethodForm/DeliveryMethodForm';

// Models
import { ClientCartModels } from '@waoadb/contracts-client';

type Props = {
  /**
   * Cart Entry
   */
  entry: ClientCartModels.CartEntry;
  /**
   * Checkout config
   */
  checkoutConfig: ClientCartModels.CheckoutConfigItem[];
  /**
   * Ref
   */
  entryFormData: React.MutableRefObject<EntryFormRef[]>;
  /**
   * Entry Index
   */
  entryIndex: number;
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
 * Dynamic Render
 * Renders the required form fields based on the entry.
 * @param props - The component props.
 */
export const DynamicRender = ({
  entry,
  checkoutConfig,
  entryIndex,
  entryFormData,
}: Props) => {
  // Get the checkout config for the event
  const configEntry = checkoutConfig.find(
    (configEntry) => configEntry.event_id === entry.event_id
  );

  // If no config entry is found, return null.
  if (!configEntry || !entryFormData?.current) {
    return null;
  }

  // Spread the checkout config & Set render options
  const {
    coreAttendees,
    customAttendees,
    customFieldsHasLength,
    renderAttendees,
    renderCustomer,
  } = useMemo(() => {
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

    return {
      coreAttendees,
      customAttendees,
      customFieldsHasLength,
      renderAttendees,
      renderCustomer,
    };
  }, [configEntry]);

  return (
    <li className="db-w-full db-py-5" key={entry.entry_id}>
      {/* Event Details */}
      <Heading level="h3" style="h3">
        {entry.event.name}
      </Heading>
      <div className="db-w-full db-my-2">
        <PerformanceInformation performance={entry.performance} />
      </div>
      {/* / Event Details */}

      {/* Collection Method: Customer */}
      {renderCustomer && (
        <div className="db-w-full db-my-2">
          <div className="db-w-full db-py-2">
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

            {!customAttendees && customFieldsHasLength && (
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
              <div className="db-w-full db-my-2" key={ticket.ticket_entry_id}>
                <Accordion
                  title={`${ticket.name}`}
                  unmountOnClose={false}
                  el="div"
                  defaultOpen={true}
                >
                  <div className="db-w-full db-py-2">
                    {coreAttendees && (
                      <CoreDetailsForm
                        config={configEntry}
                        ref={(el) => {
                          const currentAttendees =
                            entryFormData.current[entryIndex]?.attendees || [];

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

                    {customAttendees && customFieldsHasLength && (
                      <div className="db-w-full db-mt-4">
                        <CustomDetailsForm
                          config={configEntry}
                          ref={(el) => {
                            const currentAttendees =
                              entryFormData.current[entryIndex]?.attendees ||
                              [];

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
                      </div>
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
      <div className="db-w-full db-mt-4">
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
      </div>
      {/* / Delivery Methods */}
    </li>
  );
};
