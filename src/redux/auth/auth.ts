import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IUser } from '../../interfaces';

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
    currentUser: builder.query<Pick<IUser, 'email' | 'subscription'>, void>({
      query: () => 'api/users/current',
      providesTags: ['Users'],
    }),
    userSignup: builder.mutation<
      Pick<IUser, 'email' | 'subscription' | 'verify'>,
      Pick<IUser, 'email' | 'name' | 'password'>
    >({
      query: credentials => ({
        url: 'api/users/signup',
        method: 'POST',
        body: {
          ...credentials,
        },
      }),
      invalidatesTags: ['Users'],
    }),
    userLogin: builder.mutation<
      Pick<IUser, 'email' | 'password'>,
      {
        token: Pick<IUser, 'token'>;
        user: Pick<IUser, 'email' | 'name' | 'password'>;
      }
    >({
      query: user => ({
        url: 'api/users/login',
        method: 'POST',
        body: {
          ...user,
        },
        providesTags: ['Users'],
      }),
    }),
    userLogout: builder.query<void, Pick <IUser, 'token' | 'email'>>({
      query: token => ({
        url: 'api/users/logout',
        headers: { Authorization: `Bearer ${token}` },
        providesTags: ['Users'],
      }),
    }),
    resetPassword: builder.query<void, Pick<IUser, 'email'>>({
      query: email => ({
        url: 'users/res_password',
        method: 'POST',
        body: {
          email,
        },
        providesTags: ['Users'],
      }),
    }),
    changePassword: builder.query<void, Pick<IUser, 'password' | 'resetPasswordToken'>>({
      query: ({ password, resetPasswordToken }) => ({
        url: `users/res_password/${resetPasswordToken}`,
        method: 'POST',
        body: {
          password,
        },
        providesTags: ['Users'],
      }),
    }),
    sendVerifyEmail: builder.query<void, Pick<IUser, 'email'>>({
      query: email => ({
        url: `users/verify`,
        method: 'POST',
        body: {
          email,
        },
        providesTags: ['Users'],
      }),
    }),
    verifyEmail: builder.query<void, Pick<IUser, 'verificationToken'>>({
      query: verificationToken => ({
        url: `users/verify/${verificationToken}`,
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
  useChangePasswordQuery,
  useSendVerifyEmailQuery,
  useVerifyEmailQuery,
} = authApi;
