/* Dependencies */
// Modules
import { BaseModule } from '../Base/Base.module';

// Models
import { ClientCacheModels } from '@waoadb/contracts-client';

/**
 * Profile Module
 * Handles API Requests for profiles on the platform.
 * @class
 */
export class ProfileModule extends BaseModule {
  /**
   * Retrieve the profile.
   */
  async retrieveProfile(): Promise<ClientCacheModels.RetrieveProfileResponse> {
    return this.makeGetRequest<ClientCacheModels.RetrieveProfileResponse>(
      'client',
      '/profile'
    );
  }
}
