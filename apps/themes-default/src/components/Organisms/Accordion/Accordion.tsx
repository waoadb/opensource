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
          <Disclosure.Button className="w-full flex flex-row flex-wrap justify-between items-center rounded-md py-2 px-2 bg-gray-100/70 focus:outline-none focus-visible:ring focus-visible:ring-indigo-500 focus-visible:ring-opacity-75">
            <span className="text-lg font-semibold max-w-[calc(100%-50px)] w-full text-left">
              {title}
            </span>
            <ChevronUpIcon
              className={`${
                !open ? 'rotate-180 transform' : ''
              } transition-transform duration-200 h-8 w-8`}
            />
          </Disclosure.Button>
          <Disclosure.Panel className="px-2 pt-4 pb-2" unmount={unmountOnClose}>
            {children}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};
