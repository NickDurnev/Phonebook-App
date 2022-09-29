import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const url = process.env.REACT_APP_WEB_SERVER_URL;

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${url}`,
  }),
  tagTypes: ['Users'],
  keepUnusedDataFor: 10,
  refetchOnMountOrArgChange: 10,
  endpoints: builder => ({
    currentUser: builder.query({
      query: () => 'api/users/current',
      providesTags: ['Users'],
    }),
    userSignup: builder.mutation({
      query: credentials => ({
        url: 'api/users/signup',
        method: 'POST',
        body: {
          ...credentials,
        },
      }),
      invalidatesTags: ['Users'],
    }),
    userLogin: builder.mutation({
      query: user => ({
        url: 'api/users/login',
        method: 'POST',
        body: {
          ...user,
        },
        providesTags: ['Users'],
      }),
    }),
    userLogout: builder.query({
      query: token => ({
        url: 'api/users/logout',
        headers: { Authorization: `Bearer ${token}` },
        providesTags: ['Users'],
      }),
    }),
    resetPassword: builder.query({
      query: email => ({
        url: 'users/res_password',
        method: 'POST',
        body: {
          email,
        },
        providesTags: ['Users'],
      }),
    }),
  }),
});

export const {
  useCurrentUserQuery,
  useUserLoginMutation,
  useUserLogoutQuery,
  useUserSignupMutation,
  useResetPasswordQuery,
} = authApi;
