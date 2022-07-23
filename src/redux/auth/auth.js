import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://connections-api.herokuapp.com',
    }),
    tagTypes: ['Users'],
    keepUnusedDataFor: 10,
    refetchOnMountOrArgChange: 10,
    endpoints: builder => ({
        currentUser: builder.query({
            query: () => '/users/current',
            providesTags: ['Users'],
        }),
        userSignup: builder.mutation({
        query: (credentials) => ({
            url: '/users/signup',
            method: 'POST',
            body: {
                ...credentials
            }
        }),invalidatesTags: ['Users'],
    }),
    userLogin: builder.mutation({
        query: user => ({
            url: '/users/login',
            method: 'POST',
            body: {
                ...user
            },
            providesTags: ['Users'],
        })
    }),
    userLogout: builder.query({
        query: user => ({
            url: '/users/logout',
            method: 'POST',
            body: {
                ...user
            },
            providesTags: ['Users'],
        })
    })
    }),
})

export const {useCurrentUserQuery, useUserLoginMutation, useUserLogoutQuery, useUserSignupMutation} = authApi; 