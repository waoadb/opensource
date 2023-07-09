/* Dependencies */
import axios, {
  AxiosInstance,
  AxiosRequestHeaders,
  AxiosResponse,
} from 'axios';

// Models
type Props = {
  /**
   * Admin API Key.
   */
  adminAPIKey: string;
  /**
   * Profile Id
   */
  profileId: string;
};

type EndPoint = 'client' | 'cart';

/**
 * Base Module
 * All Modules extend from this class.
 * @class
 */
export class HttpClient {
  private axiosInstance: AxiosInstance;

  constructor({ adminAPIKey, profileId }: Props) {
    this.axiosInstance = axios.create({
      headers: {
        'Content-Type': 'application/json',
        'admin-key': adminAPIKey,
        profile: profileId,
      },
    });
  }

  /**
   * Gets the required endpoint.
   */
  private getEndPoint(endPoint: EndPoint): string {
    switch (endPoint) {
      case 'cart': {
        return 'https://api.differentbreed.events/cart/api/v1';
      }
      case 'client': {
        return 'https://api.differentbreed.events/client/api/v1';
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
  makeGetRequest<ResponseType>(
    endPoint: EndPoint,
    path: string,
    params?: Object,
    headers?: AxiosRequestHeaders
  ): Promise<AxiosResponse<ResponseType>> {
    return this.axiosInstance.get<ResponseType>(
      `${this.getEndPoint(endPoint)}${path}`,
      {
        params: params ? params : {},
        headers: headers ? headers : {},
      }
    );
  }

  /**
   * Makes a desired post request to the Different Breed API.
   * @param endPoint - The base endpoint to be called.
   * @param path - The URL path to be called.
   * @param payload - The data to be sent.
   * @param params - The params to be sent.
   * @param headers - The params to be sent.
   */
  makePostRequest<ResponseType>(
    endPoint: EndPoint,
    path: string,
    payload?: Object,
    headers?: AxiosRequestHeaders
  ): Promise<AxiosResponse<ResponseType>> {
    return this.axiosInstance.post<ResponseType>(
      `${this.getEndPoint(endPoint)}${path}`,
      payload,
      {
        headers: headers ? headers : {},
      }
    );
  }
}
