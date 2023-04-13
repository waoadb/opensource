import Head from 'next/head';
import Layout from '@/Layouts/Layout';
import React from 'react';
import { Heading } from '@/components/Atoms/Heading/Heading';
import { SearchPlaceholder } from '@/components/Molecules/SearchPlaceholder/SearchPlaceholder';
import { SearchFilters } from '@/components/Molecules/SearchFilters/SearchFilters';
import { SearchNoResults } from '@/components/Molecules/SearchNoResults/SearchNoResults';
import { EventCardList } from '@/components/Organisms/EventCardList/EventCardList';
import { VenueCardList } from '@/components/Organisms/VenueCardList/VenueCardList';
import Cta from '@/components/Atoms/Cta/Cta';

export default function Search() {

  return (
    <>
      <Head>
        <title>Search</title>
        <meta name='description' content='' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Layout>
        <div className='container mx-auto my-10 lg:my-20'>
          {/*Space y for demo purposes only*/}
          <div className="space-y-8">
            <SearchFilters />
            <SearchPlaceholder/>
            <SearchNoResults/>

            <div className="flex flex-row flex-wrap items-center justify-between px-4 gap-4">
              <Heading level="h2" style="h3" >Events</Heading>
              <Cta href="/whats-on" variant="hollow" className="text-sm" text="View All Events"/>
            </div>
            <EventCardList />

            <div className="flex flex-row flex-wrap items-center justify-between px-4 gap-4">
              <Heading level="h2" style="h3" >Venues</Heading>
              <Cta href="/venues" variant="hollow" className="text-sm" text="View All Venues"/>
            </div>
            <VenueCardList/>
          </div>
        </div>
      </Layout>
    </>
  );
}
