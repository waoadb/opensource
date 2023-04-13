/* Dependencies */
import { AxiosError } from 'axios';

// Modules
import { BaseModule } from '../Base/Base.module';
import { AlterationsModule } from './modules/Alterations/Alterations.module';

// Models
import { ClientCartModels } from '@waoadb/contracts-client';

/**
 * Cart Module
 * Handles API Requests for the cart on the platform.
 * @class
 */
export class CartModule extends BaseModule {
  // Modules
  public alterations = new AlterationsModule({
    httpClient: this.httpClient,
  });

  /**
   * Mark cart as pending sale.
   * @param cart_id - The cart id.
   * @param payload - The data to be sent.
   * @param payload.delivery - The delivery method's to be used for each cart entry.
   * @param payload.attendees - The attendees to be used for each cart entry.
   */
  async markPendingSale(
    cart_id: string,
    payload: ClientCartModels.MarkPendingSaleRequest
  ): Promise<ClientCartModels.MarkPendingSaleResponse> {
    return this.makePostRequest<ClientCartModels.MarkPendingSaleResponse>(
      'cart',
      '/cart/pending-sale',
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
   * Mark cart as sold.
   * @param cart_id - The cart id.
   * @param payload - The data to be sent.
   * @param payload.paid - Status of payment.
   */
  async markAsSold(
    cart_id: string,
    payload: ClientCartModels.MarkCartAsSoldRequest
  ): Promise<ClientCartModels.MarkCartAsSoldResponse> {
    return this.makePostRequest<ClientCartModels.MarkCartAsSoldResponse>(
      'cart',
      '/cart/mark-sold',
      payload,
      {
        cart: cart_id,
      }
    ).catch((error: AxiosError) => {
      console.log(error.response.data);
      return null;
    });
  }
}
