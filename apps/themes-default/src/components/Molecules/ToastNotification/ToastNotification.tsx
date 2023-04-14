import React from 'react';
import { Icon } from '@/components/Atoms/Icons/DemoIcons';

type ToastNotificationProps = {
  className?: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  icon?: React.ReactNode;
};

export const ToastNotification = ({
  className = '',
  type = 'success',
  icon,
}: ToastNotificationProps) => {
  const toastClasses = {
    success: 'bg-teal-100 text-green-800 border-teal-600 text-teal-600',
    error: 'bg-red-100 text-red-800 border-rose-600',
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-600',
    info: 'bg-blue-100 text-blue-800 border-blue-600',
  };

  return (
    <div
      className={`p-4 border-2 mb-4 max-w-screen-sm ${toastClasses[type]} ${className}`}
    >
      <div className="flex w-full gap-4 relative border-inherit pr-10 items-center text-inherit">
        {icon && (
          <span className="bg-gray-100 text-gray-500 min-w-9 h-9 inline-flex items-center justify-center rounded-full">
            {icon}
          </span>
        )}
        <span className="block text-gray-700 leading-snug">
          <span className="block text-gray-900 text-lg">Toast title here</span>
          <span className="block text-sm">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </span>
        </span>

        <button className="p-2 bg-white rounded-md border-2 border-inherit absolute text-inherit opacity-50 hover:opacity-100 right-0 top-1/2 -translate-y-1/2">
          <span className="sr-only">Close notification</span>
          <Icon
            name="Close"
            width="16"
            height="16"
            className="text-gray-500 hover:text-gray-700"
          />
        </button>
      </div>
    </div>
  );
};
