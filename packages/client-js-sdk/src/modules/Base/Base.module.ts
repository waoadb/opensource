/* Dependencies */
import { AxiosInstance, AxiosRequestHeaders } from 'axios';

// Models
type BaseProps = {
  /**
   * Axios HTTP Client to be used by the instance.
   */
  httpClient: AxiosInstance;
};

type EndPoint = 'client' | 'cart';

/**
 * Base Module
 * All Modules extend from this class.
 * @class
 */
export class BaseModule {
  public httpClient: AxiosInstance;

  constructor(props: BaseProps) {
    this.httpClient = props.httpClient;
  }

  /**
   * Gets the required endpoint.
   */
  getEndPoint(endPoint: EndPoint): string {
    switch (endPoint) {
      case 'cart': {
        return 'https://ms-cart.differentbreed.events/api/v1';
      }
      case 'client': {
        return 'https://ms-client.differentbreed.events/api/v1';
      }
    }
  }

  /**
   * Makes a desired get request to the Different Breed API.
   * @param endPoint - The base endpoint to be called.
   * @param path - The URL path to be called.
   * @param params - The params to be sent.
   * @param headers - The params to be sent.
   */
  async makeGetRequest<ResponseType>(
    endPoint: EndPoint,
    path: string,
    params?: Object,
    headers?: AxiosRequestHeaders
  ): Promise<ResponseType> {
    const response = await this.httpClient.get<ResponseType>(
      `${this.getEndPoint(endPoint)}${path}`,
      {
        params: params ? params : {},
        headers: headers ? headers : {},
      }
    );

    return response.data;
  }

  /**
   * Makes a desired post request to the Different Breed API.
   * @param endPoint - The base endpoint to be called.
   * @param path - The URL path to be called.
   * @param payload - The data to be sent.
   * @param params - The params to be sent.
   * @param headers - The params to be sent.
   */
  async makePostRequest<ResponseType>(
    endPoint: EndPoint,
    path: string,
    payload?: Object,
    headers?: AxiosRequestHeaders
  ): Promise<ResponseType> {
    const response = await this.httpClient.post<ResponseType>(
      `${this.getEndPoint(endPoint)}${path}`,
      payload,
      {
        headers: headers ? headers : {},
      }
    );
    return response.data;
  }
}
