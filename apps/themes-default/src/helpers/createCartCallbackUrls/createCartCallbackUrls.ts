/* Dependencies */
import { ClientCartModels } from '@waoadb/contracts-client';

/**
 * Create Cart Callback Urls.
 * @returns
 */
export const createCartCallbackUrls =
  (): ClientCartModels.CreateCartRequest => {
    // @ts-ignore
    if (typeof window === 'undefined')
      return {
        callbacks: {
          success_url: '',
          cancel_url: '',
        },
      };

    return {
      callbacks: {
        success_url: `${window.location.origin}/complete`,
        cancel_url: `${window.location.origin}/cart`,
      },
    };
  };
