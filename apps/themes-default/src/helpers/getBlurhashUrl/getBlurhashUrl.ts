/**
 * Get the blurhash url for a given image url.
 * @param url - The image url.
 */
export const getBlurhashUrl = (url: string) => {
  return url.split('?')[0] + '?fm=blurhash&w=50';
};
