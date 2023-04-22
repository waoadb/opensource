/* Dependencies */
// Services
import { HttpClient } from '../../../../services/HttpClient.service';

// Models
import { ClientOrderModels } from '@waoadb/contracts-client';
type Props = {
  /**
   * Http Client.
   */
  httpClient: HttpClient;
};

/**
 * Customer Orders Module
 * Handles API Requests for the customer orders on the platform.
 * @class
 */
export class CustomerOrdersModule {
  private httpClient: HttpClient;

  constructor({ httpClient }: Props) {
    this.httpClient = httpClient;
  }

  /**
   * Retrieve Customer Orders List.
   * @param cust_id - The customer id.
   * @param params - The request parameters.
   * @param params.limit - The number of orders to retrieve.
   * @param params.skip - The offset of the orders to retrieve.
   * @param params.date_from? - The date from which to retrieve orders.
   * @param params.date_to? - The date to which to retrieve orders.
   * @param params.query? - The query to search for.
   */
  async retrieveOrdersList(
    cust_id: string,
    params: ClientOrderModels.RetrieveOrderListRequest
  ): Promise<ClientOrderModels.RetrieveOrderListResponse> {
    return this.httpClient
      .makeGetRequest<ClientOrderModels.RetrieveOrderListResponse>(
        'client',
        '/orders',
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
   * Retrieve Customer Order.
   * @param cust_id - The customer id.
   * @param params - The request parameters.
   * @param params.order_id - The order id.
   */
  async retrieveOrder(
    cust_id: string,
    params: ClientOrderModels.RetrieveOrderRequest
  ): Promise<ClientOrderModels.RetrieveOrderResponse> {
    return this.httpClient
      .makeGetRequest<ClientOrderModels.RetrieveOrderResponse>(
        'client',
        '/orders/order',
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
}
