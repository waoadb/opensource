/* Dependencies */
import { ClientCacheModels } from '@waoadb/contracts-client';

/**
 * Format Venue Address
 * @param venue - Venue to format.
 */
export const formatVenueAddress = (
  venue: ClientCacheModels.CacheVenue
): string => {
  let formattedAddress = '';
  if (venue.address_line_1) {
    formattedAddress += venue.address_line_1;
  }
  if (venue.address_line_2) {
    formattedAddress += `,  <br />${venue.address_line_2}`;
  }
  if (venue.address_line_3) {
    formattedAddress += `, <br />${venue.address_line_3}`;
  }
  if (venue.postcode) {
    formattedAddress += `, <br />${venue.postcode}`;
  }
  if (venue.city) {
    formattedAddress += `, ${venue.city}`;
  }
  if (venue.country) {
    formattedAddress += `, <br />${venue.country}`;
  }

  // Return formatted address
  return formattedAddress;
};
