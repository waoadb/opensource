/* Dependencies */
import axios, { AxiosInstance } from 'axios';

// Modules
import { CartModule } from './modules/Cart/Cart.module';
import { CustomerModule } from './modules/Customer/Customer.module';

// Models
type Props = {
  profileId: string;
  adminAPIKey: string;
};

/**
 * Different Breed Admin SDK
 * Development kit for interacting with the Different Breed API.
 */
export class DifferentBreedAdmin {
  // HTTP Client
  private httpClient: AxiosInstance;

  // Modules
  public cart: CartModule;
  public customer: CustomerModule;

  constructor({ adminAPIKey, profileId }: Props) {
    // Create the http client.
    this.httpClient = axios.create({
      headers: {
        'Content-Type': 'application/json',
        'admin-key': adminAPIKey,
        profile: profileId,
      },
    });

    // Initialize modules.
    this.cart = new CartModule({ httpClient: this.httpClient });
    this.customer = new CustomerModule({ httpClient: this.httpClient });
  }
}
