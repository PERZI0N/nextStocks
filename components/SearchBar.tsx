import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState<string>("");

  // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   if (query) {
  //     await onSearch(query);
  //   }
  // };

  const handleInputChange = async (event: React.FormEvent<HTMLInputElement>) => {
    const updatedQuery = (event.target as HTMLInputElement).value
    setQuery(updatedQuery);

    if (updatedQuery) {
      try {
        await onSearch(updatedQuery);
      } catch (error) {
        console.error("Error fetching search results:", error);
        // Handle the error gracefully, e.g., display an error message to the user
      }
    } else {
      // Handle empty query scenario, e.g., clear results
      onSearch(""); // Clear results if desired
    }
  };

  return (
    <div className="flex justify-center gap-2 bg-white my-4 p-2">
      <section>
        <div className="min-w-[300px w-[500px] ring-2 ring-slate rounded-md
        flex items-center gap-2 px-2 hover:ring-fourth">
          <IoIosSearch className="text-2xl text-slate" />
          <form >
            <input
              type="text"
              value={query}
              onChange={handleInputChange}
              placeholder="Search for a stock..."
              className="text-slate bg-second w-full h-[38px] outline-none"
            />

            {/* <button type="submit" className="pl-2">
            <IoIosSearch height={50} width={20} />
            </button> */}
          </form>
        </div>
      </section>
    </div>
  );
};

export default SearchBar;
