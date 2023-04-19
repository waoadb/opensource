/* Dependencies */
import { ClientCartModels } from '@waoadb/contracts-client';

// Models
type DynamicFormFieldConfig = {
  required: boolean;
  enabled: boolean;
};

/**
 * Get Dynamic Field Config.
 * @param field_prefix_id - The field prefix id.
 * @param configFields - The config fields.
 * @returns
 */
export const getDynamicFieldConfig = (
  field_prefix_id: string,
  configFields: ClientCartModels.ConfigCollectedCoreFields
): DynamicFormFieldConfig => {
  return {
    // @ts-ignore
    required: configFields[`${field_prefix_id}_required`],
    // @ts-ignore
    enabled: configFields[`${field_prefix_id}_enabled`],
  };
};
