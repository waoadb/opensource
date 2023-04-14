/* Dependencies */
// Components
import { Link } from '@/components/Atoms/Link/Link';

/**
 * Error - 404
 * @returns
 */
export const Error404 = () => {
  return (
    <section className="w-full flex flex-row min-h-screen items-center justify-center">
      <div className="w-full relative text-center">
        <h1 className="text-9xl font-extrabold text-indigo-500 tracking-widest">
          404
        </h1>
        <span className="bg-red-600 px-2 text-sm rounded rotate-12 absolute left-1/2 -translate-x-1/2 -ml-2 top-14">
          Page Not Found
        </span>
        <Link
          accessibleTitle="Go to homepage"
          className="mt-4"
          variant="primary"
          href="/"
        >
          Home
        </Link>
      </div>
    </section>
  );
};
