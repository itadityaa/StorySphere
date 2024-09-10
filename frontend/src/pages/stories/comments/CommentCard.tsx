import React from "react";
import userIcon from "../../../assets/user-svgrepo-com.svg";
import { formattedDate } from "../../../utils/FormatDate";
import PostAComment from "./PostAComment";
import { useSelector } from "react-redux";

const CommentCard = ({ comments }) => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="my-6 ">
      <div>
        {comments?.length > 0 ? (
          <div>
            <h3 className="text-lg font-medium text-accentSecondary">
              All Comments
            </h3>
            <div>
              {comments.map((comment, index) => (
                <div key={index} className="my-2">
                  <div className="flex">
                    <img
                      src={userIcon}
                      alt="User Icon"
                      className="h-10 m-2 items-center"
                    />
                    <div className="flex flex-col px-2 border rounded-md w-full">
                      <p className="font-medium underline uppercase underline-offset-4 pt-1">
                        {comment?.user?.userName}
                      </p>
                      <div className="flex pt-1 justify-between">
                        <p className=" md:w-4/5 text-sm ">{comment?.comment}</p>
                        <p className="text-xs italic">
                          {formattedDate(comment.createdAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <p className="text-2xl font-semibold my-2 text-accentSecondary">
              Comments
            </p>
            <span className="text-lg font-medium">No comments found!</span>
          </div>
        )}
      </div>
      <PostAComment />
    </div>
  );
};

export default CommentCard;
