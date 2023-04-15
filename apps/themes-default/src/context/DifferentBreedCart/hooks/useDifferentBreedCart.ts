/* Dependencies */
import { useContext } from 'react';

// Store
import { DifferentBreedCartContext } from '..';

// Services
import { differentBreedClient } from '../../../services/differentBreedClient/differentBreedClient';

// Models
import { ClientCartModels } from '@waoadb/contracts-client';

/**
 * Use Different Breed Cart.
 * Methods for interacting with and consuming the cart.
 * @returns
 */
export const useDifferentBreedCart = () => {
  // Get the cart context.
  const { cartState, cartDispatch } = useContext(DifferentBreedCartContext);

  /**
   * Retrieves or creates a new cart.
   * @param cust_id? - Customer ID.
   */
  const retrieveCart = async (cust_id?: string) => {
    // Get the cart ID from local storage.
    const cartId = localStorage.getItem('cart_id');

    // Create a new cart.
    if (!cartId) {
      createCart(cust_id);
      return;
    }

    // Retrieve the existing cart.
    await differentBreedClient.cart
      .retrieveCart(cartId)
      .then((response) => {
        cartDispatch({ type: 'SET_CART', value: response.payload });
      })
      .catch(() => {
        // If the cart does not exist, remove the cart ID from local storage.
        localStorage.removeItem('cart_id');
        // Create a new cart.
        retrieveCart(cust_id);
      });
  };

  /**
   * Create a new cart.
   * @param cust_id? - Customer ID.
   */
  const createCart = async (cust_id?: string) => {
    // Create a new cart.
    await differentBreedClient.cart
      .createCart({ cust_id, expiry: 604800 })
      .then((response) => {
        if (response.success) {
          cartDispatch({ type: 'SET_CART', value: response.payload });
        }
      });
  };

  /**
   * Attach customer to cart.
   * @param cust_id - Customer ID.
   */
  const attachCustomerToCart = async (cust_id: string) => {
    // Add customer to cart.
    await differentBreedClient.cart
      .attachCustomer(cartState.cart!.cart_id, { cust_id })
      .then((response) => {
        if (response.success) {
          cartDispatch({ type: 'SET_CART', value: response.payload });
        }
      });
  };

  /**
   * Validate the cart.
   * @param cart_id - Cart ID.
   * @param payload - The data to be sent.
   */
  const validateCart = async (
    cart_id: string,
    payload: ClientCartModels.ValidateCartRequest
  ): Promise<boolean> => {
    // Validate the cart.
    const response = await differentBreedClient.cart.validateCart(
      cart_id,
      payload
    );

    // Return the validation status.
    return response.success;
  };

  /**
   * Delete the cart.
   * @param cart_id - Cart ID.
   */
  const deleteCart = async (cart_id: string) => {
    // Delete the cart.
    await differentBreedClient.cart.deleteCart(cart_id);

    // Remove the cart ID from local storage.
    localStorage.removeItem('cart_id');

    // Reset the cart state.
    cartDispatch({ type: 'REMOVE_CART' });
  };

  /**
   * Retrieve Checkout config.
   * @param cart_id - Cart ID.
   */
  const retrieveCheckoutConfig = async (cart_id: string) => {
    cartDispatch({ type: 'SET_CHECKOUT_CONFIG', value: null });

    // Retrieve the checkout config.
    differentBreedClient.cart.checkout
      .retrieveCheckoutConfig(cart_id)
      .then((response) => {
        if (response.success) {
          cartDispatch({
            type: 'SET_CHECKOUT_CONFIG',
            value: response.payload,
          });
        }
      });
  };

  /**
   * Add Ticket To Cart.
   * @param cart_id - Cart ID.
   * @param payload - The data to be sent.
   */
  const addTicketToCart = async (
    cart_id: string,
    payload: ClientCartModels.AddTicketToCartRequest
  ) => {
    // Add ticket to cart.
    differentBreedClient.cart.stock
      .addTicketToCart(cart_id, payload)
      .then((response) => {
        if (response.success) {
          cartDispatch({ type: 'SET_CART', value: response.payload });
        }
      });
  };

  /**
   * Remove Ticket From Cart.
   * @param cart_id - Cart ID.
   * @param payload - The data to be sent.
   */
  const removeTicketFromCart = async (
    cart_id: string,
    payload: ClientCartModels.RemoveTicketFromCartRequest
  ) => {
    // Remove ticket from cart.
    differentBreedClient.cart.stock
      .removeTicketFromCart(cart_id, payload)
      .then((response) => {
        if (response.success) {
          cartDispatch({ type: 'SET_CART', value: response.payload });
        }
      });
  };

  /**
   * Add Addon To Cart.
   * @param cart_id - Cart ID.
   * @param payload - The data to be sent.
   */
  const addAddonToCart = async (
    cart_id: string,
    payload: ClientCartModels.AddAddonToCartRequest
  ) => {
    // Add addon to cart.
    differentBreedClient.cart.stock
      .addAddonToCart(cart_id, payload)
      .then((response) => {
        if (response.success) {
          cartDispatch({ type: 'SET_CART', value: response.payload });
        }
      });
  };

  /**
   * Remove Addon From Cart.
   * @param cart_id - Cart ID.
   * @param payload - The data to be sent.
   */
  const removeAddonFromCart = async (
    cart_id: string,
    payload: ClientCartModels.RemoveAddonFromCartRequest
  ) => {
    // Remove addon from cart.
    differentBreedClient.cart.stock
      .removeAddonFromCart(cart_id, payload)
      .then((response) => {
        if (response.success) {
          cartDispatch({ type: 'SET_CART', value: response.payload });
        }
      });
  };

  return {
    cartState,
    cartDispatch,
    retrieveCart,
    createCart,
    attachCustomerToCart,
    validateCart,
    deleteCart,
    addTicketToCart,
    removeTicketFromCart,
    addAddonToCart,
    removeAddonFromCart,
    retrieveCheckoutConfig,
  };
};
