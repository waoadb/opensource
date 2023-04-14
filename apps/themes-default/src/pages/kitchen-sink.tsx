import Head from 'next/head';

// Components
import { FeaturedEventBanner } from '@/components/Organisms/FeaturedEventBanner/FeaturedEventBanner';
import Layout from '@/Layouts/Layout';
import { EventCardList } from '@/components/Organisms/EventCardList/EventCardList';
import { CalendarDayToggles } from '@/components/Molecules/CalendarDayToggles/CalendarDayToggles';
import { SearchNoResults } from '@/components/Molecules/SearchNoResults/SearchNoResults';
import { VenueCardList } from '@/components/Organisms/VenueCardList/VenueCardList';
import { OrderCardList } from '@/components/Organisms/OrderCardList/OrderCardList';
import { PerformanceCardList } from '@/components/Organisms/PerformanceCardList/PerformanceCardList';
import { EventSummary } from '@/components/Molecules/EventSummary/EventSummary';
import { EventDescription } from '@/components/Molecules/EventDescription/EventDescription';
import { EventBanner } from '@/components/Organisms/EventBanner/EventBanner';
import { CartSummary } from '@/components/Molecules/CartSummary/CartSummary';
import { CheckoutSummary } from '@/components/Molecules/CheckoutSummary/CheckoutSummary';
import { OrderCompleteMessage } from '@/components/Molecules/OrderCompleteMessage/OrderCompleteMessage';
import { CheckoutDeliveryMethods } from '@/components/Molecules/CheckoutDeliveryMethods/CheckoutDeliveryMethods';
import { OrderCompleteSummary } from '@/components/Molecules/OrderCompleteSummary/OrderCompleteSummary';
import { TicketCardList } from '@/components/Organisms/TicketCardList/TicketCardList';
import { AddonCardList } from '@/components/Organisms/AddonCardList/AddonCardList';
import { CartTicketCardList } from '@/components/Organisms/CartTicketCardList/CartTicketCardList';
import { CartAddonCardList } from '@/components/Organisms/CartAddonCardList/CartAddonCardList';
import { CircleImage } from '@/components/Molecules/CircleImage/CircleImage';
import { ProfileDetails } from '@/components/Molecules/ProfileDetails/ProfileDetails';
import { SocialLinksList } from '@/components/Molecules/SocialLinksList/SocialLinksList';
import { SupportDetails } from '@/components/Molecules/SupportDetails/SupportDetails';
import { OnlineEventCard } from '@/components/Molecules/OnlineEventCard/OnlineEventCard';
import { TBCEventCard } from '@/components/Molecules/TBCEventCard/TBCEventCard';
import { AvailableStockCard } from '@/components/Molecules/AvailableStockCard/AvailableStockCard';
import { RefundPolicyCard } from '@/components/Molecules/RefundPolicyCard/RefundPolicyCard';
import { PerformancesSoldOut } from '@/components/Molecules/PerformancesSoldOut/PerformancesSoldOut';
import { Checkbox } from '@/components/Molecules/Forms/Checkbox/Checkbox';
import { Radio } from '@/components/Molecules/Forms/Radio/Radio';
import { ToastNotification } from '@/components/Molecules/ToastNotification/ToastNotification';
import { Icon } from '@/components/Atoms/Icons/DemoIcons';

export default function KitchenSink() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="container mx-auto space-y-4">
          <CalendarDayToggles />
          <SearchNoResults />
          <EventCardList />
          <FeaturedEventBanner />
          <VenueCardList />
          <OrderCardList />
          <PerformanceCardList />
          <EventSummary />
          <EventDescription
            title={'Description'}
            description={
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod nunc sit amet aliquam lacinia, nunc nisl aliquet nisl, nec aliquam nisl nisl sit amet lorem. Sed euismod nunc sit amet aliquam lacinia, nunc nisl aliquet nisl, nec aliquam nisl nisl sit amet lorem. '
            }
          />
        </div>
        <EventBanner />

        <div className="container mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-4 py-10 lg:py-20">
          <div className="col-span-1">
            <CartSummary />
          </div>
          <div className="col-span-1">
            <CheckoutSummary />
          </div>
          <div className="col-span-1">
            <OrderCompleteMessage />
          </div>
          <div className="col-span-1">
            <CheckoutDeliveryMethods />
          </div>
          <div className="col-span-1">
            <OrderCompleteSummary />
          </div>
        </div>
        <div className="mx-auto container">
          <TicketCardList />
          <AddonCardList />
          <CartTicketCardList />
          <CartAddonCardList />
        </div>

        <div className="mx-auto container grid grid-cols-6 gap-4">
          <div className="col-span-2">
            <OnlineEventCard />
          </div>
          <div className="col-span-2">
            <TBCEventCard />
          </div>

          <div className="col-span-1">
            <AvailableStockCard />
          </div>

          <div className="col-span-1">
            <RefundPolicyCard />
          </div>
        </div>

        <PerformancesSoldOut />

        <div className="mx-auto container grid grid-cols-6 gap-4">
          <div className="col-span-6 lg:col-span-1">
            <CircleImage />
          </div>
          <div className="col-span-6 lg:col-span-3">
            <ProfileDetails />
          </div>
          <div className="col-span-6 lg:col-span-2">
            <SocialLinksList />
          </div>
          <div className="col-span-6 lg:col-span-1">
            <SupportDetails />
          </div>

          <div className="col-span-6 lg:col-span-1">
            <Checkbox
              id="checkbox"
              name="checkbox"
              label="This is a checkbox example"
            />
            <Radio id="radio1" name="radio" label="This is a radio example 1" />
            <Radio id="radio2" name="radio" label="This is a radio example 2" />
          </div>

          <div className="col-span-6 lg:col-span-2">
            <ToastNotification
              type="success"
              icon={<Icon name="ShoppingCart" width="16" height="16" />}
            />
            <ToastNotification
              type="error"
              icon={<Icon name="Exclamation" width="22" height="22" />}
            />
            <ToastNotification
              type="info"
              icon={<Icon name="Exclamation" width="22" height="22" />}
            />
            <ToastNotification
              type="warning"
              icon={<Icon name="Exclamation" width="22" height="22" />}
            />
          </div>
        </div>
      </Layout>
    </>
  );
}
