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
 * Stock Module
 * Handles API Requests for the cart stock on the platform.
 * @class
 */
export class StockModule {
  private httpClient: HttpClient;

  constructor({ httpClient }: Props) {
    this.httpClient = httpClient;
  }

  /**
   * Add Ticket to cart.
   * @param cart_id - The cart id.
   * @param payload - The data to be sent.
   * @param payload.event_id - The event id.
   * @param payload.performance_id - The id of the performance.
   * @param payload.ticket_id - The id of the ticket to be added to the cart.
   * @param payload.quantity - The quantity of the ticket to be added to the cart.
   * @param payload.accessibility? - The accessibility of the ticket to be added to the cart.
   */
  async addTicketToCart(
    cart_id: string,
    payload: ClientCartModels.AddTicketToCartRequest
  ): Promise<ClientCartModels.AddTicketToCartResponse> {
    return this.httpClient
      .makePostRequest<ClientCartModels.AddTicketToCartResponse>(
        'cart',
        '/stock/ticket/add',
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
   * Remove Ticket from cart.
   * @param cart_id - The cart id.
   * @param payload - The data to be sent.
   * @param payload.entry_id - The cart entry id.
   * @param payload.ticket_entry_id - The id of the ticket entry to be removed from the cart.
   */
  async removeTicketFromCart(
    cart_id: string,
    payload: ClientCartModels.RemoveTicketFromCartRequest
  ): Promise<ClientCartModels.RemoveTicketFromCartResponse> {
    return this.httpClient
      .makePostRequest<ClientCartModels.RemoveTicketFromCartResponse>(
        'cart',
        '/stock/ticket/remove',
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
   * Add Addon to cart.
   * @param cart_id - The cart id.
   * @param payload - The data to be sent.
   * @param payload.event_id - The event id.
   * @param payload.performance_id - The id of the performance.
   * @param payload.addon_id - The id of the addon to be added to the cart.
   * @param payload.variant_id - The id of the addon variant to be added to the cart.
   * @param payload.quantity - The quantity of the addon to be added to the cart.
   */
  async addAddonToCart(
    cart_id: string,
    payload: ClientCartModels.AddAddonToCartRequest
  ): Promise<ClientCartModels.AddAddonToCartResponse> {
    return this.httpClient
      .makePostRequest<ClientCartModels.AddAddonToCartResponse>(
        'cart',
        '/stock/addon/add',
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
   * Remove Addon from cart.
   * @param cart_id - The cart id.
   * @param payload - The data to be sent.
   * @param payload.entry_id - The cart entry id.
   * @param payload.addon_entry_id - The id of the addon entry to be removed from the cart.
   */
  async removeAddonFromCart(
    cart_id: string,
    payload: ClientCartModels.RemoveAddonFromCartRequest
  ): Promise<ClientCartModels.RemoveAddonFromCartResponse> {
    return this.httpClient
      .makePostRequest<ClientCartModels.RemoveAddonFromCartResponse>(
        'cart',
        '/stock/addon/remove',
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
