import React, { useRef } from 'react';
import { SearchFormProps } from '@/components/Molecules/SearchForm/SearchForm.model';
export default function SearchForm({
  labelOn = true,
}: SearchFormProps) {
  const searchInput = useRef<HTMLInputElement>(null);
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(searchInput.current?.value);
  }
  return (
    <form onSubmit={submitHandler}>
      <label htmlFor="search" className={`text-sm mb-2 ${labelOn ? 'block' : 'sr-only'}`}>Search</label>
      <input ref={searchInput} type="text" name="search" id="search" className="w-full border border-gray-300 rounded-md p-2" placeholder="Query" />
      <button type="submit" className="sr-only">Submit search</button>
    </form>
  )
}
