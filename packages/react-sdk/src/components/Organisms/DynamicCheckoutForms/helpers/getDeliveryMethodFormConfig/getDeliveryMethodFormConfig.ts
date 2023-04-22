/* Dependencies */
import * as yup from 'yup';

// Models
import { ClientCartModels } from '@waoadb/contracts-client';

type EnabledTicketDeliveryMethods = {
  /**
   * The title of the delivery method.
   */
  title: string;
  /**
   * The value of the delivery method.
   * This is the value that will be sent to the API.
   */
  value: ClientCartModels.BaseDeliveryMethods['ticket_delivery_method'];
};

type EnabledAddonDeliveryMethods = {
  /**
   * The title of the delivery method.
   */
  title: string;
  /**
   * The value of the delivery method.
   * This is the value that will be sent to the API.
   */
  value: ClientCartModels.BaseDeliveryMethods['addon_delivery_method'];
};

/**
 * Get Delivery Methods Form Config.
 * @param config - The checkout config.
 * @param showAddonDeliveryMethods - Whether to show addon delivery methods.
 * @returns
 */
export const getDeliveryMethodsFormConfig = (
  config: ClientCartModels.CheckoutConfigItem,
  showAddonDeliveryMethods: boolean
) => {
  // Get the enabled custom fields
  const enabledTicketDeliveryMethods: EnabledTicketDeliveryMethods[] = [];
  const enabledAddonDeliveryMethods: EnabledAddonDeliveryMethods[] = [];

  // Determine ticket delivery methods
  if (config.delivery_options.ticket_delivery) {
    enabledTicketDeliveryMethods.push({
      title: 'Postal Delivery',
      value: 'delivery',
    });
  }
  if (config.delivery_options.ticket_digital) {
    enabledTicketDeliveryMethods.push({
      title: 'Digital Tickets',
      value: 'digital',
    });
  }
  if (config.delivery_options.ticket_collect) {
    enabledTicketDeliveryMethods.push({
      title: 'Collect At Venue',
      value: 'collect',
    });
  }

  // Determine addons delivery methods
  if (config.delivery_options.addon_delivery) {
    enabledAddonDeliveryMethods.push({
      title: 'Postal Delivery',
      value: 'delivery',
    });
  }
  if (config.delivery_options.addon_collect) {
    enabledAddonDeliveryMethods.push({
      title: 'Collect At Venue',
      value: 'collect',
    });
  }

  // Create the initial values for the custom fields.
  const initialValues: Partial<ClientCartModels.BaseDeliveryMethods> = {
    ticket_delivery_method: enabledTicketDeliveryMethods[0].value,
    ...(showAddonDeliveryMethods && {
      addon_delivery_method: enabledAddonDeliveryMethods[0].value,
    }),
  };

  // Create the validation schema for the custom fields.
  const schema = yup.object().shape({
    ticket_delivery_method: yup
      .string()
      .oneOf(enabledTicketDeliveryMethods.map((method) => method.value))
      .required('Please select a ticket delivery method.'),
    ...(showAddonDeliveryMethods && {
      addon_delivery_method: yup
        .string()
        .oneOf(enabledAddonDeliveryMethods.map((method) => method.value))
        .required('Please select an addon delivery method.'),
    }),
  });

  // Error Messages
  const errorsPropMatch = {
    ticket_delivery_method: 'Ticket Delivery Method',
    addon_delivery_method: 'Addon Delivery Method',
  };

  // Return the form config.
  return {
    schema,
    initialValues,
    errorsPropMatch,
    enabledTicketDeliveryMethods,
    enabledAddonDeliveryMethods,
  };
};
