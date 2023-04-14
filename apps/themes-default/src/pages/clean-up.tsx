import { AvailableStockCard } from '@/components/Molecules/AvailableStockCard/AvailableStockCard';
import { CartAddonCard } from '@/components/Molecules/CartAddonCard/CartAddonCard';
import { AddonCardList } from '@/components/Organisms/AddonCardList/AddonCardList';
import { CartAddonCardList } from '@/components/Organisms/CartAddonCardList/CartAddonCardList';
import { CartTicketCardList } from '@/components/Organisms/CartTicketCardList/CartTicketCardList';
import { Error404 } from '@/components/Organisms/Error404/Error404';
import { EventBanner } from '@/components/Organisms/EventBanner/EventBanner';
import { TicketCardList } from '@/components/Organisms/TicketCardList/TicketCardList';
import { ClientCacheModels, ClientCartModels } from '@waoadb/contracts-client';

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

const mockTickets: ClientCacheModels.CachePerformance['stock']['tickets'] = [
  {
    ticket_id: '9ab716d2-6d84-4c82-a812-c24917f83236',
    name: 'General Admission',
    description: 'Test Description',
    visible: true,
    price: 15.3,
    archived: false,
    availability: {
      end_date_and_time: null,
      end_date_and_time_unix: null,
      start_date_and_time: null,
      start_date_and_time_unix: null,
      max_quantity: 10,
      min_quantity: 1,
    },
  },
  {
    ticket_id: '9ab716d2-6d84-4c82-a812-c24917f83236',
    name: 'Student',
    description: 'Test Description',
    visible: true,
    price: 12.5,
    archived: false,
    availability: {
      end_date_and_time: null,
      end_date_and_time_unix: null,
      start_date_and_time: null,
      start_date_and_time_unix: null,
      max_quantity: 5,
      min_quantity: 1,
    },
  },
];

const mockCartAddons: ClientCartModels.CartEntryAddon[] = [
  {
    addon_entry_id: 'd3eb4ea9-50c8-43cd-8b20-25e76e68a1a0',
    addon_id: 'd3eb4ea9-50c8-43cd-8b20-25e76e68a1a0',
    performance_id: 'd3eb4ea9-50c8-43cd-8b20-25e76e68a1a1',
    name: 'Test Addon',
    description: 'Test',
    variant_id: 'b0255e08-a1ff-4ed3-963f-9b02cbe242ae',
    picture: {
      src: 'https://differentbreed.imgix.net/profiles/79913a0e-49c6-4863-9939-e57ef94f3aeb/media-library/2d7ea323-6341-4c18-a9f2-213ac257e132',
      alt: 'xxx',
      blurhash: 'UDAAO3_2M{WB4nE1WBj[00IVxuj[~q?Hs:WB',
    },
    price: 15,
  },
  {
    addon_entry_id: 'd3eb4ea9-50c8-43cd-8b20-25e76e68a1a2',
    addon_id: 'd3eb4ea9-50c8-43cd-8b20-25e76e68a1a2',
    performance_id: 'd3eb4ea9-50c8-43cd-8b20-25e76e68a1a2',
    name: 'Test Addon',
    description: 'Test',
    variant_id: 'b0255e08-a1ff-4ed3-963f-25e76e68a1a2',
    picture: {
      src: 'https://differentbreed.imgix.net/profiles/79913a0e-49c6-4863-9939-e57ef94f3aeb/media-library/2d7ea323-6341-4c18-a9f2-213ac257e132',
      alt: 'xxx',
      blurhash: 'UDAAO3_2M{WB4nE1WBj[00IVxuj[~q?Hs:WB',
    },
    price: 23,
  },
];

const mockCartTickets: ClientCartModels.CartEntryTicket[] = [
  {
    ticket_entry_id: '42caff8d-9dd8-48e4-b0d3-ff8fac96c26a',
    performance_id: '32f6d891-53c0-4aeb-9cb4-06bca1704ac1',
    ticket_id: '9ab716d2-6d84-4c82-a812-c24917f83236',
    name: 'General Admission',
    price: 15.3,
    description: 'Test Description',
    accessibility: [],
  },
  {
    ticket_entry_id: 'b09d381b-9e26-4374-9dbf-923bc664f9d8',
    performance_id: '32f6d891-53c0-4aeb-9cb4-06bca1704ac1',
    ticket_id: '9ab716d2-6d84-4c82-a812-c24917f83236',
    name: 'General Admission',
    price: 15.3,
    description: 'Test Description',
    accessibility: [],
  },
];

const event: ClientCacheModels.CacheEvent = {
  event_id: '2be511d6-30a6-4267-a6ef-1d44657ce2dd',
  profile_id: '79913a0e-49c6-4863-9939-e57ef94f3aeb',
  accessibility: {
    enabled: true,
    items: [
      {
        id: 'assistance_dogs',
        title: 'Assistance dogs',
        description: 'Assistance dogs are allowed.',
      },
    ],
  },
  customise: {
    banner: null,
    checkout_logo: {
      library_id: '120096e2-8516-424e-88f2-ad772cae318c',
      url: 'https://images.unsplash.com/photo-1516737488405-7b6d6868fad3?ixid=MnwxNzMzNDB8MHwxfHNlYXJjaHw4fHxiYWxsZXR8ZW58MHx8fHwxNjc5OTAyODg1&ixlib=rb-4.0.3',
      alt_text: 'grayscale photography of ballet dancer standing on boards',
      blurhash: 'L44o1dRj00%MRjj[xuRj4nt7_3IU',
    },
    checkout_banner: {
      library_id: '120096e2-8516-424e-88f2-ad772cae318c',
      focus_position: 'center',
      url: 'https://images.unsplash.com/photo-1516737488405-7b6d6868fad3?ixid=MnwxNzMzNDB8MHwxfHNlYXJjaHw4fHxiYWxsZXR8ZW58MHx8fHwxNjc5OTAyODg1&ixlib=rb-4.0.3',
      alt_text: 'grayscale photography of ballet dancer standing on boards',
      blurhash: 'L44o1dRj00%MRjj[xuRj4nt7_3IU',
    },
    checkout_summary: {
      library_id: '120096e2-8516-424e-88f2-ad772cae318c',
      focus_position: 'center',
      url: 'https://images.unsplash.com/photo-1516737488405-7b6d6868fad3?ixid=MnwxNzMzNDB8MHwxfHNlYXJjaHw4fHxiYWxsZXR8ZW58MHx8fHwxNjc5OTAyODg1&ixlib=rb-4.0.3',
      alt_text: 'grayscale photography of ballet dancer standing on boards',
      blurhash: 'L44o1dRj00%MRjj[xuRj4nt7_3IU',
    },
  },
  details: {
    name: 'Paramore 2023',
    description: 'Test Description',
    summary: 'Test Summary',
    picture: {
      library_id: '120096e2-8516-424e-88f2-ad772cae318c',
      url: 'https://images.unsplash.com/photo-1516737488405-7b6d6868fad3?ixid=MnwxNzMzNDB8MHwxfHNlYXJjaHw4fHxiYWxsZXR8ZW58MHx8fHwxNjc5OTAyODg1&ixlib=rb-4.0.3',
      alt_text: 'grayscale photography of ballet dancer standing on boards',
      blurhash: 'L44o1dRj00%MRjj[xuRj4nt7_3IU',
    },
  },
  location: {
    type: 'online',
    venue: null,
  },
  marketing: {
    seo: {
      title: 'Test',
      description: 'Test',
      focus_keyword: 'Test',
      o_title: 'Test',
      o_description: 'Test',
      picture: {
        library_id: '120096e2-8516-424e-88f2-ad772cae318c',
        url: 'https://images.unsplash.com/photo-1516737488405-7b6d6868fad3?ixid=MnwxNzMzNDB8MHwxfHNlYXJjaHw4fHxiYWxsZXR8ZW58MHx8fHwxNjc5OTAyODg1&ixlib=rb-4.0.3',
        alt_text: 'grayscale photography of ballet dancer standing on boards',
        blurhash: 'L44o1dRj00%MRjj[xuRj4nt7_3IU',
      },
    },
  },
  payments: {
    currency: 'GBP',
    refund_policy: {
      type: '30-days',
      description:
        'You can get a refund up to 30 days before the event starts.',
    },
  },
  performance_summary: {
    first_performance: {
      start_date: '2023-03-28T23:00:00.000Z',
      start_date_unix: 1680044400,
      start_time: '18:00',
      end_date: '2023-03-28T23:00:00.000Z',
      end_date_unix: 1680044400,
      end_time: '22:00',
    },
    last_performance: {
      start_date: '2023-05-30T23:00:00.000Z',
      start_date_unix: 1685487600,
      start_time: '18:00',
      end_date: '2023-05-30T23:00:00.000Z',
      end_date_unix: 1685487600,
      end_time: '22:00',
    },
    num_of_performances: 46,
    performance_dates: [
      {
        start_date: '2023-03-28T23:00:00.000Z',
        start_date_unix: 1680044400,
        start_time: '18:00',
        end_date: '2023-03-28T23:00:00.000Z',
        end_date_unix: 1680044400,
        end_time: '22:00',
      },
      {
        start_date: '2023-03-29T23:00:00.000Z',
        start_date_unix: 1680130800,
        start_time: '18:00',
        end_date: '2023-03-29T23:00:00.000Z',
        end_date_unix: 1680130800,
        end_time: '22:00',
      },
      {
        start_date: '2023-03-30T23:00:00.000Z',
        start_date_unix: 1680217200,
        start_time: '18:00',
        end_date: '2023-03-30T23:00:00.000Z',
        end_date_unix: 1680217200,
        end_time: '22:00',
      },
      {
        start_date: '2023-04-02T23:00:00.000Z',
        start_date_unix: 1680476400,
        start_time: '18:00',
        end_date: '2023-04-02T23:00:00.000Z',
        end_date_unix: 1680476400,
        end_time: '22:00',
      },
      {
        start_date: '2023-04-03T23:00:00.000Z',
        start_date_unix: 1680562800,
        start_time: '18:00',
        end_date: '2023-04-03T23:00:00.000Z',
        end_date_unix: 1680562800,
        end_time: '22:00',
      },
      {
        start_date: '2023-04-04T23:00:00.000Z',
        start_date_unix: 1680649200,
        start_time: '18:00',
        end_date: '2023-04-04T23:00:00.000Z',
        end_date_unix: 1680649200,
        end_time: '22:00',
      },
      {
        start_date: '2023-04-05T23:00:00.000Z',
        start_date_unix: 1680735600,
        start_time: '18:00',
        end_date: '2023-04-05T23:00:00.000Z',
        end_date_unix: 1680735600,
        end_time: '22:00',
      },
      {
        start_date: '2023-04-06T23:00:00.000Z',
        start_date_unix: 1680822000,
        start_time: '18:00',
        end_date: '2023-04-06T23:00:00.000Z',
        end_date_unix: 1680822000,
        end_time: '22:00',
      },
      {
        start_date: '2023-04-09T23:00:00.000Z',
        start_date_unix: 1681081200,
        start_time: '18:00',
        end_date: '2023-04-09T23:00:00.000Z',
        end_date_unix: 1681081200,
        end_time: '22:00',
      },
      {
        start_date: '2023-04-10T23:00:00.000Z',
        start_date_unix: 1681167600,
        start_time: '18:00',
        end_date: '2023-04-10T23:00:00.000Z',
        end_date_unix: 1681167600,
        end_time: '22:00',
      },
      {
        start_date: '2023-04-11T23:00:00.000Z',
        start_date_unix: 1681254000,
        start_time: '18:00',
        end_date: '2023-04-11T23:00:00.000Z',
        end_date_unix: 1681254000,
        end_time: '22:00',
      },
      {
        start_date: '2023-04-12T23:00:00.000Z',
        start_date_unix: 1681340400,
        start_time: '18:00',
        end_date: '2023-04-12T23:00:00.000Z',
        end_date_unix: 1681340400,
        end_time: '22:00',
      },
      {
        start_date: '2023-04-13T23:00:00.000Z',
        start_date_unix: 1681426800,
        start_time: '18:00',
        end_date: '2023-04-13T23:00:00.000Z',
        end_date_unix: 1681426800,
        end_time: '22:00',
      },
      {
        start_date: '2023-04-16T23:00:00.000Z',
        start_date_unix: 1681686000,
        start_time: '18:00',
        end_date: '2023-04-16T23:00:00.000Z',
        end_date_unix: 1681686000,
        end_time: '22:00',
      },
      {
        start_date: '2023-04-17T23:00:00.000Z',
        start_date_unix: 1681772400,
        start_time: '18:00',
        end_date: '2023-04-17T23:00:00.000Z',
        end_date_unix: 1681772400,
        end_time: '22:00',
      },
      {
        start_date: '2023-04-18T23:00:00.000Z',
        start_date_unix: 1681858800,
        start_time: '18:00',
        end_date: '2023-04-18T23:00:00.000Z',
        end_date_unix: 1681858800,
        end_time: '22:00',
      },
      {
        start_date: '2023-04-19T23:00:00.000Z',
        start_date_unix: 1681945200,
        start_time: '18:00',
        end_date: '2023-04-19T23:00:00.000Z',
        end_date_unix: 1681945200,
        end_time: '22:00',
      },
      {
        start_date: '2023-04-20T23:00:00.000Z',
        start_date_unix: 1682031600,
        start_time: '18:00',
        end_date: '2023-04-20T23:00:00.000Z',
        end_date_unix: 1682031600,
        end_time: '22:00',
      },
      {
        start_date: '2023-04-23T23:00:00.000Z',
        start_date_unix: 1682290800,
        start_time: '18:00',
        end_date: '2023-04-23T23:00:00.000Z',
        end_date_unix: 1682290800,
        end_time: '22:00',
      },
      {
        start_date: '2023-04-24T23:00:00.000Z',
        start_date_unix: 1682377200,
        start_time: '18:00',
        end_date: '2023-04-24T23:00:00.000Z',
        end_date_unix: 1682377200,
        end_time: '22:00',
      },
      {
        start_date: '2023-04-25T23:00:00.000Z',
        start_date_unix: 1682463600,
        start_time: '18:00',
        end_date: '2023-04-25T23:00:00.000Z',
        end_date_unix: 1682463600,
        end_time: '22:00',
      },
      {
        start_date: '2023-04-26T23:00:00.000Z',
        start_date_unix: 1682550000,
        start_time: '18:00',
        end_date: '2023-04-26T23:00:00.000Z',
        end_date_unix: 1682550000,
        end_time: '22:00',
      },
      {
        start_date: '2023-04-27T23:00:00.000Z',
        start_date_unix: 1682636400,
        start_time: '18:00',
        end_date: '2023-04-27T23:00:00.000Z',
        end_date_unix: 1682636400,
        end_time: '22:00',
      },
      {
        start_date: '2023-04-30T23:00:00.000Z',
        start_date_unix: 1682895600,
        start_time: '18:00',
        end_date: '2023-04-30T23:00:00.000Z',
        end_date_unix: 1682895600,
        end_time: '22:00',
      },
      {
        start_date: '2023-05-01T23:00:00.000Z',
        start_date_unix: 1682982000,
        start_time: '18:00',
        end_date: '2023-05-01T23:00:00.000Z',
        end_date_unix: 1682982000,
        end_time: '22:00',
      },
      {
        start_date: '2023-05-02T23:00:00.000Z',
        start_date_unix: 1683068400,
        start_time: '18:00',
        end_date: '2023-05-02T23:00:00.000Z',
        end_date_unix: 1683068400,
        end_time: '22:00',
      },
      {
        start_date: '2023-05-03T23:00:00.000Z',
        start_date_unix: 1683154800,
        start_time: '18:00',
        end_date: '2023-05-03T23:00:00.000Z',
        end_date_unix: 1683154800,
        end_time: '22:00',
      },
      {
        start_date: '2023-05-04T23:00:00.000Z',
        start_date_unix: 1683241200,
        start_time: '18:00',
        end_date: '2023-05-04T23:00:00.000Z',
        end_date_unix: 1683241200,
        end_time: '22:00',
      },
      {
        start_date: '2023-05-07T23:00:00.000Z',
        start_date_unix: 1683500400,
        start_time: '18:00',
        end_date: '2023-05-07T23:00:00.000Z',
        end_date_unix: 1683500400,
        end_time: '22:00',
      },
      {
        start_date: '2023-05-08T23:00:00.000Z',
        start_date_unix: 1683586800,
        start_time: '18:00',
        end_date: '2023-05-08T23:00:00.000Z',
        end_date_unix: 1683586800,
        end_time: '22:00',
      },
      {
        start_date: '2023-05-09T23:00:00.000Z',
        start_date_unix: 1683673200,
        start_time: '18:00',
        end_date: '2023-05-09T23:00:00.000Z',
        end_date_unix: 1683673200,
        end_time: '22:00',
      },
      {
        start_date: '2023-05-10T23:00:00.000Z',
        start_date_unix: 1683759600,
        start_time: '18:00',
        end_date: '2023-05-10T23:00:00.000Z',
        end_date_unix: 1683759600,
        end_time: '22:00',
      },
      {
        start_date: '2023-05-11T23:00:00.000Z',
        start_date_unix: 1683846000,
        start_time: '18:00',
        end_date: '2023-05-11T23:00:00.000Z',
        end_date_unix: 1683846000,
        end_time: '22:00',
      },
      {
        start_date: '2023-05-14T23:00:00.000Z',
        start_date_unix: 1684105200,
        start_time: '18:00',
        end_date: '2023-05-14T23:00:00.000Z',
        end_date_unix: 1684105200,
        end_time: '22:00',
      },
      {
        start_date: '2023-05-15T23:00:00.000Z',
        start_date_unix: 1684191600,
        start_time: '18:00',
        end_date: '2023-05-15T23:00:00.000Z',
        end_date_unix: 1684191600,
        end_time: '22:00',
      },
      {
        start_date: '2023-05-16T23:00:00.000Z',
        start_date_unix: 1684278000,
        start_time: '18:00',
        end_date: '2023-05-16T23:00:00.000Z',
        end_date_unix: 1684278000,
        end_time: '22:00',
      },
      {
        start_date: '2023-05-17T23:00:00.000Z',
        start_date_unix: 1684364400,
        start_time: '18:00',
        end_date: '2023-05-17T23:00:00.000Z',
        end_date_unix: 1684364400,
        end_time: '22:00',
      },
      {
        start_date: '2023-05-18T23:00:00.000Z',
        start_date_unix: 1684450800,
        start_time: '18:00',
        end_date: '2023-05-18T23:00:00.000Z',
        end_date_unix: 1684450800,
        end_time: '22:00',
      },
      {
        start_date: '2023-05-21T23:00:00.000Z',
        start_date_unix: 1684710000,
        start_time: '18:00',
        end_date: '2023-05-21T23:00:00.000Z',
        end_date_unix: 1684710000,
        end_time: '22:00',
      },
      {
        start_date: '2023-05-22T23:00:00.000Z',
        start_date_unix: 1684796400,
        start_time: '18:00',
        end_date: '2023-05-22T23:00:00.000Z',
        end_date_unix: 1684796400,
        end_time: '22:00',
      },
      {
        start_date: '2023-05-23T23:00:00.000Z',
        start_date_unix: 1684882800,
        start_time: '18:00',
        end_date: '2023-05-23T23:00:00.000Z',
        end_date_unix: 1684882800,
        end_time: '22:00',
      },
      {
        start_date: '2023-05-24T23:00:00.000Z',
        start_date_unix: 1684969200,
        start_time: '18:00',
        end_date: '2023-05-24T23:00:00.000Z',
        end_date_unix: 1684969200,
        end_time: '22:00',
      },
      {
        start_date: '2023-05-25T23:00:00.000Z',
        start_date_unix: 1685055600,
        start_time: '18:00',
        end_date: '2023-05-25T23:00:00.000Z',
        end_date_unix: 1685055600,
        end_time: '22:00',
      },
      {
        start_date: '2023-05-28T23:00:00.000Z',
        start_date_unix: 1685314800,
        start_time: '18:00',
        end_date: '2023-05-28T23:00:00.000Z',
        end_date_unix: 1685314800,
        end_time: '22:00',
      },
      {
        start_date: '2023-05-29T23:00:00.000Z',
        start_date_unix: 1685401200,
        start_time: '18:00',
        end_date: '2023-05-29T23:00:00.000Z',
        end_date_unix: 1685401200,
        end_time: '22:00',
      },
      {
        start_date: '2023-05-30T23:00:00.000Z',
        start_date_unix: 1685487600,
        start_time: '18:00',
        end_date: '2023-05-30T23:00:00.000Z',
        end_date_unix: 1685487600,
        end_time: '22:00',
      },
    ],
  },
  settings: {
    show_end_time: true,
    show_start_time: true,
    show_tickets_remaining: true,
    timezone: 'GMT',
  },
  status: {
    archived: false,
    published: true,
    password_protected: false,
    scheduled: false,
    scheduled_date_time: '2023-03-28T10:00:56.800Z',
    scheduled_date_time_unix: 1679997656,
  },
};

const Page = () => {
  return (
    <>
      {/* <AddonCardList
        event_id={'d3eb4ea9-50c8-43cd-8b20-25e76e68a1a0'}
        performance_id={'d3eb4ea9-50c8-43cd-8b20-25e76e68a1a0'}
        addons={mockAddons}
        handleSubmit={(values) => {
          console.log(values);
        }}
      />

      <hr className="w-full h-5 bg-red-500" />

      <AvailableStockCard total={10} title="Available Tickets" />

      <CartAddonCardList
        entry_id="d3eb4ea9-50c8-43cd-8b20-25e76e68a1a0"
        addons={mockCartAddons}
        handleSubmit={(values) => {
          console.log(values);
        }}
      />

      <hr className="w-full h-5 bg-red-500" /> */}

      {/* <TicketCardList
        event_id={'d3eb4ea9-50c8-43cd-8b20-25e76e68a1a0'}
        performance_id={'d3eb4ea9-50c8-43cd-8b20-25e76e68a1a0'}
        tickets={mockTickets}
        handleSubmit={(values) => {
          console.log(values);
        }}
      /> */}

      {/* <hr className='w-full h-5 bg-red-500' /> */}

      {/* <CartTicketCardList
        entry_id="d3eb4ea9-50c8-43cd-8b20-25e76e68a1a0"
        tickets={mockCartTickets}
        handleSubmit={(values) => {
          console.log(values);
        }}
      /> */}

      {/* <hr className='w-full h-5 bg-red-500' /> */}

      {/* <Error404 /> */}

      {/* <hr className='w-full h-5 bg-red-500' /> */}

      <EventBanner event={event} backLink="/" />
    </>
  );
};

export default Page;
