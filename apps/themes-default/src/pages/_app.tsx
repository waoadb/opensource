/* Dependencies */
import type { AppProps } from 'next/app';
import { useEffect, useRef } from 'react';

// Different Breed
import { differentBreedClient } from '@/services/differentBreedClient/differentBreedClient';
import {
  DifferentBreedCartProvider,
  useDifferentBreedCart,
  NotificationItem,
} from '@waoadb/react-sdk';

// Components
import {
  Toast,
  ToastImperativeMethods,
} from '@/components/Molecules/Toast/Toast';

// Fonts
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

// Styles
import '@/styles/globals.css';

/**
 * App
 * @param props - Component props.
 * @returns
 */
function App({ Component, pageProps }: AppProps) {
  // Refs
  const toastRef = useRef<ToastImperativeMethods>(null);

  // Hooks
  const { notifications } = useDifferentBreedCart(differentBreedClient);

  // Effects
  useEffect(() => {
    // Listen for toast events
    const listener = (toast: NotificationItem) => {
      toastRef.current?.addItem(toast);
    };
    notifications.listen(listener);
    return () => {
      // Unlisten for toast events
      notifications.unlisten(listener);
    };
    // Runs once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <style jsx global>{`
        :root {
          --Inter: ${inter.style.fontFamily};
        }
      `}</style>
      <DifferentBreedCartProvider>
        {' '}
        <Component {...pageProps} />
        <Toast ref={toastRef} />
      </DifferentBreedCartProvider>
    </>
  );
}

// Export
export default App;
