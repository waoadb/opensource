/* Dependencies */
// Components

/* Dependencies */
import { useMemo } from 'react';

// Helpers
import { getAccessibilityDetails } from '@/helpers/getAccessibilityDetails/getAccessibilityDetails';

// Components
import { AccessibilityIcon } from '@/components/Atoms/AccessibilityIcon/AccessibilityIcon';
import { Heading } from '@/components/Atoms/Heading/Heading';
import { Paragraph } from '@/components/Atoms/Paragraph/Paragraph';

// Models
import { ClientCacheModels } from '@waoadb/contracts-client';
type Props = {
  /**
   * Type of accessibility to render.
   */
  type: ClientCacheModels.AvailabilityTicketAccessibilityTypes;
};

/**
 * Accessibility Details
 * @param props - Component Props
 * @returns
 */
export const AccessibilityDetails = ({ type }: Props) => {
  const content = useMemo(() => getAccessibilityDetails(type), [type]);
  return (
    <div className="w-full">
      <AccessibilityIcon type={type} className="w-20 -ml-[15px]" />
      <Heading level="h2" style="h3">
        {content.title}
      </Heading>
      <Paragraph style="base" className="mt-2">
        {content.description}
      </Paragraph>
    </div>
  );
};
