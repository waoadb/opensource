/**
 * Generates a srcset attribute value for an image.
 * @param url - The url to be used.
 */

import { addUrlParams } from '../addUrlPrarms/addUrlParams';

export const generateSrcSet = (url: string): string => {
  const sizes = [300, 475, 600, 900, 1200, 1500, 1800, 2100, 2400, 2700, 3000];
  return sizes
    .map((size) => `${addUrlParams(url, `w=${size}&q=80`)} ${size}w`)
    .join(', ');
};
