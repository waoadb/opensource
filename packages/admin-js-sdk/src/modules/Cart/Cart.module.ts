/* Dependencies */
// Services
import { HttpClient } from '../../services/HttpClient.service';

// Modules
import { AlterationsModule } from './modules/Alterations/Alterations.module';

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
  public alterations: AlterationsModule;
  private httpClient: HttpClient;

  constructor({ httpClient }: Props) {
    this.httpClient = httpClient;

    // Initialize modules.
    this.alterations = new AlterationsModule({ httpClient: this.httpClient });
  }

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
    return this.httpClient
      .makePostRequest<ClientCartModels.MarkPendingSaleResponse>(
        'cart',
        '/cart/pending-sale',
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
   * Mark cart as sold.
   * @param cart_id - The cart id.
   * @param payload - The data to be sent.
   * @param payload.paid - Status of payment.
   */
  async markAsSold(
    cart_id: string,
    payload: ClientCartModels.MarkCartAsSoldRequest
  ): Promise<ClientCartModels.MarkCartAsSoldResponse> {
    return this.httpClient
      .makePostRequest<ClientCartModels.MarkCartAsSoldResponse>(
        'cart',
        '/cart/mark-sold',
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
