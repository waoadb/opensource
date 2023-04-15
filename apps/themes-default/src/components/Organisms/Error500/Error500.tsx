/* Dependencies */
// Components
import { Link } from '@/components/Atoms/Link/Link';
import { Paragraph } from '@/components/Atoms/Paragraph/Paragraph';

/**
 * Error - 500
 * @returns
 */
export const Error500 = () => {
  return (
    <section className="w-full flex flex-row min-h-screen items-center justify-center">
      <div className="w-full relative text-center">
        <h1 className="text-9xl font-extrabold text-indigo-500 tracking-widest">
          500
        </h1>
        <span className="bg-red-600 px-2 text-sm rounded rotate-12 absolute left-1/2 -translate-x-1/2 -ml-2 top-14">
          Internal Server Error
        </span>
        <Paragraph style="base" className="mt-5">
          An unexpected error has occurred. Please try again later.
        </Paragraph>
      </div>
    </section>
  );
};
