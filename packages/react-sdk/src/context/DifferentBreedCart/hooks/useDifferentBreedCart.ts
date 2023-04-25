/* Dependencies */
import { useContext } from 'react';
import { DifferentBreedClient } from '@waoadb/js-client-sdk';

// Utils
import { notifications } from '../utils/Notifications/Notifications';

// Store
import { DifferentBreedCartContext } from '..';

// Models
import { ErrorResponse, ErrorResponseValidation } from '@waoadb/js-client-sdk';
import { ClientCartModels } from '@waoadb/contracts-client';

/**
 * Use Different Breed Cart.
 * Methods for interacting with and consuming the cart.
 * @param differentBreedClient - Different Breed Javascript Client.
 * @returns
 */
export const useDifferentBreedCart = (
  differentBreedClient: DifferentBreedClient
) => {
  // Get the cart context.
  const { cartState, cartDispatch } = useContext(DifferentBreedCartContext);

  /**
   * Handle Error
   * @param error - Error response.
   */
  const handleError = async (
    error: ErrorResponse | ErrorResponseValidation
  ) => {
    // Handle Expired Cart
    if (
      error.response?.status === 404 &&
      error.response?.data?.message === 'Cart has expired.'
    ) {
      // Create a new cart.
      await createCart();
      // Show error toast.
      notifications.showErrorToast(
        'Cart Expired',
        'Your cart has expired. A new cart has been created, Please try your request again.'
      );
      return;
    }

    // Handled error.
    if (error.response?.data?.message) {
      notifications.showErrorToast(
        'Request Failed',
        error.response.data.message
      );
      return;
    }

    // Unhandled Error
    notifications.showErrorToast('Request Failed', error.message);
  };

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
        createCart(cust_id);
      });
  };

  /**
   * Create a new cart.
   * @param cust_id? - Customer ID.
   */
  const createCart = async (cust_id?: string) => {
    // Create a new cart.
    await differentBreedClient.cart
      .createCart({ cust_id, expiry: 86400 })
      .then((response) => {
        if (response.success) {
          cartDispatch({ type: 'SET_CART', value: response.payload });
        }
      })
      .catch((error: ErrorResponseValidation) => handleError(error));
  };

  /**
   * Attach customer to cart.
   * @param cust_id - Customer ID.
   */
  const attachCustomerToCart = async (cust_id: string) => {
    // Add customer to cart.
    await differentBreedClient.cart
      .attachCustomer(cartState.cart_id!, { cust_id })
      .then((response) => {
        cartDispatch({ type: 'SET_CART', value: response.payload });
      })
      .catch((error: ErrorResponseValidation) => handleError(error));
  };

  /**
   * Validate the cart.
   * @param payload - The data to be sent.
   */
  const validateCart = async (
    payload: ClientCartModels.ValidateCartRequest
  ): Promise<boolean> => {
    // Validate the cart.
    const response = await differentBreedClient.cart.validateCart(
      cartState.cart_id!,
      payload
    );

    // Return the validation status.
    return response.success || false;
  };

  /**
   * Delete the cart.
   */
  const deleteCart = async () => {
    // Delete the cart.
    await differentBreedClient.cart.deleteCart(cartState.cart_id!);

    // Remove the cart ID from local storage.
    localStorage.removeItem('cart_id');

    // Reset the cart state.
    cartDispatch({ type: 'REMOVE_CART' });
  };

  /**
   * Retrieve Checkout config.
   */
  const retrieveCheckoutConfig = async () => {
    cartDispatch({ type: 'SET_CHECKOUT_CONFIG', value: null });

    // Retrieve the checkout config.
    await differentBreedClient.cart.checkout
      .retrieveCheckoutConfig(cartState.cart_id!)
      .then((response) => {
        cartDispatch({
          type: 'SET_CHECKOUT_CONFIG',
          value: response.payload,
        });
      })
      .catch((error: ErrorResponseValidation) => handleError(error));
  };

  /**
   * Add Ticket To Cart.
   * @param payload - The data to be sent.
   * @param ticket_title - The title of the ticket.
   */
  const addTicketToCart = async (
    payload: ClientCartModels.AddTicketToCartRequest,
    ticket_title: string
  ) => {
    // Add ticket to cart.
    differentBreedClient.cart.stock
      .addTicketToCart(cartState.cart_id!, payload)
      .then((response) => {
        cartDispatch({ type: 'SET_CART', value: response.payload });
        notifications.showSuccessToast(
          'Cart updated',
          `${payload.quantity} ${ticket_title} ticket${
            payload.quantity > 1 ? 's' : ''
          } added to the cart.`
        );
      })
      .catch((error: ErrorResponseValidation) => handleError(error));
  };

  /**
   * Remove Ticket From Cart.
   * @param cart_id - Cart ID.
   * @param payload - The data to be sent.
   * @param ticket_title - The title of the ticket.
   */
  const removeTicketFromCart = async (
    payload: ClientCartModels.RemoveTicketFromCartRequest,
    ticket_title: string
  ) => {
    // Remove ticket from cart.
    differentBreedClient.cart.stock
      .removeTicketFromCart(cartState.cart_id!, payload)
      .then((response) => {
        if (response.success) {
          cartDispatch({ type: 'SET_CART', value: response.payload });
          notifications.showSuccessToast(
            'Cart updated',
            `${ticket_title} ticket removed from the cart.`
          );
        }
      })
      .catch((error: ErrorResponseValidation) => handleError(error));
  };

  /**
   * Add Addon To Cart.
   * @param payload - The data to be sent.
   * @param addon_title - The title of the addon.
   */
  const addAddonToCart = async (
    payload: ClientCartModels.AddAddonToCartRequest,
    addon_title: string
  ) => {
    // Add addon to cart.
    differentBreedClient.cart.stock
      .addAddonToCart(cartState.cart_id!, payload)
      .then((response) => {
        if (response.success) {
          cartDispatch({ type: 'SET_CART', value: response.payload });
          notifications.showSuccessToast(
            'Cart updated',
            `${payload.quantity} ${addon_title} added to the cart.`
          );
        }
      })
      .catch((error: ErrorResponseValidation) => handleError(error));
  };

  /**
   * Remove Addon From Cart.
   * @param payload - The data to be sent.
   * @param addon_title - The title of the addon.
   */
  const removeAddonFromCart = async (
    payload: ClientCartModels.RemoveAddonFromCartRequest,
    addon_title: string
  ) => {
    // Remove addon from cart.
    differentBreedClient.cart.stock
      .removeAddonFromCart(cartState.cart_id!, payload)
      .then((response) => {
        if (response.success) {
          cartDispatch({ type: 'SET_CART', value: response.payload });
          notifications.showSuccessToast(
            'Cart updated',
            `${addon_title} removed from the cart.`
          );
        }
      })
      .catch((error: ErrorResponseValidation) => handleError(error));
  };

  // Return the cart state and dispatch.
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
    notifications,
  };
};
