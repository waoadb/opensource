/* Dependencies */

// Modules
import { AxiosError } from 'axios';
import { BaseModule } from '../Base/Base.module';

// Models
import { ClientCacheModels } from '@waoadb/contracts-client';

/**
 * Events Module
 * Handles API Requests for events on the platform.
 * @class
 */
export class EventsModule extends BaseModule {
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
    return this.makeGetRequest<ClientCacheModels.RetrieveEventListMinimalResponse>(
      'client',
      '/events/minimal',
      params
    ).catch((error: AxiosError) => {
      console.log(error.response.data);
      return null;
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
    return this.makeGetRequest<ClientCacheModels.RetrieveEventListResponse>(
      'client',
      '/events',
      params
    ).catch((error: AxiosError) => {
      console.log(error.response.data);
      return null;
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
    return this.makeGetRequest<ClientCacheModels.RetrieveVenueEventListResponse>(
      'client',
      '/events/venue',
      params
    ).catch((error: AxiosError) => {
      console.log(error.response.data);
      return null;
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
    return this.makeGetRequest<ClientCacheModels.RetrieveEventResponse>(
      'client',
      '/events/event',
      params
    ).catch((error: AxiosError) => {
      console.log(error.response.data);
      return null;
    });
  }
}
