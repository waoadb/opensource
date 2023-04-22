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
 * Profile Module
 * Handles API Requests for profiles on the platform.
 * @class
 */
export class ProfileModule {
  private httpClient: HttpClient;

  constructor({ httpClient }: Props) {
    this.httpClient = httpClient;
  }

  /**
   * Retrieve the profile.
   */
  async retrieveProfile(): Promise<ClientCacheModels.RetrieveProfileResponse> {
    return this.httpClient
      .makeGetRequest<ClientCacheModels.RetrieveProfileResponse>(
        'client',
        '/profile'
      )
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }
}
