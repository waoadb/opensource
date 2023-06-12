/* Dependencies */
// Modules
import { StockModule } from './modules/Stock/Stock.module';

// Services
import { HttpClient } from '../../services/HttpClient.service';

// Models
import { ClientCartModels } from '@waoadb/contracts-client';
type Props = {
  /**
   * Http Client.
   */
  httpClient: HttpClient;
};

/**
 * Cart Module
 * Handles API Requests for the cart on the platform.
 * @class
 */
export class CartModule {
  // Modules
  public stock: StockModule;
  private httpClient: HttpClient;

  constructor({ httpClient }: Props) {
    this.httpClient = httpClient;

    // Initialize modules.
    this.stock = new StockModule({ httpClient: this.httpClient });
  }

  /**
   * Retrieve the cart.
   * @param cart_id - The cart id to be retrieved.
   */
  async retrieveCart(
    cart_id: string
  ): Promise<ClientCartModels.RetrieveCartResponse> {
    return this.httpClient
      .makeGetRequest<ClientCartModels.RetrieveCartResponse>(
        'cart',
        '/cart',
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

  /**
   * Create a new cart.
   * @param payload - The data to be sent.
   * @param payload.cust_id? - The customer id to be associated with the cart.
   */
  async createCart(
    payload: ClientCartModels.CreateCartRequest
  ): Promise<ClientCartModels.CreateCartResponse> {
    return this.httpClient
      .makePostRequest<ClientCartModels.CreateCartResponse>(
        'cart',
        '/cart/create',
        payload
      )
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }

  /**
   * Create a new checkout link.
   * @param cart_id - The cart id.
   */
  async retrieveCheckoutLink(
    cart_id: string
  ): Promise<ClientCartModels.RetrieveCheckoutLinkResponse> {
    return this.httpClient
      .makeGetRequest<ClientCartModels.RetrieveCheckoutLinkResponse>(
        'cart',
        '/cart/checkout-link',
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

  /**
   * Deletes a cart.
   * @param cart_id - The cart id.
   */
  async deleteCart(
    cart_id: string
  ): Promise<ClientCartModels.DeleteCartResponse> {
    return this.httpClient
      .makeGetRequest<ClientCartModels.DeleteCartResponse>(
        'cart',
        '/cart/delete',
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
