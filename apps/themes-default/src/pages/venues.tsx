import Head from 'next/head';
import Layout from '@/Layouts/Layout';
import { Pagination } from '@/components/Molecules/Pagination/Pagination';
import { VenueCardList } from '@/components/Organisms/VenueCardList/VenueCardList';
import { VenueFilters } from '@/components/Molecules/VenueFilters/VenueFilters';

export default function Venues() {
  return (
    <>
      <Head>
        <title>Venues</title>
        <meta name='description' content='' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Layout>
        <VenueFilters />
        <VenueCardList />
        <Pagination />
      </Layout>
    </>
  )
}
