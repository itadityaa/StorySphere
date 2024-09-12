import React from "react";
import { formattedDate } from "../utils/FormatDate";
import EditorJSHTML from "editorjs-html";
import { useGetUserQuery } from "../redux/features/auth/authAPI";

interface StoryProps {
  story: {
    title: string;
    description: string;
    content: string;
    coverImg: string;
    category: string;
    rating: number;
    author: string;
    createdAt: string;
  };
}

const editorJSHTML = EditorJSHTML({});

const SingleStoryCard: React.FC<StoryProps> = ({ story }) => {
  const {
    title,
    description,
    content,
    coverImg,
    category,
    author,
    rating,
    createdAt,
  } = story || {};

  const htmlContent = editorJSHTML.parse(content).join(" ");
  const { data, isLoading, isError } = useGetUserQuery();

  const user = data?.users?.find((user) => user._id === author);

  return (
    <>
      <div className="bg-bgPrimary">
        <div>
          <h1 className="md:text-4xl text-3xl font-medium mb-4 text-accentSecondary">
            {title}
          </h1>

          <p className="mb-4">
            {formattedDate(createdAt)} by{" "}
            <span className="font-semibold cursor-pointer">
              {user ? user.userName : "Unknown"}
            </span>
          </p>
          <h3 className="">{description}</h3>
        </div>
        <div className="mb-4">
          <img
            src={coverImg}
            alt={title}
            className="w-full md:h-[512px] bg-cover bg-center"
          />
        </div>

        <div className="mb-4">
          <div
            dangerouslySetInnerHTML={{ __html: htmlContent }}
            className="space-y-3 text-justify editorJSDiv"
          />
          <div className="flex flex-col justify-between mt-4">
            <div>
              <span>
                <span className="text-lg font-semibold text-accentSecondary">
                  Category:{" "}
                </span>
                {category}
              </span>
            </div>
            <div>
              <span>
                <span className="text-lg font-semibold text-accentSecondary">
                  Rating:
                </span>{" "}
                {rating} (based on X reviews)
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleStoryCard;
