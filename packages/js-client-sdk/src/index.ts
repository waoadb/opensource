/* Dependencies */
// Services
import { HttpClient } from './services/HttpClient.service';
import { AxiosError } from 'axios';

// Modules
import { EventsModule } from './modules/Events/Events.module';
import { PerformancesModule } from './modules/Performances/Performances.module';
import { ProfileModule } from './modules/Profile/Profile.module';
import { VenuesModule } from './modules/Venues/Venues.module';
import { CartModule } from './modules/Cart/Cart.module';

// Models
import {
  ResponseError,
  ResponseValidationError,
} from '@waoadb/contracts-client';

type Props = {
  profileId: string;
  clientAPIKey: string;
};

type ErrorResponse = AxiosError<ResponseError>;
type ErrorResponseValidation = AxiosError<ResponseValidationError>;

/**
 * Different Breed Client SDK
 * Development kit for interacting with the Different Breed API.
 */
export class DifferentBreedClient {
  // HTTP Client
  private httpClient: HttpClient;

  // Modules
  public events: EventsModule;
  public performances: PerformancesModule;
  public profile: ProfileModule;
  public venues: VenuesModule;
  public cart: CartModule;

  constructor({ clientAPIKey, profileId }: Props) {
    // Create the http client.
    this.httpClient = new HttpClient({ clientAPIKey, profileId });

    // Initialize modules.
    this.events = new EventsModule({ httpClient: this.httpClient });
    this.performances = new PerformancesModule({ httpClient: this.httpClient });
    this.profile = new ProfileModule({ httpClient: this.httpClient });
    this.venues = new VenuesModule({ httpClient: this.httpClient });
    this.cart = new CartModule({ httpClient: this.httpClient });
  }
}

// Export types.
export type { ErrorResponse, ErrorResponseValidation };
