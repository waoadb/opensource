import Head from 'next/head';

// Components
import { FeaturedEventBanner } from '@/components/Organisms/FeaturedEventBanner/FeaturedEventBanner';
import Layout from '@/Layouts/Layout';
import { EventCardList } from '@/components/Organisms/EventCardList/EventCardList';


export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Layout>
        <FeaturedEventBanner />
        <EventCardList title={'What\'s on'} />
      </Layout>
    </>
  );
}
