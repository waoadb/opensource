/* Dependencies */
// Models
import { ClientCacheModels } from '@waoadb/contracts-client';

export const accessibleTitles = {
  assistance_dogs: 'Assistance Dogs',
  audio_described: 'Audio Description',
  closed_captions: 'Closed Captions',
  essential_companions: 'Essential Companions',
  relaxed_performance: 'Relaxed Performance',
  signed: 'Signed Performance',
  touch_tour: 'Touch Tour',
  wheelchair: 'Wheelchair Access',
};

export const accessibleDescriptions = {
  assistance_dogs:
    'Assistance dogs are welcome at the event. We ask that you notify us in advance if you plan to bring an assistance dog so that we can make the necessary accommodations.',
  audio_described:
    'For those who are visually impaired, audio description will be available at the event. This service provides a verbal description of the visual elements of the performance.',
  closed_captions:
    'Closed captions will be available at the event for those who are deaf or hard of hearing. We ask that you notify us in advance when buying your ticket if you plan to use this service so that we can ensure that it is available to you.',
  essential_companions:
    'If you require the assistance of an essential companion to attend the event, please let us know in advance so that we can make the necessary accommodations.',
  relaxed_performance:
    'We offer relaxed performances for those who may find a traditional performance setting overwhelming. These performances have a more relaxed atmosphere, with modified lighting and sound, and a relaxed attitude towards noise and movement in the audience.',
  signed:
    'For those who are deaf or hard of hearing, we offer signed performances. An interpreter will be present to provide a signed interpretation of the performance.',
  touch_tour:
    'A touch tour will be available prior to the performance for those who are blind or visually impaired. This tour provides an opportunity to explore the set, props, and costumes through touch.',
  wheelchair:
    'The venue is wheelchair accessible, and we offer wheelchair seating. Please let us know if you require wheelchair seating when you purchase your tickets.',
};

type AccessibilityContent = {
  /**
   * Title of accessibility
   */
  title: string;
  /**
   * Description of accessibility
   */
  description: string;
};

/**
 * Get accessibility details
 * @param type - Accessibility type
 * @returns
 */
export const getAccessibilityDetails = (
  type: ClientCacheModels.AvailabilityTicketAccessibilityTypes
): AccessibilityContent => {
  return {
    title: accessibleTitles[type],
    description: accessibleDescriptions[type],
  };
};
