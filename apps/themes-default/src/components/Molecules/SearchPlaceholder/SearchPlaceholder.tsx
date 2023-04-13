import { Heading } from '@/components/Atoms/Heading/Heading';
import SearchForm from '@/components/Molecules/SearchForm/SearchForm';
import React from 'react';

export const SearchPlaceholder = () => {
  return (
    <div className="rounded-xl bg-gray-100 p-8 flex flex-col justify-center min-h-30vh">
      <div className="w-full mx-auto max-w-lg text-center">
        <Heading level="h1" style="h2" className="mb-4">Enter a query to get started</Heading>
        <SearchForm labelOn={false} />
      </div>
    </div>
  );
};
