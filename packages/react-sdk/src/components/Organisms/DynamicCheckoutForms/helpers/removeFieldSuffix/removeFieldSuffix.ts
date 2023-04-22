/**
 * Cleans the field id by removing the _enabled and _required suffixes.
 * @param field_id - The field id.
 * @returns
 */
export const removeFieldSuffix = (field_id: string): string => {
  return field_id.replace('_enabled', '').replace('_required', '');
};
