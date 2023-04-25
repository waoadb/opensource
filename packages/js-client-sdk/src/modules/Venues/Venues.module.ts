/* Dependencies */
// Services
import { HttpClient } from '../../services/HttpClient.service';

// Models
import { ClientCacheModels } from '@waoadb/contracts-client';
type Props = {
  /**
   * Http Client.
   */
  httpClient: HttpClient;
};

/**
 * Venues Module
 * Handles API Requests for venues on the platform.
 * @class
 */
export class VenuesModule {
  private httpClient: HttpClient;

  constructor({ httpClient }: Props) {
    this.httpClient = httpClient;
  }

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
    return this.httpClient
      .makeGetRequest<ClientCacheModels.RetrieveVenuesMinimalResponse>(
        'client',
        '/venues/minimal',
        params
      )
      .then((response) => response.data)
      .catch((error) => {
        throw error;
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
    return this.httpClient
      .makeGetRequest<ClientCacheModels.RetrieveVenuesResponse>(
        'client',
        '/venues',
        params
      )
      .then((response) => response.data)
      .catch((error) => {
        throw error;
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
    return this.httpClient
      .makeGetRequest<ClientCacheModels.RetrieveVenueResponse>(
        'client',
        '/venues/venue',
        params
      )
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }
}
