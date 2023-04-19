/* Dependencies */
// Modules
import { BaseModule } from '../Base/Base.module';

// Models
import { ClientCustomerModels } from '@waoadb/contracts-client';
import { CustomerAddressModule } from './modules/Address/Address.module';
import { CustomerOrdersModule } from './modules/Orders/Orders.module';

/**
 * Customer Module
 * Handles API Requests for the customer on the platform.
 * @class
 */
export class CustomerModule extends BaseModule {
  // Modules
  public address = new CustomerAddressModule({ httpClient: this.httpClient });
  public orders = new CustomerOrdersModule({ httpClient: this.httpClient });

  /**
   * Retrieve Customer.
   * @param cust_id - The customer id.
   */
  async retrieveCustomer(
    cust_id: string
  ): Promise<ClientCustomerModels.RetrieveCustomerResponse> {
    return this.makeGetRequest<ClientCustomerModels.RetrieveCustomerResponse>(
      'client',
      '/customer',
      null,
      {
        customer: cust_id,
      }
    );
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
    return this.makePostRequest<ClientCustomerModels.CreateCustomerResponse>(
      'client',
      '/customer/create',
      payload
    );
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
    return this.makePostRequest<ClientCustomerModels.UpdateCustomerResponse>(
      'client',
      '/customer/update',
      payload,
      {
        customer: cust_id,
      }
    );
  }

  /**
   * Delete Customer.
   * @param cust_id - The customer id.
   */
  async deleteCustomer(
    cust_id: string
  ): Promise<ClientCustomerModels.DeleteCustomerResponse> {
    return this.makeGetRequest<ClientCustomerModels.DeleteCustomerResponse>(
      'client',
      '/customer/delete',
      null,
      {
        customer: cust_id,
      }
    );
  }
}
