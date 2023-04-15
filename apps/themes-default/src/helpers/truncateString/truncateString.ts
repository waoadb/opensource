/**
 * Truncate a string to a given length.
 * @param str - String to truncate
 * @param length - Length to truncate to
 * @returns
 */
export const truncateString = (str: string, length: number): string => {
  if (str.length > length) {
    return `${str.substring(0, length)}...`;
  }
  return str;
};
