import React from "react";

interface SearchStoryProps {
  search: string;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearchSubmit: () => void;
}

const SearchStory: React.FC<SearchStoryProps> = ({
  search,
  handleSearchChange,
  handleSearchSubmit,
}) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearchSubmit();
    }
  };

  return (
    <div className="w-full flex items-center justify-center mt-8">
      <input
        type="text"
        placeholder="Search Stories..."
        value={search}
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown}
        className="w-5/6 px-4 py-2 mr-1 text-lg focus:outline-none focus:border focus:border-bgPrimary border-[#8faadc] bg-bgSecondary text-[#001d3d] rounded-md transition-all duration-300 ease-in-out focus:w-[90%]  placeholder:text-lg"
      />
      <button
        onClick={handleSearchSubmit}
        className="w-1/6 px-4 py-2 ml-1 bg-bgPrimary text-bgSecondary rounded-md hover:bg-accentSecondary hover:shadow-lg transition-all duration-300 ease-in-out"
      >
        Search
      </button>
    </div>
  );
};

export default SearchStory;
