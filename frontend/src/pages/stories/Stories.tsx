import React, { Key, useState, useEffect } from "react";
import SearchStory from "../../components/SearchStory";
import { useGetStoriesQuery } from "../../redux/features/stories/storyAPI";
import { Link } from "react-router-dom";

const Stories = () => {
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState({ search: "" });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = () => {
    setQuery({ search });
  };

  // Re-fetch stories when query changes
  const {
    data: stories = [],
    error,
    isLoading,
  } = useGetStoriesQuery(query, {
    refetchOnMountOrArgChange: true, // Ensures re-fetching happens when query changes
  });

  return (
    <div className="mt-16">
      <SearchStory
        search={search}
        handleSearchChange={handleSearchChange}
        handleSearchSubmit={handleSearchSubmit}
      />

      {isLoading && (
        <div className="text-xl text-center mx-auto my-10 font-medium">
          Loading...
        </div>
      )}
      {error && (
        <div className="text-xl text-center mx-auto my-10 font-medium">
          Error: {error.toString()}
        </div>
      )}
      <div className="mt-8 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
        {stories.map(
          (story: {
            _id: Key | null | undefined;
            coverImg: string | undefined;
            title: string | undefined;
          }) => {
            return (
              <Link
                to={`/stories/${story._id}`}
                key={story._id}
                className="shadow-md rounded-md overflow-hidden"
              >
                <img
                  src={story.coverImg}
                  alt={story.title}
                  className="h-80 w-full"
                />
                <h2 className="text-lg font-light m-2 text-center">
                  {story.title}
                </h2>
              </Link>
            );
          }
        )}
      </div>
    </div>
  );
};

export default Stories;
