/* Dependencies */
// Models
import { ClientCacheModels } from '@waoadb/contracts-client';
type Props = {
  /**
   * Type of icon.
   */
  type:
    | ClientCacheModels.AvailabilityTicketAccessibilityTypes
    | keyof ClientCacheModels.CacheVenue['accessibility'];
  /**
   * Colour
   */
  color?: 'white' | 'black';
  /**
   * Classname
   */
  className?: string;
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
}: Props) => {
  return (
    <img
      src={`/assets/icons/access/${color}-${type.replaceAll('_', '-')}.svg`}
      aria-hidden="true"
      alt=""
      role="presentation"
      loading="lazy"
      className={className}
    />
  );
};
