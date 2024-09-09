import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (user) => ({
        url: "auth/register",
        method: "POST",
        body: user,
      }),
    }),
    login: builder.mutation({
      query: (user) => ({
        url: "auth/login",
        method: "POST",
        body: user,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "auth/logout",
        method: "POST",
      }),
    }),
    getUser: builder.query({
      query: () => ({
        url: "auth/users",
        method: "GET",
      }),
      invalidatesTags: undefined,
    }),
    deleteUser: builder.mutation({
      query: ({ userId }) => ({
        url: `auth/users/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: undefined,
    }),
    updateUser: builder.mutation({
      query: ({ userId, role }) => ({
        url: `auth/users/${userId}`,
        method: "PUT",
        body: { role },
      }),
      invalidatesTags: undefined,
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetUserQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
} = authApi;

export default authApi;
