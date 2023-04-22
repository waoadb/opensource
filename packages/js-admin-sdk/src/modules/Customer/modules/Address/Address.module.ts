/* Dependencies */
// Services
import { HttpClient } from '../../../../services/HttpClient.service';

// Models
import { ClientCustomerModels } from '@waoadb/contracts-client';
type Props = {
  /**
   * Http Client.
   */
  httpClient: HttpClient;
};

/**
 * Customer Address Module
 * Handles API Requests for the customer addresses on the platform.
 * @class
 */
export class CustomerAddressModule {
  private httpClient: HttpClient;

  constructor({ httpClient }: Props) {
    this.httpClient = httpClient;
  }

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
    return this.httpClient
      .makeGetRequest<ClientCustomerModels.RetrieveAddressResponse>(
        'client',
        '/address',
        params,
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
   * Retrieve All Customer Addresses.
   * @param cust_id - The customer id.
   */
  async retrieveAllAdresses(
    cust_id: string
  ): Promise<ClientCustomerModels.RetrieveAddressesResponse> {
    return this.httpClient
      .makeGetRequest<ClientCustomerModels.RetrieveAddressesResponse>(
        'client',
        '/address/all',
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
    return this.httpClient
      .makePostRequest<ClientCustomerModels.CreateAddressResponse>(
        'client',
        '/address/create',
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
    return this.httpClient
      .makePostRequest<ClientCustomerModels.UpdateAddressResponse>(
        'client',
        '/address/update',
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
   * Delete Address.
   * @param cust_id - The customer id.
   * @param payload - The address details.
   * @param payload.address_id - The address id.
   */
  async deleteAddress(
    cust_id: string,
    payload: ClientCustomerModels.DeleteAddressRequest
  ): Promise<ClientCustomerModels.DeleteAddressResponse> {
    return this.httpClient
      .makePostRequest<ClientCustomerModels.DeleteAddressResponse>(
        'client',
        '/address/delete',
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
}
