import React, { useState } from "react";
import { Search } from "lucide-react"; 

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(query);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex items-center w-1/2 mx-auto px-4 py-2 bg-white border rounded-xl shadow-sm"
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search posts, tags, or authors..."
        className="flex-grow pr-10 pl-4 py-2 text-sm rounded-md focus:outline-none "
      />
      <button
        type="submit"
        className="absolute right-4 text-gray-600 hover:text-black transition"
      >
        <Search className="w-5 h-5" />
      </button>
    </form>
  );
};

export default SearchBar;
