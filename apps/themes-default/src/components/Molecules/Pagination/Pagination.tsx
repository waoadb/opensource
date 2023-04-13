import { Button } from '@/components/Atoms/Button/Button';

export const Pagination = () => {
  return (
    <div className="container mx-auto">
      <nav aria-label="pagination">
        <ul className="text-center mb-6 space-x-1">
          <li className="inline-block"><Button ariaLabel="page 1" variant="hollowPrimary">1</Button></li>
          <li className="inline-block"><Button ariaLabel="page 2" variant="primary"><span className='sr-only'>You are on page:</span>2</Button></li>
          <li className="inline-block"><Button ariaLabel="page 3" variant="hollowPrimary">3</Button></li>
          <li className="inline-block"><Button ariaLabel="page 4" variant="hollowPrimary">4</Button></li>
        </ul>
      </nav>
    </div>
  );
};
