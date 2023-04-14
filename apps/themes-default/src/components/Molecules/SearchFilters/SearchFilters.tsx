import { Heading } from '@/components/Atoms/Heading/Heading';
import { Input } from '@/components/Molecules/Forms/Input/Input';
import { Icon } from '@/components/Atoms/Icons/DemoIcons';
import React, { useState } from 'react';

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
          icon={
            <Icon name="Search" width="18" height="18" ariaVisible={false} />
          }
        />
        <button type="submit" className="sr-only">
          Submit search
        </button>
      </form>
    </div>
  );
};
