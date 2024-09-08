import React from "react";
import { useParams } from "react-router-dom";
import { useGetSingleStoryByIdQuery } from "../../redux/features/stories/storyAPI";
import SingleStoryCard from "../../components/SingleStoryCard";
import CommentCard from "./comments/CommentCard";

const SingleStory = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useGetSingleStoryByIdQuery(id);
  const story = data?.story;

  return (
    <div className="text-accentPrimary mx-auto py-8 px-10 bg-bgPrimary">
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error.toString()}</div>}
      {story && (
        <div className="flex flex-col lg:flex-row justify-between items-start md:gap-12 gap-8">
          <section className="lg:w-2/3 w-full">
            <SingleStoryCard story={story} />
            <CommentCard comments={data.comments} />
          </section>
          <section className="lg:w-1/3 w-full">
            <div>Related Blogs</div>
          </section>
        </div>
      )}
    </div>
  );
};

export default SingleStory;
