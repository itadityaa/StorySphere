import React, { Key, useState } from "react";
import SearchStory from "../../components/SearchStory";
import { useGetStoriesQuery } from "../../redux/features/stories/storyAPI";
import { Link } from "react-router-dom";

const Stories = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [query, setQuery] = useState({ search: "", category: "" });

  // Get stories from the API
  const { data: stories = [], error, isLoading } = useGetStoriesQuery(query);
  console.log(stories);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
  };
  // const handleCategoryChange = (e: React.FormEvent<HTMLFormElement>) => {
  //   setCategory(e.currentTarget.value);
  // };
  const handleSearchSubmit = (e: React.KeyboardEvent<HTMLFormElement>) => {
    e.preventDefault();
    setQuery({ search, category });
  };

  return (
    <div className="mt-16">
      <SearchStory
        search={search}
        handleSearchChange={handleSearchChange}
        // handleCategoryChange={handleCategoryChange}
        handleSearchSubmit={handleSearchSubmit}
      />

      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error.toString()}</div>}
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
                <h2 className="text-lg font-semibold m-2 text-center">
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
