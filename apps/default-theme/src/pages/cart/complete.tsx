import Head from 'next/head';
import Layout from '@/Layouts/Layout';
import React from 'react';
import { OrderCompleteMessage } from '@/components/Molecules/OrderCompleteMessage/OrderCompleteMessage';
import { OrderCompleteSummary } from '@/components/Molecules/OrderCompleteSummary/OrderCompleteSummary';
import { OrderCardList } from '@/components/Organisms/OrderCardList/OrderCardList';

export default function Checkout() {
  return (
    <>
      <Head>
        <title>Cart</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Layout>
        <div className='container mx-auto my-10 lg:my-20'>
          <div className='grid grid-cols-1 md:grid-cols-8 gap-4'>
            <div className='col-span-1 md:col-span-5 lg:col-span-4'>
              <OrderCompleteSummary className="mb-4" />
              <OrderCardList />
            </div>
            <div className='col-span-1 lg:col-start-6 lg:col-span-3'>
              <OrderCompleteMessage />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

