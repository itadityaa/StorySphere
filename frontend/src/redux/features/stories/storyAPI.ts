import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const storyApi = createApi({
  reducerPath: "storyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getStories: builder.query({
      query: ({ search = "", category = "", location = "" }) =>
        `/stories?search=${search}&category=${category}&location=${location}`,
    }),
    getSingleStoryById: builder.query({
      query: (id) => `/stories/${id}`,
    }),
    getRelatedStories: builder.query({
      query: (id) => `/stories/related-stories/${id}`,
    }),
  }),
});

export const {
  useGetStoriesQuery,
  useGetSingleStoryByIdQuery,
  useGetRelatedStoriesQuery,
} = storyApi;
export default storyApi;
