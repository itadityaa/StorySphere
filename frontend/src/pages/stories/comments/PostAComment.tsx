import React from "react";
import { useParams } from "react-router-dom";

const PostAComment = () => {
  const { id } = useParams<{ id: string }>();
  const [comment, setComment] = React.useState("");

  return (
    <div className="mt-4">
      <h3 className="text-lg font-medium mb-4"></h3>
      <form>
        <textarea
          name="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full border focus:outline-none p-4 rounded-md bg-bgSecondary"
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
