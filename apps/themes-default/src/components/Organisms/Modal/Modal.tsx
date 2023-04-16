/* Dependencies */
import { Fragment, PropsWithChildren } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import classNames from 'classnames';

// Models
type Props = PropsWithChildren<{
  /**
   * Is the modal open?
   */
  isOpen: boolean;
  /**
   * Callback on close.
   */
  onClose: () => void;
  /**
   * Size
   */
  size?: 'base' | 'medium' | 'large';
}>;

/**
 * Modal
 * @param props - Component props.
 * @returns
 */
export const Modal = ({ isOpen, onClose, children, size = 'base' }: Props) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10 w-full" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={classNames(
                  'w-full transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all first-letter:first-line',
                  {
                    'w-full max-w-md': size === 'base',
                    'w-full max-w-lg': size === 'medium',
                    'w-full max-w-5xl': size === 'large',
                  }
                )}
              >
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
