/* Dependencies */
import React, { forwardRef, useCallback, useImperativeHandle } from 'react';

// Components
import { ToastItem } from './components/ToastItem';

// Models
import { ToastItemProps } from './components/ToastItem';

// Models
export type ToastImperativeMethods = {
  addItem: (item: Omit<ToastItemProps, 'onDismiss'>) => void;
};

type Props = {};

/**
 * Toast Component
 */
export const Toast = forwardRef<ToastImperativeMethods, Props>(
  (_, forwardedRef) => {
    // State
    const [items, setItems] = React.useState<ToastItemProps[]>([]);

    // Callbacks
    const removeItem = useCallback((id: string) => {
      setItems((items) => items.filter((item) => item.id !== id));
    }, []);

    // Imperative methods
    useImperativeHandle(
      forwardedRef,
      () => ({
        addItem: (item) => {
          setItems((items) => [
            ...items,
            {
              ...item,
              onDismiss: (id) => removeItem(id),
            },
          ]);
        },
      }),
      [removeItem]
    );

    return (
      <>
        {items.length > 0 && (
          <ul className="toast fixed top-20 right-4 overflow-y-auto overflow-x-hidden z-50 w-full max-w-xs grid grid-cols-1 gap-2">
            {items.map((item) => {
              return (
                <ToastItem
                  id={item.id}
                  key={item.id}
                  title={item.title}
                  content={item.content}
                  type={item.type}
                  onDismiss={(id) => removeItem(id)}
                  ariaLive={item.ariaLive}
                />
              );
            })}
          </ul>
        )}
      </>
    );
  }
);

// Display name
Toast.displayName = 'Toast';
