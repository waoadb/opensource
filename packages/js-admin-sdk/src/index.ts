/* Dependencies */
import { AxiosError } from 'axios';
// Services
import { HttpClient } from './services/HttpClient.service';

// Modules
import { CartModule } from './modules/Cart/Cart.module';
import { CustomerModule } from './modules/Customer/Customer.module';

// Models
import { ClientGenericModels } from '@waoadb/contracts-client';

type Props = {
  profileId: string;
  adminAPIKey: string;
};

type ErrorResponse = AxiosError<ClientGenericModels.ResponseError>;
type ErrorResponseValidation =
  AxiosError<ClientGenericModels.ResponseValidationError>;

/**
 * Different Breed Admin SDK
 * Development kit for interacting with the Different Breed API.
 */
export class DifferentBreedAdmin {
  // HTTP Client
  private httpClient: HttpClient;

  // Modules
  public cart: CartModule;
  public customer: CustomerModule;

  constructor({ adminAPIKey, profileId }: Props) {
    // Create the http client.
    this.httpClient = new HttpClient({ adminAPIKey, profileId });

    // Initialize modules.
    this.cart = new CartModule({ httpClient: this.httpClient });
    this.customer = new CustomerModule({ httpClient: this.httpClient });
  }
}

// Export types.
export type { ErrorResponse, ErrorResponseValidation };
