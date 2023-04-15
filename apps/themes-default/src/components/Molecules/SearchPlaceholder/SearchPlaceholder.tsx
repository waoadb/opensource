/* Dependencies */

// Components
import { Placeholder } from '../Placeholder/Placeholder';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

/**
 * Search Placeholder
 * @returns
 */
export const SearchPlaceholder = () => {
  return (
    <div className="w-full my-4">
      <Placeholder
        title="Search for Venues and Events"
        content="Enter a search term above to find venues and events."
        icon={
          <MagnifyingGlassIcon width={25} height={25} className="mx-auto" />
        }
      />
    </div>
  );
};
