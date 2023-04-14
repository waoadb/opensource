/* Dependencies */
import ReactPaginate from 'react-paginate';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

// Models
type Props = {
  /**
   * Current page
   */
  currentPage: number;
  /**
   * Total number of pages
   */
  pageCount: number;
  /**
   * Handle page change
   */
  onPageChange: (page: number) => void;
};

/**
 * Pagination Component
 * @param props - Component props.
 * @returns
 */
export const Pagination = ({ currentPage, pageCount, onPageChange }: Props) => {
  return (
    <ReactPaginate
      previousLabel={<ChevronLeftIcon width={24} height={24} />}
      breakLabel="..."
      nextLabel={<ChevronRightIcon width={24} height={24} />}
      pageCount={pageCount}
      renderOnZeroPageCount={null}
      forcePage={currentPage}
      onPageChange={({ selected }) => onPageChange(selected)}
      nextClassName="block overflow-hidden rounded-md border border-indigo-500"
      nextLinkClassName="block py-1 px-1 hover:bg-indigo-500 hover:text-white transition-colors duration-200"
      previousClassName="block overflow-hidden rounded-md border border-indigo-500"
      previousLinkClassName="block py-1 px-1 hover:bg-indigo-500 hover:text-white transition-colors duration-200"
      pageClassName="block overflow-hidden rounded-md border border-indigo-500"
      pageLinkClassName="block py-1 px-3 hover:bg-indigo-500 hover:text-white transition-colors duration-200"
      activeClassName="bg-indigo-500 text-white"
      className="w-full flex flex-row flex-wrap gap-2 justify-center lg:justify-end"
    />
  );
};
