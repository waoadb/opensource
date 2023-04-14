/* Dependencies */
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';

// Styles
import '@/styles/globals.css';

// Models
const inter = Inter({ subsets: ['latin'] });

/**
 * App
 * @param props - Component props.
 * @returns
 */
function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        :root {
          --Inter: ${inter.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </>
  );
}

// Export
export default App;
