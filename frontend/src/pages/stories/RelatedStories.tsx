import React from "react";
import { Link, useParams } from "react-router-dom";
import { useGetRelatedStoriesQuery } from "../../redux/features/stories/storyAPI";

interface Story {
  _id: string;
  title: string;
  description: string;
  coverImg: string;
}

const RelatedStories = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: relStories = [],
    error,
    isLoading,
  } = useGetRelatedStoriesQuery(id);

  return (
    <div>
      <h3 className="text-2xl font-medium p-2 text-accentSecondary">
        Related Stories
      </h3>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error</div>}
      {relStories.length > 0 ? (
        <div className="space-y-4 mt-4">
          {relStories.map((story: Story) => (
            <Link
              to={`/stories/${story._id}`}
              key={story._id}
              className="flex flex-col sm:flex-row sm:items-center gap-4 shadow-sm px-8 py-4"
            >
              <div className="size-14">
                <img
                  src={story.coverImg}
                  alt={story.title}
                  className="h-full w-full rounded-full ring-2 ring-bgSecondary"
                />
              </div>
              <div>
                <h4 className="font-medium ">{story.title.substring(0, 30)}</h4>
                <p>{story.description.substring(0, 50)}...</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p>No Related Stories Yet...</p>
      )}
    </div>
  );
};

export default RelatedStories;
