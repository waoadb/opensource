/* Dependencies */
import { useMemo } from 'react';
import classNames from 'classnames';

// Models
import { ClientCacheModels } from '@waoadb/contracts-client';
type IconType =
  | ClientCacheModels.AvailabilityTicketAccessibilityTypes
  | keyof ClientCacheModels.CacheVenue['accessibility'];
type Props = {
  /**
   * Type of icon.
   */
  type: IconType;
  /**
   * Colour
   */
  color?: 'white' | 'black';
  /**
   * Classname
   */
  className?: string;
  /**
   * Size
   */
  size?: 'sm' | 'md' | 'lg' | 'xl';
};

/**
 * Accessibility Icon
 * @param props - Component Props
 * @returns
 */
export const AccessibilityIcon = ({
  type,
  color = 'black',
  className,
  size = 'md',
}: Props) => {
  // State
  const widthValue = useMemo(() => {
    switch (size) {
      case 'sm': {
        return 32;
      }
      case 'md': {
        return 48;
      }
      case 'lg': {
        return 64;
      }
      case 'xl': {
        return 80;
      }
      default: {
        return 32;
      }
    }
  }, [size]);

  const heightValue = useMemo(() => {
    const rectangleImages: IconType[] = [
      'assistance_dogs',
      'audio_described',
      'closed_captions',
    ];

    // If the image is a rectangle, handle based on size
    if (rectangleImages.includes(type)) {
      switch (size) {
        case 'sm': {
          return 25;
        }
        case 'md': {
          return 38;
        }
        case 'lg': {
          return 50;
        }
        case 'xl': {
          return 62;
        }
        default: {
          return 38;
        }
      }
    }
    // If the image is a square, handle based on widthSize
    else {
      return widthValue;
    }
  }, [size, widthValue]);

  return (
    <img
      src={`/assets/icons/access/${color}-${type.replaceAll('_', '-')}.svg`}
      aria-hidden="true"
      alt=""
      role="presentation"
      loading="lazy"
      width={widthValue}
      height={heightValue}
      className={classNames(className, 'h-auto', {
        'w-8': size === 'sm',
        'w-12': size === 'md',
        'w-16': size === 'lg',
        'w-20': size === 'xl',
      })}
    />
  );
};
