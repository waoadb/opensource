/* Dependencies */
// Modules
import { StockModule } from './modules/Stock/Stock.module';
import { CheckoutModule } from './modules/Checkout/Checkout.module';

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
  public checkout: CheckoutModule;
  private httpClient: HttpClient;

  constructor({ httpClient }: Props) {
    this.httpClient = httpClient;

    // Initialize modules.
    this.stock = new StockModule({ httpClient: this.httpClient });
    this.checkout = new CheckoutModule({ httpClient: this.httpClient });
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
   * Attach a customer to a cart.
   * @param cart_id - The cart id.
   * @param payload - The data to be sent.
   * @param payload.cust_id - The customer id to be associated with the cart.
   */
  async attachCustomer(
    cart_id: string,
    payload: ClientCartModels.AttachCustomerRequest
  ): Promise<ClientCartModels.AttachCustomerResponse> {
    return this.httpClient
      .makePostRequest<ClientCartModels.AttachCustomerResponse>(
        'cart',
        '/cart/attach-customer',
        payload,
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
   * Validate a cart.
   * @param cart_id - The cart id.
   * @param payload - The data to be sent.
   * @param payload.delivery - The delivery method's to be used for each cart entry.
   * @param payload.attendees - The attendees to be used for each cart entry.
   */
  async validateCart(
    cart_id: string,
    payload: ClientCartModels.ValidateCartRequest
  ): Promise<ClientCartModels.ValidateCartResponse> {
    return this.httpClient
      .makePostRequest<ClientCartModels.ValidateCartResponse>(
        'cart',
        '/cart/validate',
        payload,
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
