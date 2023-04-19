/* Dependencies */
// Modules
import { BaseModule } from '../../../Base/Base.module';

// Models
import { ClientCartModels } from '@waoadb/contracts-client';

/**
 * Alterations Module
 * Handles API Requests for the cart alterations on the platform.
 * @class
 */
export class AlterationsModule extends BaseModule {
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
    return this.makePostRequest<ClientCartModels.AddFeeToCartResponse>(
      'cart',
      '/alterations/fee/add',
      payload,
      {
        cart: cart_id,
      }
    );
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
    return this.makePostRequest<ClientCartModels.RemoveFeeFromCartResponse>(
      'cart',
      '/alterations/fee/remove',
      payload,
      {
        cart: cart_id,
      }
    );
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
    return this.makePostRequest<ClientCartModels.AddDiscountToCartResponse>(
      'cart',
      '/alterations/discount/add',
      payload,
      {
        cart: cart_id,
      }
    );
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
    return this.makePostRequest<ClientCartModels.RemoveDiscountFromCartResponse>(
      'cart',
      '/alterations/discount/remove',
      payload,
      {
        cart: cart_id,
      }
    );
  }
}
