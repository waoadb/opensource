/* Dependencies */
import { useEffect, useState } from 'react';
import classNames from 'classnames';

// Helpers
import { accessibleTitles } from '@/helpers/getAccessibilityDetails/getAccessibilityDetails';

// Components
import { AccessibilityIcon } from '@/components/Atoms/AccessibilityIcon/AccessibilityIcon';
import { Modal } from '@/components/Organisms/Modal/Modal';
import { AccessibilityDetails } from '@/components/Molecules/AccessibilityDetails/AccessibilityDetails';

// Models
import { ClientCacheModels } from '@waoadb/contracts-client';
type JoinedAccessibilityTypes =
  | ClientCacheModels.AvailabilityTicketAccessibilityTypes
  | keyof ClientCacheModels.CacheVenue['accessibility'];

type Props = {
  accessibility: JoinedAccessibilityTypes[];
  color?: 'white' | 'black';
  size?: 'base' | 'small';
  align?: 'left' | 'right';
};

/**
 * Accessibility List
 * @param props - Component Props
 */
export const AccessibilityList = ({
  accessibility,
  color = 'black',
  size = 'base',
  align = 'left',
}: Props) => {
  // State
  const [showModal, setShowModal] = useState(false);
  const [selectedType, setSelectedType] = useState<JoinedAccessibilityTypes>();

  // Effects
  useEffect(() => {
    if (selectedType) {
      setShowModal(true);
    }
  }, [selectedType]);

  return (
    <>
      <ul
        className={classNames('flex flex-row flex-wrap gap-1', {
          'justify-start': align === 'left',
          'justify-start lg:justify-end': align === 'right',
        })}
      >
        {accessibility.map((type) => (
          <li key={type}>
            <button
              type="button"
              onClick={() => setSelectedType(type)}
              title={`Event caters for ${accessibleTitles[type]}, click for more information`}
            >
              <AccessibilityIcon
                type={type}
                color={color}
                className={classNames('h-auto', {
                  'w-12': size === 'base',
                  'w-8': size === 'small',
                })}
              />
            </button>
          </li>
        ))}
      </ul>

      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
        }}
      >
        {selectedType && <AccessibilityDetails type={selectedType} />}
      </Modal>
    </>
  );
};
