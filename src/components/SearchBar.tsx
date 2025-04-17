
'use client';

import { useUserStore } from '../store/userStore';

export const SearchBar = () => {
  const { searchBarInput, setSearchBarInput } = useUserStore();

  return (
    <input
      type="text"
      placeholder="Type here to search..."
      className="w-full max-w-md p-2 border rounded mb-6 mx-auto block"
      value={searchBarInput}
      onChange={(e) => setSearchBarInput(e.target.value)}
    />
  );
};