import { Heading } from '@/components/Atoms/Heading/Heading';
import { Input } from '@/components/Molecules/Forms/Input/Input';
import React, { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export const SearchFilters = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const searchSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(searchQuery);
  };

  return (
    <div className="">
      <Heading level="h2" style="h3" className="mb-4">
        Search
      </Heading>
      <form onSubmit={searchSubmitHandler} className="block w-full lg:w-1/2">
        <Input
          id="newSearch"
          name="term"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Query"
          icon={<MagnifyingGlassIcon name="Search" width="18" height="18" />}
        />
        <button type="submit" className="sr-only">
          Submit search
        </button>
      </form>
    </div>
  );
};
