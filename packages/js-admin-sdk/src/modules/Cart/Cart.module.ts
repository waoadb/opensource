/* Dependencies */
// Services
import { HttpClient } from '../../services/HttpClient.service';

// Modules
import { AlterationsModule } from './modules/Alterations/Alterations.module';

// Models
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
}
