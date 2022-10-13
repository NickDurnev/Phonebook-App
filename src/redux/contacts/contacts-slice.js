import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const url = process.env.REACT_APP_WEB_SERVER_URL;

export const contactsApi = createApi({
  reducerPath: 'contactsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${url}`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Contacts'],
  keepUnusedDataFor: 60,
  refetchOnMountOrArgChange: 60,
  endpoints: builder => ({
    getContacts: builder.query({
      query: ({ userID, token, favorite, page }) => {
        let filter = {};
        if (favorite) {
          filter = { favorite: favorite };
        }
        return {
          url: `api/contacts/${userID}`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            page: page,
            ...filter,
          },
        };
      },
      keepUnusedDataFor: 0,
      providesTags: ['Contacts'],
    }),
    getContactById: builder.query({
      query: ({ userID, contactID }) => ({
        url: `api/contacts/${userID}/${contactID}`,
      }),
    }),
    getContactsByName: builder.query({
      query: ({ userID, query, page }) => ({
        url: `api/contacts/${userID}/search/${query}`,
        params: { page: page },
      }),
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
      query: ({ contactID, contact }) => {
        console.log(contact);
        return {
          url: `api/contacts/${contactID}`,
          method: 'PATCH',
          body: {
            ...contact,
          },
        };
      },
      invalidatesTags: ['Contacts'],
    }),
    addAvatar: builder.mutation({
      query: ({ contactID, formData }) => ({
        url: `contacts/avatars/${contactID}`,
        method: 'PATCH',
        body: formData,
      }),
    }),
    addFavorite: builder.mutation({
      query: ({ id, bool }) => ({
        url: `api/contacts/${id}/favorite`,
        method: 'PATCH',
        body: { favorite: bool },
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
  useAddAvatarMutation,
  useAddFavoriteMutation,
  useGetContactByIdQuery,
  useGetContactsByNameQuery,
} = contactsApi;
