/* Dependencies */
// Components
import { Placeholder } from '../Placeholder/Placeholder';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

/**
 * Search No Results
 * @returns
 */
export const SearchNoResults = () => {
  return (
    <div className="w-full my-4">
      <Placeholder
        title="No Results Found"
        content=""
        icon={
          <MagnifyingGlassIcon width={25} height={25} className="mx-auto" />
        }
      />
    </div>
  );
};
