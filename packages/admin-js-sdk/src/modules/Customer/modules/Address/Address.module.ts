/* Dependencies */
// Modules
import { BaseModule } from '../../../Base/Base.module';

// Models
import { ClientCustomerModels } from '@waoadb/contracts-client';

/**
 * Customer Address Module
 * Handles API Requests for the customer addresses on the platform.
 * @class
 */
export class CustomerAddressModule extends BaseModule {
  /**
   * Retrieve Customer Address.
   * @param cust_id - The customer id.
   * @param params - The request parameters.
   * @param params.address_id - The address id.
   */
  async retrieveAdress(
    cust_id: string,
    params: ClientCustomerModels.RetrieveAddressRequest
  ): Promise<ClientCustomerModels.RetrieveAddressResponse> {
    return this.makeGetRequest<ClientCustomerModels.RetrieveAddressResponse>(
      'client',
      '/address',
      params,
      {
        customer: cust_id,
      }
    );
  }

  /**
   * Retrieve All Customer Addresses.
   * @param cust_id - The customer id.
   */
  async retrieveAllAdresses(
    cust_id: string
  ): Promise<ClientCustomerModels.RetrieveAddressesResponse> {
    return this.makeGetRequest<ClientCustomerModels.RetrieveAddressesResponse>(
      'client',
      '/address/all',
      null,
      {
        customer: cust_id,
      }
    );
  }

  /**
   * Create Address.
   * @param cust_id - The customer id.
   * @param payload - The address details.
   * @param payload.name - The name of the address.
   * @param payload.address_line_1 - Address line 1.
   * @param payload.address_line_2 - Address line 2 (Can be null).
   * @param payload.address_line_3 - Address line 3 (Can be null).
   * @param payload.postcode - The postcode.
   * @param payload.city - The city (Can be null).
   * @param payload.country - The country.
   * @param payload.email - The associated email (Can be null).
   * @param payload.phone_number - The associated phone number (Can be null).
   */
  async createAddress(
    cust_id: string,
    payload: ClientCustomerModels.CreateAddressRequest
  ): Promise<ClientCustomerModels.CreateAddressResponse> {
    return this.makePostRequest<ClientCustomerModels.CreateAddressResponse>(
      'client',
      '/address/create',
      payload,
      {
        customer: cust_id,
      }
    );
  }

  /**
   * Update Address.
   * @param cust_id - The customer id.
   * @param payload - The address details.
   * @param payload.address_id - The address id.
   * @param payload.name - The name of the address.
   * @param payload.address_line_1 - Address line 1.
   * @param payload.address_line_2 - Address line 2 (Can be null).
   * @param payload.address_line_3 - Address line 3 (Can be null).
   * @param payload.postcode - The postcode.
   * @param payload.city - The city (Can be null).
   * @param payload.country - The country.
   * @param payload.email - The associated email (Can be null).
   * @param payload.phone_number - The associated phone number (Can be null).
   */
  async updateAddress(
    cust_id: string,
    payload: ClientCustomerModels.UpdateAddressRequest
  ): Promise<ClientCustomerModels.UpdateAddressResponse> {
    return this.makePostRequest<ClientCustomerModels.UpdateAddressResponse>(
      'client',
      '/address/update',
      payload,
      {
        customer: cust_id,
      }
    );
  }

  /**
   * Delete Address.
   * @param cust_id - The customer id.
   * @param payload - The address details.
   * @param payload.address_id - The address id.
   */
  async deleteAddress(
    cust_id: string,
    payload: ClientCustomerModels.DeleteAddressRequest
  ): Promise<ClientCustomerModels.DeleteAddressResponse> {
    return this.makePostRequest<ClientCustomerModels.DeleteAddressResponse>(
      'client',
      '/address/delete',
      payload,
      {
        customer: cust_id,
      }
    );
  }
}
