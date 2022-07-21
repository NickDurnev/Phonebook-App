import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const contactsApi = createApi({
  reducerPath: 'contactsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://62cd9753a43bf780085b6ca8.mockapi.io' }),
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
        query: contact => ({
            url: `/contacts/${contact.id}`,
            method: 'PUT',
            body: {
                ...contact
            }
        }),
        invalidatesTags: ['Contacts'],
    })
    }),
})

export const { useGetContactsQuery, useAddContactMutation, useDeleteContactMutation, useEditContactMutation } = contactsApi;