/* Dependencies */
import { AxiosError } from 'axios';

// Modules
import { BaseModule } from '../Base/Base.module';
import { StockModule } from './modules/Stock/Stock.module';

// Models
import { ClientCartModels } from '@waoadb/contracts-client';
import { CheckoutModule } from './modules/Checkout/Checkout.module';

/**
 * Cart Module
 * Handles API Requests for the cart on the platform.
 * @class
 */
export class CartModule extends BaseModule {
  // Modules
  public stock = new StockModule({ httpClient: this.httpClient });
  public checkout = new CheckoutModule({ httpClient: this.httpClient });

  /**
   * Retrieve the cart.
   * @param cart_id - The cart id to be retrieved.
   */
  async retrieveCart(
    cart_id: string
  ): Promise<ClientCartModels.RetrieveCartResponse> {
    return this.makeGetRequest<ClientCartModels.RetrieveCartResponse>(
      'cart',
      '/cart',
      null,
      {
        cart: cart_id,
      }
    ).catch((error: AxiosError) => {
      console.log(error.response.data);
      return null;
    });
  }

  /**
   * Create a new cart.
   * @param payload - The data to be sent.
   * @param payload.cust_id? - The customer id to be associated with the cart.
   * @param payload.expiry? - The expiry of the cart in seconds.
   */
  async createCart(
    payload: ClientCartModels.CreateCartRequest
  ): Promise<ClientCartModels.CreateCartResponse> {
    return this.makePostRequest<ClientCartModels.CreateCartResponse>(
      'cart',
      '/cart/create',
      payload
    ).catch((error: AxiosError) => {
      console.log(error.response.data);
      return null;
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
    return this.makePostRequest<ClientCartModels.AttachCustomerResponse>(
      'cart',
      '/cart/attach-customer',
      payload,
      {
        cart: cart_id,
      }
    ).catch((error: AxiosError) => {
      console.log(error.response.data);
      return null;
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
    return this.makePostRequest<ClientCartModels.ValidateCartResponse>(
      'cart',
      '/cart/validate',
      payload,
      {
        cart: cart_id,
      }
    ).catch((error: AxiosError) => {
      console.log(error.response.data);
      return null;
    });
  }

  /**
   * Deletes a cart.
   * @param cart_id - The cart id.
   */
  async deleteCart(
    cart_id: string
  ): Promise<ClientCartModels.DeleteCartResponse> {
    return this.makeGetRequest<ClientCartModels.DeleteCartResponse>(
      'cart',
      '/cart/delete',
      null,
      {
        cart: cart_id,
      }
    ).catch((error: AxiosError) => {
      console.log(error.response.data);
      return null;
    });
  }
}
