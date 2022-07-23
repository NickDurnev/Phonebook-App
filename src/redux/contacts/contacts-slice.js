import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const contactsApi = createApi({
  reducerPath: 'contactsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://connections-api.herokuapp.com',
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token;
            console.log(token);
    // If we have a token set in state, let's assume that we should be passing it.
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }
    return headers
    },
    }),
    tagTypes: ['Contacts'],
    keepUnusedDataFor: 10,
  refetchOnMountOrArgChange: 10,
  endpoints: builder => ({
    getContacts: builder.query({
        query: () => `/contacts`,
        providesTags: ['Contacts'],
    }),
    deleteContact: builder.mutation({
        query: contactId => ({
        url: `/contacts/${contactId}`,
        method: 'DELETE'
        }),
        invalidatesTags: ['Contacts'],
    }),
    addContact: builder.mutation({
        query: contact => ({
            url: '/contacts',
            method: 'POST',
            body: {
                ...contact
            }
        }),
        invalidatesTags: ['Contacts'],
    }),
    editContact: builder.mutation({
        query: ({id,name,number}) => ({
            url: `/contacts/${id}`,
            method: 'PATCH',
            body: {
                name,
                number
            }
        }),
        invalidatesTags: ['Contacts'],
    })
    }),
})

export const { useGetContactsQuery, useAddContactMutation, useDeleteContactMutation, useEditContactMutation } = contactsApi;