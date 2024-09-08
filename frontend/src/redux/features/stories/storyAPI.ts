import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const storyApi = createApi({
  reducerPath: "storyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getStories: builder.query({
      query: (search = "", category = "", location = "") =>
        `/stories?search=${search}&category=${category}&location=${location}`,
    }),
  }),
});

export const { useGetStoriesQuery } = storyApi;
export default storyApi;
