/* Dependencies */
import { PropsWithChildren, createContext, useReducer } from 'react';

// Store
import { initialState, cartReducer } from './store/index';

/**
 * Create the cart context
 * @param reducer - Reducer function
 * @param initialState - Initial state
 * @returns
 */
export const createCartContext = <StateType, ActionType>(
  reducer: React.Reducer<StateType, ActionType>,
  initialState: StateType
) => {
  // Default dispatch
  // Used as a placeholder when the context is used outside of the provider.
  const defaultDispatch: React.Dispatch<ActionType> = () => initialState;

  // Create the context
  const CartContext = createContext({
    cartState: initialState,
    cartDispatch: defaultDispatch,
  });

  // Provider
  const Provider = (props: PropsWithChildren<{}>) => {
    const [state, dispatch] = useReducer<React.Reducer<StateType, ActionType>>(
      reducer,
      initialState
    );

    return (
      <CartContext.Provider
        value={{ cartState: state, cartDispatch: dispatch }}
        {...props}
      />
    );
  };
  return [CartContext, Provider] as const;
};

// Create the context & provider
const [ctx, CartProvider] = createCartContext(cartReducer, initialState);

// Export the context & provider
export const DifferentBreedCartContext = ctx;
export const DifferentBreedCartProvider = CartProvider;
