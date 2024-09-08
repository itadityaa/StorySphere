import React from "react";
import { formattedDate } from "../utils/FormatDate";
import EditorJSHTML from "editorjs-html";

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
    rating,
    author,
    createdAt,
  } = story || {};

  const htmlContent = editorJSHTML.parse(content).join(" ");

  return (
    <>
      <div className="bg-bgPrimary">
        <div>
          <h1 className="md:text-4xl text-3xl font-medium mb-4">{title}</h1>
          <p className="mb-4">
            {formattedDate(createdAt)} by{" "}
            <span className="font-semibold cursor-pointer">iKaminari</span>
          </p>
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
                <span className="text-lg font-semibold">Category: </span>
                {category}
              </span>
            </div>
            <div>
              <span>
                <span className="text-lg font-semibold">Rating:</span> {rating}{" "}
                (based on X reviews)
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleStoryCard;
