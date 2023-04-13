import { Heading } from '@/components/Atoms/Heading/Heading';
import React from 'react';

export const SearchNoResults = () => {
  return (
    <div className="rounded-xl bg-gray-100 p-8 flex flex-col justify-center min-h-30vh">
      <div className="w-full mx-auto max-w-lg text-center">
        <Heading level="h1" style="h2" className="mb-4">No results found</Heading>
      </div>
    </div>
  );
};
