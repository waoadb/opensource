/* Dependencies */
import { PropsWithChildren } from 'react';

// Components
import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/20/solid';

// Models
type Props = PropsWithChildren<{
  /**
   * Default open
   */
  defaultOpen?: boolean;
  /**
   * Title of the accordion
   */
  title: string;
  /**
   * Unmount the content when closed
   */
  unmountOnClose?: boolean;
  /**
   * Element to render
   */
  el?: 'li' | 'div';
}>;

/**
 * Accordion
 * @param props - Component props.
 * @returns
 */
export const Accordion = ({
  title,
  defaultOpen,
  children,
  unmountOnClose = true,
  el = 'li',
}: Props) => {
  return (
    <Disclosure defaultOpen={defaultOpen} as={el}>
      {({ open }) => (
        <>
          <Disclosure.Button className="db-w-full db-flex db-flex-row db-flex-wrap db-justify-between db-items-center db-rounded-md db-py-2 db-px-2 db-bg-gray-100/70 focus:db-outline-none focus-visible:db-ring focus-visible:db-ring-indigo-500 focus-visible:db-ring-opacity-75">
            <span className="db-text-lg db-font-semibold db-max-w-[calc(100%-50px)] db-w-full db-text-left">
              {title}
            </span>
            <ChevronUpIcon
              className={`${
                !open ? 'db-rotate-180 db-transform' : ''
              } db-transition-transform db-duration-200 db-h-8 db-w-8`}
            />
          </Disclosure.Button>
          <Disclosure.Panel
            className="db-px-2 db-pt-4 db-pb-2"
            unmount={unmountOnClose}
          >
            {children}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};
