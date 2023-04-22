/* Dependencies */
// Services
import { HttpClient } from '../../../../services/HttpClient.service';

// Models
import { ClientCartModels } from '@waoadb/contracts-client';
type Props = {
  /**
   * Http Client.
   */
  httpClient: HttpClient;
};

/**
 * Checkout Module
 * Handles API Requests for the cart  checkout on the platform.
 * @class
 */
export class CheckoutModule {
  private httpClient: HttpClient;

  constructor({ httpClient }: Props) {
    this.httpClient = httpClient;
  }

  /**
   * Retrieve Checkout Config.
   * @param cart_id - The cart id.
   */
  async retrieveCheckoutConfig(
    cart_id: string
  ): Promise<ClientCartModels.RetrieveCheckoutConfigResponse> {
    return this.httpClient
      .makeGetRequest<ClientCartModels.RetrieveCheckoutConfigResponse>(
        'cart',
        '/checkout/config',
        null,
        {
          cart: cart_id,
        }
      )
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }
}
