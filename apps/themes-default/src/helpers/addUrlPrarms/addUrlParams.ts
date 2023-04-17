/**
 * Takes a url and appends the desired params string.
 * @param url - The url to be used.
 * @param params - The params to be applied.
 * @returns
 */
export const addUrlParams = (url: string, params: string): string => {
  return `${url}${url.includes('?') ? '&' : '?'}${'format=webp&'}${params}`;
};
