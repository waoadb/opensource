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
 * Events Module
 * Handles API Requests for events on the platform.
 * @class
 */
export class EventsModule {
  private httpClient: HttpClient;

  constructor({ httpClient }: Props) {
    this.httpClient = httpClient;
  }

  /**
   * Retrieve events minimal.
   * Array of event slugs for use with static site generation.
   * @param params - The params to be sent.
   * @param params.limit - The limit of items to be retrieved.
   * @param params.skip - The offset of items to be retrieved.
   * @param params.query - The query to be used (Optional).
   * @param params.date_from - The date from to be used (Optional).
   * @param params.date_to - The date to to be used (Optional).
   */
  async retrieveEventsMinimal(
    params: ClientCacheModels.RetrieveEventListMinimalRequest
  ): Promise<ClientCacheModels.RetrieveEventListMinimalResponse> {
    return this.httpClient
      .makeGetRequest<ClientCacheModels.RetrieveEventListMinimalResponse>(
        'client',
        '/events/minimal',
        params
      )
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }

  /**
   * Retrieve events.
   * Array of complete events.
   * @param params - The params to be sent.
   * @param params.limit - The limit of items to be retrieved.
   * @param params.skip - The offset of items to be retrieved.
   * @param params.query - The query to be used (Optional).
   * @param params.date_from - The date from to be used (Optional).
   * @param params.date_to - The date to to be used (Optional).
   */
  async retrieveEvents(
    params: ClientCacheModels.RetrieveEventListRequest
  ): Promise<ClientCacheModels.RetrieveEventListResponse> {
    return this.httpClient
      .makeGetRequest<ClientCacheModels.RetrieveEventListResponse>(
        'client',
        '/events',
        params
      )
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }

  /**
   * Retrieve events for venue.
   * Array of complete events.
   * @param params - The params to be sent.
   * @param params.limit - The limit of items to be retrieved.
   * @param params.skip - The offset of items to be retrieved.
   * @param params.query - The query to be used (Optional).
   * @param params.date_from - The date from to be used (Optional).
   * @param params.date_to - The date to to be used (Optional).
   * @param params.venue_id - The venue id to be used.
   */
  async retrieveEventsForVenue(
    params: ClientCacheModels.RetrieveVenueEventListRequest
  ): Promise<ClientCacheModels.RetrieveVenueEventListResponse> {
    return this.httpClient
      .makeGetRequest<ClientCacheModels.RetrieveVenueEventListResponse>(
        'client',
        '/events/venue',
        params
      )
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }

  /**
   * Retrieve Event.
   * Single complete event.
   * @param params - The params to be sent.
   * @param params.event_id - This id of the venue to be retrieved.
   * @param params.password - The event password to be used. (Depends on event settings).
   */
  async retrieveEvent(
    params: ClientCacheModels.RetrieveEventRequest
  ): Promise<ClientCacheModels.RetrieveEventResponse> {
    return this.httpClient
      .makeGetRequest<ClientCacheModels.RetrieveEventResponse>(
        'client',
        '/events/event',
        params
      )
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }
}
