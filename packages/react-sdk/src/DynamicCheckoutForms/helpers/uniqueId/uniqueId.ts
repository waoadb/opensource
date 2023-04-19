/**
 * Generates a unique id.
 */
export const uniqueId = (): string => {
  return `_${Math.random().toString(36).substr(2, 9)}`;
};
