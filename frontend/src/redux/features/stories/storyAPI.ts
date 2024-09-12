import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const storyApi = createApi({
  reducerPath: "storyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/",
    credentials: "include",
  }),
  tagTypes: ["Stories"],
  endpoints: (builder) => ({
    getStories: builder.query({
      query: ({ search = "", category = "", location = "" }) =>
        `/stories?search=${search}&category=${category}&location=${location}`,
      providesTags: ["Stories"],
    }),
    getSingleStoryById: builder.query({
      query: (id) => `/stories/${id}`,
    }),
    getRelatedStories: builder.query({
      query: (id) => `/stories/related-stories/${id}`,
    }),
    postStory: builder.mutation({
      query: (newStory) => ({
        url: "/stories/create-story",
        method: "POST",
        body: newStory,
        credentials: "include",
      }),
      invalidatesTags: ["Stories"],
    }),
    updateStory: builder.mutation({
      query: ({ id, ...updatedStory }) => ({
        url: `/stories/update-story/${id}`,
        method: "PUT",
        body: updatedStory,
        credentials: "include",
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Stories", id }],
    }),
    deleteStory: builder.mutation({
      query: (id) => ({
        url: `/stories/delete-story/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Stories", id }],
    }),
  }),
});

export const {
  useGetStoriesQuery,
  useGetSingleStoryByIdQuery,
  useGetRelatedStoriesQuery,
  usePostStoryMutation,
  useUpdateStoryMutation,
  useDeleteStoryMutation,
} = storyApi;
export default storyApi;
