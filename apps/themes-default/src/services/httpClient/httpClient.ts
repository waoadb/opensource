/* Dependencies */
import {
  ClientCartModels,
  ClientCustomerModels,
} from '@waoadb/contracts-client';

/* Dependencies */
class HTTPClient {
  /**
   * Attach a customer to a cart.
   * @param cart_id - The cart ID
   * @param payload - The payload
   * @returns
   */
  async attachCustomer(
    cart_id: string,
    payload: ClientCustomerModels.CreateCustomerRequest
  ) {
    const response = await fetch(`/api/attach-customer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cart_id,
        ...payload,
      }),
    });

    return response.json();
  }

  /**
   * Mark a cart as sold.
   * @param cart_id - The cart ID
   * @param payload - The payload
   * @returns
   */
  async markCartAsSold(
    cart_id: string,
    payload: ClientCartModels.ValidateCartRequest
  ) {
    const response = await fetch(`/api/mark-cart-sold`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cart_id,
        ...payload,
      }),
    });

    return response.json();
  }
}

// Exports
export const httpClient = new HTTPClient();
