import Layout from '@/Layouts/Layout';
import { EventCardList } from '@/components/Organisms/EventCardList/EventCardList';
import { WhatsOnFilters } from '@/components/Molecules/WhatsOnFilters/WhatsOnFilters';
import { useCallback, useState } from 'react';
import { Pagination } from '@/components/Molecules/Pagination/Pagination';
import Head from 'next/head';
import { EventCardHorizontal } from '@/components/Molecules/EventCardHorizontal/EventCardHorizontal';

export default function WhatsOn() {
  const [view, setView] = useState<'list' | 'calendar'>('list');

  const toggleView = useCallback((v: 'list' | 'calendar')=> setView(v), []);

  return (
    <>
      <Head>
        <title>What&apos;s On</title>
        <meta name='description' content='' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Layout>
        <WhatsOnFilters setView={toggleView} view={view}/>
        { view === 'calendar' ? <div className="container mx-auto my-10 lg:my-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center justify-between">
            { Array.from({ length: 6 }).map((_, i) => <EventCardHorizontal key={i.toString()} className="col-span-1" />) }
          </div>
        </div> : <EventCardList /> }
        <Pagination />
      </Layout>
    </>

  )
}
