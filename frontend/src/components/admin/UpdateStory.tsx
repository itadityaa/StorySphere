import { useState, ChangeEvent, FC, useRef, useEffect, FormEvent } from "react";
import { useSelector } from "react-redux";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import {
  useGetSingleStoryByIdQuery,
  useUpdateStoryMutation,
} from "../../redux/features/stories/storyAPI";
import { useNavigate, useParams } from "react-router-dom";

const UpdateStory = () => {
  const { id } = useParams();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [coverImg, setCoverImg] = useState<string>("");
  const [metaDescription, setMetaDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const [message, setMessage] = useState<string>("");

  const { user } = useSelector((state) => state.auth);

  const [updateStory] = useUpdateStoryMutation();

  const {
    data: story = {},
    error,
    isLoading,
    refetch,
  } = useGetSingleStoryByIdQuery(id);

  useEffect(() => {
    if (story.story) {
      const editor = new EditorJS({
        holder: "editorjs",
        onReady: () => {
          editorInstance.current = editor;
        },
        autofocus: true,
        tools: {
          header: {
            class: Header,
            inlineToolbar: true,
          },
          list: {
            class: List,
            inlineToolbar: true,
            config: {
              defaultType: "unordered",
            },
          },
        },
        data: story.story.content,
      });

      return () => {
        if (editorInstance.current) {
          editorInstance.current.destroy();
          editorInstance.current = null;
        }
      };
    }
  }, []);

  const editorInstance = useRef<EditorJS | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const content = await editorInstance.current?.save();
      const updatedBody = {
        title: title || story.story.title,
        descripton: metaDescription || story.story.descripton,
        content,
        coverImg: coverImg || story.story.coverImg,
        category,
        author: user?._id,
        rating: rating || story.story.rating,
      };
      console.log(updatedBody);

      const response = await updateStory({ id, ...updatedBody }).unwrap();
      console.log(response);
      alert("Story updated successfully");
      navigate(`/`);
    } catch (error) {
      setMessage("Something went wrong");
      // console.log(error);
    }
  };

  const capitalizeFirstLetter = (value: string): string => {
    return value.charAt(0).toUpperCase() + value.slice(1);
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setTitle(capitalizeFirstLetter(e.target.value));
  };

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setContent(capitalizeFirstLetter(e.target.value));
  };

  const handleRatingChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setRating(Number(e.target.value));
  };

  return (
    <div className="md:p-4 p-2 text-accentPrimary">
      <h2 className="text-xl font-medium">Modify Story</h2>
      <form className="mt-4" onSubmit={handleSubmit}>
        <div className="mb-4 flex flex-col md:flex-row justify-between">
          <label
            htmlFor="title"
            className="block text-accentSecondary capitalize text-xl font-medium md:w-[14%] w-full my-auto"
          >
            Story Title:
          </label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Title"
            defaultValue={story.story?.title}
            onChange={handleTitleChange}
            className="mt-1 p-2 w-full rounded-md focus:outline-none text-bgPrimary "
            required
          />
        </div>
        <div className="mb-4">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4 mt-2">
            {/* Left */}
            <div className="md:w-[60%] w-full py-4 space-y-4">
              <p className="text-xl font-medium mb-4">Content</p>
              <div
                id="editorjs"
                className="border border-bgSecondary rounded-md"
              >
                {/* EditorJS */}
                <textarea
                  name="content"
                  id="content"
                  value={content}
                  onChange={handleContentChange}
                  className="hidden"
                />
              </div>
            </div>
            {/* Right */}
            <div className="md:w-[40%] w-full p-4 space-y-4">
              <p className="text-xl text-center font-medium">
                Choose Story Format
              </p>
              {/* Image */}
              <div className="mt-4 space-y-2 flex flex-col md:flex-row justify-between">
                <label
                  htmlFor="coverImg"
                  className="block text-accentSecondary capitalize font-medium md:w-[30%] w-full my-auto"
                >
                  Cover Image:
                </label>
                <input
                  type="url"
                  name="coverImg"
                  id="coverImg"
                  placeholder="Cover Image URL"
                  defaultValue={story.story?.coverImg}
                  onChange={(e) => setCoverImg(e.target.value)}
                  className="ml-2 p-2 w-full rounded-md focus:outline-none text-bgPrimary"
                  required
                />
              </div>
              {/* Category */}
              <div className="mt-4 space-y-2 flex flex-col md:flex-row justify-between">
                <label
                  htmlFor="category"
                  className="block text-accentSecondary capitalize font-medium md:w-[30%] w-full my-auto"
                >
                  Category:
                </label>
                <input
                  type="text"
                  name="category"
                  id="category"
                  placeholder="Anime/Manga/Novel"
                  defaultValue={story.story?.category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="ml-2 p-2 w-full rounded-md focus:outline-none text-bgPrimary"
                  required
                />
              </div>
              {/* Meta Description */}
              <div className="mt-4 space-y-2 flex flex-col md:flex-row justify-between">
                <label
                  htmlFor="metaDescription"
                  className="block text-accentSecondary capitalize font-medium md:w-[30%] w-full my-auto"
                >
                  Meta Description:
                </label>
                <textarea
                  rows={5}
                  name="metaDescription"
                  id="metaDescription"
                  placeholder="Any Story Description Goes Here"
                  defaultValue={story.story?.description}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  className="ml-2 p-2 w-full rounded-md focus:outline-none text-bgPrimary"
                  required
                />
              </div>
              {/* Rating */}
              <div className="mt-4 space-y-2 flex flex-col md:flex-row justify-between">
                <label
                  htmlFor="rating"
                  className="block text-accentSecondary capitalize font-medium md:w-[30%] w-full my-auto"
                >
                  Rating:
                </label>
                <input
                  type="number"
                  name="rating"
                  id="rating"
                  min={0}
                  max={5}
                  value={story.story?.rating}
                  onChange={handleRatingChange}
                  className="ml-2 p-2 w-full rounded-md focus:outline-none text-bgPrimary"
                  required
                />
              </div>
              {/* Author */}
              <div className="mt-4 space-y-2 ">
                <label
                  htmlFor="author"
                  className=" text-accentSecondary text-xl flex md:flex-row flex-col "
                >
                  Author:
                  <p className="text-accentPrimary ml-2 uppercase">
                    {user.userName}
                  </p>
                </label>
                <input type="hidden" name="author" value={user.userName} />
              </div>
            </div>
          </div>
        </div>
        {message && (
          <p className="text-accentSecondary text-center">{message}</p>
        )}
        <button type="submit" className="button-utility-class">
          Update Story
        </button>
      </form>
    </div>
  );
};

export default UpdateStory;
