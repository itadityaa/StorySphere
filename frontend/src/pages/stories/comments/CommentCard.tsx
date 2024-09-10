import React from "react";
import userIcon from "../../../assets/user-svgrepo-com.svg";
import { formattedDate } from "../../../utils/FormatDate";
import PostAComment from "./PostAComment";
import { useSelector } from "react-redux";

const CommentCard = ({ comments }) => {
  console.log(comments);
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="my-6 ">
      <div>
        {comments?.length > 0 ? (
          <div>
            <h3 className="text-lg font-medium">All Comments</h3>
            <div>
              {comments.map((comment, index) => (
                <div key={index} className="my-2">
                  <div className="text-lg font-medium">
                    <img src={userIcon} alt="User Icon" className="h-14" />
                    <div>
                      <p className="text-lg font-medium underline capitalize underline-offset-4">
                        {comment?.user?.userName}
                      </p>
                      <p className="text-xs italic">
                        {formattedDate(comment.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 border p-4">
                    <p className=" md:w-4/5 text-lg font-medium">
                      {comment?.comment}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <p className="text-2xl font-semibold my-2">Comments</p>
            <span className="text-lg font-medium">No comments found!</span>
          </div>
        )}
      </div>
      <PostAComment />
    </div>
  );
};

export default CommentCard;
