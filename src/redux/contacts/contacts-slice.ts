import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import { IContact, IQuery } from '../../services/interfaces';

const url = process.env.REACT_APP_WEB_SERVER_URL;

interface IData {
  data: { contacts: IContact[] };
}

export const contactsApi = createApi({
  reducerPath: 'contactsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${url}`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).rootReducer.auth.token;
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
    getContacts: builder.query<
      IData,
      Pick<IQuery, 'userID' | 'token' | 'favorite' | 'page'>
    >({
      query: ({ token, favorite, page }) => {
        let filter = {};
        if (favorite) {
          filter = { favorite: favorite };
        }
        return {
          url: `api/contacts`,
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
      providesTags: result =>
        result
          ? // successful query
            [
              ...result.data.contacts.map(
                ({ _id }) => ({ type: 'Contacts', _id } as const)
              ),
              { type: 'Contacts', id: 'LIST' },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
            [{ type: 'Contacts', id: 'LIST' }],
    }),
    getContactById: builder.query<
      IContact,
      Pick<IQuery, 'userID' | 'contactID'>
    >({
      query: ({ userID, contactID }) => ({
        url: `api/contacts/${userID}/${contactID}`,
      }),
    }),
    getContactsByName: builder.query<
      IData,
      Pick<IQuery, 'userID' | 'query' | 'page'>
    >({
      query: ({ userID, query, page }) => ({
        url: `api/contacts/${userID}/search/${query}`,
        params: { page: page },
      }),
    }),
    deleteContact: builder.mutation<void, string>({
      query: contactId => ({
        url: `api/contacts/${contactId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Contacts', id: 'LIST' }],
    }),
    addContact: builder.mutation<
      IContact,
      Pick<IContact, 'userID' | 'name' | 'phone'>
    >({
      query: contact => ({
        url: 'api/contacts',
        method: 'POST',
        body: {
          ...contact,
        },
      }),
      invalidatesTags: [{ type: 'Contacts', id: 'LIST' }],
    }),
    editContact: builder.mutation<
      IContact,
      {
        contactID: IQuery['contactID'];
        contact: Pick<IContact, 'name' | 'surname' | 'email' | 'phone'>;
      }
    >({
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
      invalidatesTags: (result, error, { contactID }) => [
        { type: 'Contacts', contactID },
      ],
    }),
    addAvatar: builder.mutation<
      Pick<IContact, 'avatarURL'>,
      Pick<IQuery, 'token' | 'contactID' | 'formData'>
    >({
      query: ({ contactID, formData }) => ({
        url: `contacts/avatars/${contactID}`,
        method: 'PATCH',
        body: formData,
      }),
    }),
    addFavorite: builder.mutation<
      IContact,
      Pick<IQuery, 'contactID' | 'favorite'>
    >({
      query: ({ contactID, favorite }) => ({
        url: `api/contacts/${contactID}/favorite`,
        method: 'PATCH',
        body: { favorite },
      }),
      invalidatesTags: (result, error, { favorite }) => [
        { type: 'Contacts', favorite },
      ],
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
