import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const commentApi = createApi({
  reducerPath: "commentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api",
    credentials: "include",
  }),
  tagTypes: ["Comments"],
  endpoints: (builder) => ({
    postComment: builder.mutation({
      query: (comment) => ({
        url: "/comments/post-comment",
        method: "POST",
        body: comment,
      }),
      invalidatesTags: (result, error, { postId }) => [
        { type: "Comments", id: postId },
      ],
    }),
    getComments: builder.query({
      query: () => ({
        url: "/comments/get-comments",
        method: "GET",
      }),
      providesTags: ["Comments"],
    }),
  }),
});

export const { usePostCommentMutation, useGetCommentsQuery } = commentApi;
export default commentApi;
