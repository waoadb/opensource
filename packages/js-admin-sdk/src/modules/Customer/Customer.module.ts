/* Dependencies */
// Services
import { HttpClient } from '../../services/HttpClient.service';

// Modules
import { CustomerAddressModule } from './modules/Address/Address.module';
import { CustomerOrdersModule } from './modules/Orders/Orders.module';

// Models
import { ClientCustomerModels } from '@waoadb/contracts-client';
type Props = {
  /**
   * Http Client.
   */
  httpClient: HttpClient;
};

/**
 * Customer Module
 * Handles API Requests for the customer on the platform.
 * @class
 */
export class CustomerModule {
  public address: CustomerAddressModule;
  public orders: CustomerOrdersModule;
  private httpClient: HttpClient;

  constructor({ httpClient }: Props) {
    this.httpClient = httpClient;

    // Initialize modules.
    this.address = new CustomerAddressModule({ httpClient: this.httpClient });
    this.orders = new CustomerOrdersModule({ httpClient: this.httpClient });
  }

  /**
   * Retrieve Customer.
   * @param cust_id - The customer id.
   */
  async retrieveCustomer(
    cust_id: string
  ): Promise<ClientCustomerModels.RetrieveCustomerResponse> {
    return this.httpClient
      .makeGetRequest<ClientCustomerModels.RetrieveCustomerResponse>(
        'client',
        '/customer',
        null,
        {
          customer: cust_id,
        }
      )
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }

  /**
   * Create Customer.
   * @param payload - The customer details.
   * @param payload.forename - The customer forename.
   * @param payload.surname - The customer surname.
   * @param payload.email - The customer email.
   */
  async createCustomer(
    payload: ClientCustomerModels.CreateCustomerRequest
  ): Promise<ClientCustomerModels.CreateCustomerResponse> {
    return this.httpClient
      .makePostRequest<ClientCustomerModels.CreateCustomerResponse>(
        'client',
        '/customer/create',
        payload
      )
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }

  /**
   * Update Customer.
   * @param cust_id - The customer id.
   * @param payload - The customer details.
   * @param payload.forename - The customer forename.
   * @param payload.surname - The customer surname.
   * @param payload.email - The customer email.
   */
  async updateCustomer(
    cust_id: string,
    payload: ClientCustomerModels.UpdateCustomerRequest
  ): Promise<ClientCustomerModels.UpdateCustomerResponse> {
    return this.httpClient
      .makePostRequest<ClientCustomerModels.UpdateCustomerResponse>(
        'client',
        '/customer/update',
        payload,
        {
          customer: cust_id,
        }
      )
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }

  /**
   * Delete Customer.
   * @param cust_id - The customer id.
   */
  async deleteCustomer(
    cust_id: string
  ): Promise<ClientCustomerModels.DeleteCustomerResponse> {
    return this.httpClient
      .makeGetRequest<ClientCustomerModels.DeleteCustomerResponse>(
        'client',
        '/customer/delete',
        null,
        {
          customer: cust_id,
        }
      )
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }
}
