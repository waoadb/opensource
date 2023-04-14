import { AddonCardList } from '@/components/Organisms/AddonCardList/AddonCardList';
import { EventCardList } from '@/components/Organisms/EventCardList/EventCardList';
import { ClientCacheModels, ClientCartModels } from '@waoadb/contracts-client';
import dynamic from 'next/dynamic';

const mockAddons: ClientCacheModels.CachePerformance['stock']['addons'] = [
  {
    addon_id: 'd3eb4ea9-50c8-43cd-8b20-25e76e68a1a0',
    name: 'Test Addon',
    description: 'Test',
    visible: true,
    archived: false,
    variants: [
      {
        variant_id: 'b0255e08-a1ff-4ed3-963f-9b02cbe242ae',
        name: 'Default',
        price: 15,
        availability: {
          max_quantity: 10,
          min_quantity: 1,
        },
      },
      {
        variant_id: '189c435f-18f3-4a91-8143-3fdb9e228870',
        name: 'LG',
        price: 23,
        availability: {
          max_quantity: 10,
          min_quantity: 1,
        },
      },
    ],
    availability: {
      start_date_and_time: null,
      start_date_and_time_unix: null,
      end_date_and_time: null,
      end_date_and_time_unix: null,
    },
    picture: {
      library_id: 'c25ab706-a116-4475-b544-d66320f8b91d',
      url: 'https://differentbreed.imgix.net/profiles/79913a0e-49c6-4863-9939-e57ef94f3aeb/media-library/2d7ea323-6341-4c18-a9f2-213ac257e132',
      alt_text: 'xxx',
      blurhash: 'UDAAO3_2M{WB4nE1WBj[00IVxuj[~q?Hs:WB',
    },
  },
  {
    addon_id: 'd3eb4ea9-50c8-43cd-8b20-25e76e68a1a1',
    name: 'Test Addon',
    description: 'Test',
    visible: true,
    archived: false,
    variants: [
      {
        variant_id: 'b0255e08-a1ff-4ed3-963f-9b02cbe242af',
        name: 'Default',
        price: 15,
        availability: {
          max_quantity: 10,
          min_quantity: 1,
        },
      },
      {
        variant_id: '189c435f-18f3-4a91-8143-3fdb9e228871',
        name: 'LG',
        price: 23,
        availability: {
          max_quantity: 10,
          min_quantity: 1,
        },
      },
    ],
    availability: {
      start_date_and_time: null,
      start_date_and_time_unix: null,
      end_date_and_time: null,
      end_date_and_time_unix: null,
    },
    picture: {
      library_id: 'c25ab706-a116-4475-b544-d66320f8b91f',
      url: 'https://differentbreed.imgix.net/profiles/79913a0e-49c6-4863-9939-e57ef94f3aeb/media-library/2d7ea323-6341-4c18-a9f2-213ac257e132',
      alt_text: 'xxx',
      blurhash: 'UDAAO3_2M{WB4nE1WBj[00IVxuj[~q?Hs:WB',
    },
  },
];

const Page = () => {
  return (
    <>
      <AddonCardList
        event_id={'d3eb4ea9-50c8-43cd-8b20-25e76e68a1a0'}
        performance_id={'d3eb4ea9-50c8-43cd-8b20-25e76e68a1a0'}
        addons={mockAddons}
        handleSubmit={(values) => {
          console.log(values);
        }}
      />
    </>
  );
};

export default Page;
