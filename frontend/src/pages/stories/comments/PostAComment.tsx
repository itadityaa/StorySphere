import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { usePostCommentMutation } from "../../../redux/features/comments/commentAPI";
import { useGetSingleStoryByIdQuery } from "../../../redux/features/stories/storyAPI";

const PostAComment = () => {
  const { id } = useParams<{ id: string }>();
  const [comment, setComment] = React.useState("");
  const { user } = useSelector((state) => state.auth);
  // console.log(user);
  const { refetch } = useGetSingleStoryByIdQuery(id, { skip: !id });

  const [postComment] = usePostCommentMutation();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      alert("Please login to post a comment");
      return;
    }
    if (!comment) {
      alert("Please enter a comment");
      return;
    }
    const newComment = {
      comment: comment,
      user: user?._id,
      storyId: id,
    };
    try {
      await postComment(newComment);
      // console.log(response);
      setComment("");
      refetch();
    } catch (error) {
      console.log(`An error occured: ${error}`);
    }
  };

  return (
    <div className="mt-4">
      <h3 className="text-lg font-medium mb-4">Leave a Comment</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          name="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full border focus:outline-none p-4 rounded-md bg-bgSecondary text-bgPrimary"
          placeholder="Post a comment"
          cols={30}
          rows={5}
        />
        <button
          type="submit"
          className="w-full bg-bgPrimary text-bgSecondary p-2 rounded-md mt-2 hover:bg-accentSecondary transition-all ease-in-out duration-300 hover:shadow-lg"
        >
          Post Comment
        </button>
      </form>
    </div>
  );
};

export default PostAComment;
