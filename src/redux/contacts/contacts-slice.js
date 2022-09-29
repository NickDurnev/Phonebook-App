import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const url = process.env.REACT_APP_WEB_SERVER_URL;
console.log(url);

export const contactsApi = createApi({
  reducerPath: 'contactsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${url}`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      console.log(token);
      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Contacts'],
  keepUnusedDataFor: 10,
  refetchOnMountOrArgChange: 10,
  endpoints: builder => ({
    getContacts: builder.query({
      query: userID => `api/contacts/${userID}`,
      providesTags: ['Contacts'],
    }),
    deleteContact: builder.mutation({
      query: contactId => ({
        url: `api/contacts/${contactId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Contacts'],
    }),
    addContact: builder.mutation({
      query: contact => ({
        url: 'api/contacts',
        method: 'POST',
        body: {
          ...contact,
        },
      }),
      invalidatesTags: ['Contacts'],
    }),
    editContact: builder.mutation({
      query: contact => ({
        url: `api/contacts/${contact._id}`,
        method: 'PUT',
        body: {
          ...contact,
        },
      }),
      invalidatesTags: ['Contacts'],
    }),
  }),
});

export const {
  useGetContactsQuery,
  useAddContactMutation,
  useDeleteContactMutation,
  useEditContactMutation,
} = contactsApi;
