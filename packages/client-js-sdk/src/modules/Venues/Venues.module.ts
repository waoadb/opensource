/* Dependencies */

// Modules
import { AxiosError } from 'axios';
import { BaseModule } from '../Base/Base.module';

// Models
import { ClientCacheModels } from '@waoadb/contracts-client';

/**
 * Venues Module
 * Handles API Requests for venues on the platform.
 * @class
 */
export class VenuesModule extends BaseModule {
  /**
   * Retrieve venues minimal.
   * Array of venue slugs for use with static site generation.
   * @param params - The params to be sent.
   * @param params.limit - The limit of items to be retrieved.
   * @param params.skip - The offset of items to be retrieved.
   * @param params.query - The query to be used (Optional).
   */
  async retrieveVenuesMinimal(
    params: ClientCacheModels.RetrieveVenuesMinimalRequest
  ): Promise<ClientCacheModels.RetrieveVenuesMinimalResponse> {
    return this.makeGetRequest<ClientCacheModels.RetrieveVenuesMinimalResponse>(
      'client',
      '/venues/minimal',
      params
    ).catch((error: AxiosError) => {
      console.log(error.response.data);
      return null;
    });
  }

  /**
   * Retrieve Venues.
   * Array of complete venues.
   * @param params - The params to be sent.
   * @param params.limit - The limit of items to be retrieved.
   * @param params.skip - The offset of items to be retrieved.
   * @param params.query - The query to be used (Optional).
   */
  async retrieveVenues(
    params: ClientCacheModels.RetrieveVenuesRequest
  ): Promise<ClientCacheModels.RetrieveVenuesResponse> {
    return this.makeGetRequest<ClientCacheModels.RetrieveVenuesResponse>(
      'client',
      '/venues',
      params
    ).catch((error: AxiosError) => {
      console.log(error.response.data);
      return null;
    });
  }

  /**
   * Retrieve Venue.
   * Single complete venue.
   * @param params - The params to be sent.
   * @param params.venue_id - This id of the venue to be retrieved.
   */
  async retrieveVenue(
    params: ClientCacheModels.RetrieveVenueRequest
  ): Promise<ClientCacheModels.RetrieveVenueResponse> {
    return this.makeGetRequest<ClientCacheModels.RetrieveVenueResponse>(
      'client',
      '/venues/venue',
      params
    ).catch((error: AxiosError) => {
      console.log(error.response.data);
      return null;
    });
  }
}
