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
 * Alterations Module
 * Handles API Requests for the cart alterations on the platform.
 * @class
 */
export class AlterationsModule {
  private httpClient: HttpClient;

  constructor({ httpClient }: Props) {
    this.httpClient = httpClient;
  }

  /**
   * Add Fee to cart entry.
   * @param cart_id - The cart id.
   * @param payload - The data to be sent.
   * @param payload.entry_id - The cart entry id.
   * @param payload.title - The title of the alteration.
   * @param payload.description - The description of the alteration.
   * @param payload.total - The price of the alteration.
   */
  async addFeeToCart(
    cart_id: string,
    payload: ClientCartModels.AddFeeToCartRequest
  ): Promise<ClientCartModels.AddFeeToCartResponse> {
    return this.httpClient
      .makePostRequest<ClientCartModels.AddFeeToCartResponse>(
        'cart',
        '/alterations/fee/add',
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
   * Remove Fee from cart entry.
   * @param cart_id - The cart id.
   * @param payload - The data to be sent.
   * @param payload.entry_id - The cart entry id.
   * @param payload.fee_entry_id - The id of the fee entry in the cart.
   */
  async removeFeeFromCart(
    cart_id: string,
    payload: ClientCartModels.RemoveFeeFromCartRequest
  ): Promise<ClientCartModels.RemoveFeeFromCartResponse> {
    return this.httpClient
      .makePostRequest<ClientCartModels.RemoveFeeFromCartResponse>(
        'cart',
        '/alterations/fee/remove',
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
   * Add Discount to cart entry.
   * @param cart_id - The cart id.
   * @param payload - The data to be sent.
   * @param payload.entry_id - The cart entry id.
   * @param payload.title - The title of the discount.
   * @param payload.description - The description of the discount.
   * @param payload.total - The price of the discount.
   */
  async addDiscountToCart(
    cart_id: string,
    payload: ClientCartModels.AddDiscountToCartRequest
  ): Promise<ClientCartModels.AddDiscountToCartResponse> {
    return this.httpClient
      .makePostRequest<ClientCartModels.AddDiscountToCartResponse>(
        'cart',
        '/alterations/discount/add',
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
   * Remove Discount from cart entry.
   * @param cart_id - The cart id.
   * @param payload - The data to be sent.
   * @param payload.entry_id - The cart entry id.
   * @param payload.discount_entry_id - The id of the discount entry in the cart.
   */
  async removeDiscountFromCart(
    cart_id: string,
    payload: ClientCartModels.RemoveDiscountFromCartRequest
  ): Promise<ClientCartModels.RemoveDiscountFromCartResponse> {
    return this.httpClient
      .makePostRequest<ClientCartModels.RemoveDiscountFromCartResponse>(
        'cart',
        '/alterations/discount/remove',
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
}
