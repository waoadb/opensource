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
   * The Checkout Config.
   * Contains all the information about the checkout forms for attendees.
   */
  checkoutConfig: ClientCartModels.CheckoutConfigItem[] | null;
};

export const initialState: InitialState = {
  cart: null,
  cart_id: null,
  itemCount: 0,
  checkoutConfig: null,
};

/**
 * Actions
 */
export type CartAction =
  | { type: 'SET_CART'; value: ClientCartModels.Cart }
  | { type: 'REMOVE_CART' }
  | {
      type: 'SET_CHECKOUT_CONFIG';
      value: ClientCartModels.CheckoutConfigItem[] | null;
    };

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
    case 'REMOVE_CART': {
      return { ...initialState };
    }

    case 'SET_CHECKOUT_CONFIG': {
      return { ...state, checkoutConfig: action.value };
    }
    default: {
      return state;
    }
  }
};
