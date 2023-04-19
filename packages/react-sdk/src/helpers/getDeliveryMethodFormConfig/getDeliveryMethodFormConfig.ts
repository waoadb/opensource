/* Dependencies */
import * as yup from 'yup';

// Models
import { ClientCartModels } from '@waoadb/contracts-client';

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
  const enabledTicketDeliveryMethods: ClientCartModels.BaseDeliveryMethods['ticket_delivery_method'][] =
    [];
  const enabledAddonDeliveryMethods: ClientCartModels.BaseDeliveryMethods['addon_delivery_method'][] =
    [];

  // Determine ticket delivery methods
  if (config.delivery_options.ticket_delivery) {
    enabledTicketDeliveryMethods.push('delivery');
  }
  if (config.delivery_options.ticket_digital) {
    enabledTicketDeliveryMethods.push('digital');
  }
  if (config.delivery_options.ticket_collect) {
    enabledTicketDeliveryMethods.push('collect');
  }

  // Determine addons delivery methods
  if (config.delivery_options.addon_delivery) {
    enabledAddonDeliveryMethods.push('delivery');
  }
  if (config.delivery_options.addon_collect) {
    enabledAddonDeliveryMethods.push('collect');
  }

  // Create the initial values for the custom fields.
  const initialValues: Partial<ClientCartModels.BaseDeliveryMethods> = {
    ticket_delivery_method: enabledTicketDeliveryMethods[0],
    ...(showAddonDeliveryMethods && {
      addon_delivery_method: enabledAddonDeliveryMethods[0],
    }),
  };

  // Create the validation schema for the custom fields.
  const schema = yup.object().shape({
    ticket_delivery_method: yup
      .string()
      .oneOf(enabledTicketDeliveryMethods)
      .required(),
    ...(showAddonDeliveryMethods && {
      addon_delivery_method: yup
        .string()
        .oneOf(enabledAddonDeliveryMethods)
        .required(),
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
