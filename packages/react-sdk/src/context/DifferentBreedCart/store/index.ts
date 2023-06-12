/* Dependnecies */
// Models
import { ClientCartModels } from '@waoadb/contracts-client';

/**
 * Initial State
 */
type InitialState = {
  /**
   * The Cart Object.
   * Contains all the information about the cart.
   */
  cart: ClientCartModels.Cart | null;
  /**
   * Cart id.
   */
  cart_id: string | null;
  /**
   * The number of items in the cart.
   */
  itemCount: number;

  /**
   * The Checkout Link.
   */
  checkoutLink: ClientCartModels.RetrieveCheckoutLinkResponse['payload'] | null;
};

// Initial State
export const initialState: InitialState = {
  cart: null,
  cart_id: null,
  itemCount: 0,
  checkoutLink: null,
};

/**
 * Actions
 */
export type CartAction =
  | { type: 'SET_CART'; value: ClientCartModels.Cart }
  | {
      type: 'SET_CHECKOUT_LINK';
      value: ClientCartModels.RetrieveCheckoutLinkResponse['payload'];
    }
  | { type: 'REMOVE_CART' };

/**
 * Reducer
 * @param state - The current state.
 * @param action - The action to perform.
 */
export const cartReducer = (
  state: InitialState,
  action: CartAction
): InitialState => {
  switch (action.type) {
    case 'SET_CART': {
      // Set the cart id.
      localStorage.setItem('cart_id', action.value.cart_id);

      // Set the state.
      return {
        ...state,
        cart: action.value,
        cart_id: action.value.cart_id,
        itemCount: action.value.entries.reduce((prev, current) => {
          return prev + current.tickets.length + current.addons.length;
        }, 0),
      };
    }

    case 'SET_CHECKOUT_LINK': {
      return {
        ...state,
        checkoutLink: action.value,
      };
    }

    case 'REMOVE_CART': {
      return { ...initialState };
    }

    default: {
      return state;
    }
  }
};
