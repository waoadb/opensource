/* Dependencies */
// Models
import { ClientCacheModels } from '@waoadb/contracts-client';

/**
 * Get the accessibility options for a venue
 * @param venue - The venue to get the accessibility options for.
 * @returns
 */
export const getVenueAccessibility = (
  venue: ClientCacheModels.CacheVenue
): Array<keyof ClientCacheModels.CacheVenue['accessibility']> => {
  return Object.keys(venue.accessibility).filter(
    (key) =>
      venue.accessibility[
        key as keyof ClientCacheModels.CacheVenue['accessibility']
      ] === true
  ) as Array<keyof ClientCacheModels.CacheVenue['accessibility']>;
};
