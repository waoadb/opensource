/* Dependencies */
// Modules
import { BaseModule } from '../../../Base/Base.module';

// Models
import { ClientCartModels } from '@waoadb/contracts-client';

/**
 * Checkout Module
 * Handles API Requests for the cart  checkout on the platform.
 * @class
 */
export class CheckoutModule extends BaseModule {
  /**
   * Retrieve Checkout Config.
   * @param cart_id - The cart id.
   */
  async retrieveCheckoutConfig(
    cart_id: string
  ): Promise<ClientCartModels.RetrieveCheckoutConfigResponse> {
    return this.makeGetRequest<ClientCartModels.RetrieveCheckoutConfigResponse>(
      'cart',
      '/checkout/config',
      null,
      {
        cart: cart_id,
      }
    );
  }
}
