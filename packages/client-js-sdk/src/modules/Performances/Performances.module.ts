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
 * Performances Module
 * Handles API Requests for performances on the platform.
 * @class
 */
export class PerformancesModule {
  private httpClient: HttpClient;

  constructor({ httpClient }: Props) {
    this.httpClient = httpClient;
  }

  /**
   * Retrieve Performances.
   * Array of complete performances.
   * @param params - The params to be sent.
   * @param params.limit - The limit of items to be retrieved.
   * @param params.skip - The offset of items to be retrieved.
   * @param params.event_id - The event id to be used.
   * @param params.query - The query to be used (Optional).
   * @param params.date_from - The date from to be used (Optional).
   * @param params.date_to - The date to to be used (Optional).
   */
  async retrievePerformances(
    params: ClientCacheModels.RetrievePerformancesRequest
  ): Promise<ClientCacheModels.RetrievePerformancesResponse> {
    return this.httpClient
      .makeGetRequest<ClientCacheModels.RetrievePerformancesResponse>(
        'client',
        '/performances',
        params
      )
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }

  /**
   * Retrieve Performance.
   * Single complete performance.
   * @param params - The params to be sent.
   * @param params.event_id - This id of the venue to be retrieved.
   * @param params.performance_id - This id of the performance to be retrieved.
   */
  async retrievePerformance(
    params: ClientCacheModels.RetrievePerformanceRequest
  ): Promise<ClientCacheModels.RetrievePerformanceResponse> {
    return this.httpClient
      .makeGetRequest<ClientCacheModels.RetrievePerformanceResponse>(
        'client',
        '/performances/performance',
        params
      )
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }
}
