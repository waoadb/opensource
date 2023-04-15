'use client';

/* Dependencies */
import { NextSeo } from 'next-seo';

// Components
import { Error500 } from '@/components/Organisms/Error500/Error500';

/**
 * Page: 500
 * @param props - Page props.
 * @returns
 */
const Page = () => {
  return (
    <>
      <NextSeo
        title="Internal Server Error"
        nofollow={true}
        noindex={true}
        description="Page could not be displayed."
        openGraph={{
          title: 'Internal Server Error',
          description: `Page could not be displayed.`,
          images: [],
        }}
        canonical={`${process.env.NEXT_PUBLIC_SITE_URL}`}
      />

      <main className="w-full">
        <Error500 />
      </main>
    </>
  );
};

export default Page;
