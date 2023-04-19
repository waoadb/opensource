/* Dependencies */
import { useCallback, useEffect, useMemo, useState } from 'react';

// Helpers
import { formatDateRange } from '@/helpers/formatDateRange/formatDateRange';

// Different Breed
import { differentBreedClient } from '@/services/differentBreedClient/differentBreedClient';
import { useDifferentBreedCart } from '@waoadb/react-sdk';

// Components
import { Modal } from '../Modal/Modal';
import { Placeholder } from '@/components/Molecules/Placeholder/Placeholder';
import { TicketIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Heading } from '@/components/Atoms/Heading/Heading';
import { TicketCardList } from '../TicketCardList/TicketCardList';
import { AddonCardList } from '../AddonCardList/AddonCardList';
import { Button } from '@/components/Atoms/Button/Button';

// Models
import { ClientCacheModels } from '@waoadb/contracts-client';
type Props = {
  /**
   * If the modal is open
   */
  isOpen: boolean;
  /**
   * Handle the modal close.
   */
  onClose: () => void;
  /**
   * Performance id
   */
  performance_id?: string;
  /**
   * Event Id
   */
  event_id: string;
};

/**
 * Book Now Modal
 * @param props - Component props.
 */
export const BookNowModal = ({
  isOpen,
  onClose,
  performance_id,
  event_id,
}: Props) => {
  // State
  const [performanceData, setPerformanceData] =
    useState<ClientCacheModels.CachePerformance | null>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasNoStock, setHasNoStock] = useState<boolean>(false);

  // Cart Provider
  const {
    addTicketToCart,
    addAddonToCart,
    cartState: { cart_id },
  } = useDifferentBreedCart(differentBreedClient);

  // Memory
  const performanceDate = useMemo(() => {
    if (!performanceData) return '---';

    return formatDateRange(
      performanceData.details.start_date,
      performanceData.details.start_time,
      performanceData.details.end_date,
      performanceData.details.end_time,
      true
    );
  }, [performanceData]);

  // Callbacks
  const retrievePerformance = useCallback(async () => {
    if (!performance_id) return;

    try {
      // Retrieve the performance
      const response = await differentBreedClient.performances
        .retrievePerformance({
          event_id,
          performance_id,
        })
        .then((response) => response.payload)
        .catch((error) => {
          throw error;
        });

      if (!response?.stock?.tickets?.length) {
        setHasNoStock(true);
      }

      // Set the performance data
      setPerformanceData(response);

      // Remove loading
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  }, [performance_id, event_id]);

  // Effects
  useEffect(() => {
    if (!performance_id) return;
    // Set the modal to loading
    setIsLoading(true);

    // Load the performance
    retrievePerformance();
  }, [performance_id, retrievePerformance]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="large">
      {/* Close Icon */}
      <Button
        accessibleTitle="Close Book Now Modal"
        onClick={onClose}
        className="absolute top-0 right-0 mt-4 mr-4"
        iconOnly
        variant="hollowPrimary"
        size="base"
      >
        <XMarkIcon width={18} height={18} />
      </Button>
      {/* / Close Icon */}

      {/* Main Content */}
      <div className="w-full">
        {isLoading && (
          <Placeholder
            title="Loading Stock"
            content="Please wait while we load the latest performance stock information."
            icon={<TicketIcon width={24} height={24} className="mx-auto" />}
          />
        )}

        {!isLoading && (!performanceData || hasNoStock) && (
          <Placeholder
            title="No Stock Found"
            content="We could not find any stock for this performance."
            icon={<TicketIcon width={24} height={24} className="mx-auto" />}
          />
        )}

        {!hasNoStock && !isLoading && performanceData && (
          <div className="w-full">
            {/* Title */}
            <Heading
              level="h2"
              style="h3"
              className="pr-10"
              suppressHydrationWarning={true}
            >
              {performanceDate}
            </Heading>
            {/* / Title */}

            {/* Tickets */}
            <section className="mt-10">
              <Heading level="h3" style="h3">
                <span className="text-indigo-700 inline-block border-b-2 border-b-current">
                  Tickets
                </span>
              </Heading>

              <TicketCardList
                tickets={performanceData.stock.tickets}
                event_id={event_id}
                performance_id={performanceData.performance_id}
                handleSubmit={async (payload, title, callback) => {
                  await addTicketToCart(cart_id!, payload, title);
                  callback();
                }}
              />
            </section>
            {/* Tickets */}

            {/* Addons */}
            {performanceData.stock.addons.length > 0 && (
              <>
                <hr className="w-full h-[2px] bg-gray-100 my-4" />

                <section className="w-full">
                  <Heading level="h3" style="h3">
                    <span className="text-indigo-700 inline-block border-b-2 border-b-current">
                      Addons
                    </span>
                  </Heading>

                  <AddonCardList
                    addons={performanceData.stock.addons}
                    event_id={event_id}
                    performance_id={performanceData.performance_id}
                    handleSubmit={async (payload, title, callback) => {
                      await addAddonToCart(cart_id!, payload, title);
                      callback();
                    }}
                  />
                </section>
              </>
            )}
          </div>
        )}
      </div>
      {/* / Main Content */}
    </Modal>
  );
};
