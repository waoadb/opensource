import Head from 'next/head';
import Layout from '@/Layouts/Layout';
import { Heading } from '@/components/Atoms/Heading/Heading';
import { Paragraph } from '@/components/Atoms/Paragraph/Paragraph';
import { CartSummary } from '@/components/Molecules/CartSummary/CartSummary';
import { CartTicketCardList } from '@/components/Organisms/CartTicketCardList/CartTicketCardList';
import { CartAddonCardList } from '@/components/Organisms/CartAddonCardList/CartAddonCardList';

export default function Cart() {
  return (
    <>
      <Head>
        <title>Cart</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Layout>
        <div className="container mx-auto my-10 lg:my-20">
          <Heading level="h1" className="mb-8">Cart</Heading>
          <div className="grid grid-cols-1 md:grid-cols-8 gap-4">
            <div className="col-span-1 md:col-span-5 lg:col-span-4">
              <ul>
                <li>
                  <div className="mb-4">
                    <Heading level="h3" style="h3">Event Name</Heading>
                    <Paragraph>Performance: Mon 01 May 2023 - 21:00pm</Paragraph>
                  </div>

                  <div>
                    <Heading level="h5" style="h4" className="text-indigo-700"><span className="inline-block border-b-2 border-b-current">Tickets</span></Heading>
                    <CartTicketCardList />
                  </div>

                  <div>
                    <Heading level="h5" style="h4" className="text-indigo-700"><span className="inline-block border-b-2 border-b-current">Addons</span></Heading>
                    <CartAddonCardList />
                  </div>
                </li>
              </ul>
            </div>
            <div className="col-span-1 lg:col-start-6 col-span-3">
              <Heading level="h3" style="h3" className="mb-4">Summary</Heading>
              <CartSummary />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

