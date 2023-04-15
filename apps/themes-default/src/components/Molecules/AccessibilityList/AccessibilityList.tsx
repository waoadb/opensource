/* Dependencies */

// Components

// Models
import { AccessibilityIcon } from '@/components/Atoms/AccessibilityIcon/AccessibilityIcon';
import { Modal } from '@/components/Organisms/Modal/Modal';
import { accessibleTitles } from '@/helpers/getAccessibilityDetails/getAccessibilityDetails';
import { ClientCacheModels } from '@waoadb/contracts-client';
import { useEffect, useState } from 'react';
import { AccessibilityDetails } from '../AccessibilityDetails/AccessibilityDetails';
import classNames from 'classnames';
type Props = {
  accessibility: ClientCacheModels.AvailabilityTicketAccessibilityTypes[];
  color?: 'white' | 'black';
  size?: 'base' | 'small';
};

/**
 * Accessibility List
 * @param props - Component Props
 */
export const AccessibilityList = ({
  accessibility,
  color = 'black',
  size = 'base',
}: Props) => {
  // State
  const [showModal, setShowModal] = useState(false);
  const [selectedType, setSelectedType] =
    useState<ClientCacheModels.AvailabilityTicketAccessibilityTypes>();

  // Effects
  useEffect(() => {
    if (selectedType) {
      setShowModal(true);
    }
  }, [selectedType]);

  return (
    <>
      <ul className="flex flex-row flex-wrap gap-1">
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
          setSelectedType(undefined);
        }}
      >
        {selectedType && <AccessibilityDetails type={selectedType} />}
      </Modal>
    </>
  );
};
