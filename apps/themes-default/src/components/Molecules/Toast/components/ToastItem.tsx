/* Dependencies */
import React, { useCallback, useEffect } from 'react';
import classNames from 'classnames';
import anime from 'animejs';

// Components
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Heading } from '@/components/Atoms/Heading/Heading';
import { Paragraph } from '@/components/Atoms/Paragraph/Paragraph';

// Styles
const toastClasses = {
  success: 'bg-white border-teal-600',
  error: 'bg-white border-rose-600',
  warning: 'bg-white border-yellow-600',
  info: 'bg-white border-blue-600',
};

const titleClasses = {
  success: 'text-teal-600',
  error: 'text-rose-600',
  warning: 'text-yellow-600',
  info: 'text-blue-600',
};

const toastCloseClasses = {
  success: 'text-teal-600 hover:bg-teal-600 hover:text-white',
  error: 'text-rose-600 hover:bg-rose-600 hover:text-white',
  warning: 'text-yellow-600 hover:bg-yellow-600 hover:text-white',
  info: 'text-blue-600 hover:bg-blue-600 hover:text-white',
};

// Models
import { NotificationItem } from '@/context/DifferentBreedCart/utils/Notifications/Notifications';
export type ToastItemProps = NotificationItem & {
  onDismiss: (id: string) => void;
};

/**
 * Toast Item
 * @param props - Component props
 */
export const ToastItem = ({
  id,
  title,
  content,
  type,
  onDismiss,
  ariaLive = 'polite',
}: ToastItemProps) => {
  // Refs
  const toastItemRef = React.useRef<HTMLLIElement>(null);

  // Effects
  useEffect(() => {
    // Animate the toast item into view.
    anime({
      targets: toastItemRef.current,
      opacity: [0, 1],
      translateY: [-20, 0],
      easing: 'easeOutExpo',
      duration: 500,
    });

    // Timeout to remove the toast item.
    const initiateTimeout = () => {
      return setTimeout(() => {
        onDismiss(id);
      }, 5000);
    };

    // Set timeout.
    let timeout = initiateTimeout();

    // Handle mouse over and reset timeout.
    const handleMouseOver = () => {
      clearTimeout(timeout);
    };

    // Handle mouse out and reset timeout.
    const handleMouseOut = () => {
      timeout = initiateTimeout();
    };

    // Add event listeners.
    toastItemRef.current?.addEventListener('mouseover', handleMouseOver);
    toastItemRef.current?.addEventListener('mouseout', handleMouseOut);

    // Allow user to use escape key to dismiss toast.
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onDismiss(id);
      }
    };
    // Add event listener.
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timeout);
      toastItemRef.current?.removeEventListener('mouseover', handleMouseOver);
      toastItemRef.current?.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Callbacks
  const handleDismiss = useCallback(() => {
    onDismiss(id);
  }, []);

  return (
    <li
      className={classNames(
        'px-4 py-2 border-2 max-w-screen-sm w-full rounded-md opacity-0',
        toastClasses[type]
      )}
      ref={toastItemRef}
    >
      <span className="sr-only" aria-live={ariaLive} aria-atomic="true">
        Notification: {title} : {content}, You can dismiss this notification by
        pressing escape.
      </span>
      <div className="flex w-full flex-row flex-wrap gap-4 relative border-inherit pr-10 items-center">
        <div className="w-full pr-2">
          <Heading level="h2" style="h5" className={titleClasses[type]}>
            {title}
          </Heading>
          <Paragraph style="base" className="mt-1">
            {content}
          </Paragraph>
        </div>

        <button
          className={classNames(
            'p-2 rounded-full border-2 border-inherit absolute text-inherit right-0 top-1/2 -translate-y-1/2 transition-color duration-100',
            toastCloseClasses[type]
          )}
          onClick={handleDismiss}
        >
          <span className="sr-only">Close notification</span>
          <XMarkIcon name="Close" width="16" height="16" />
        </button>
      </div>
    </li>
  );
};
