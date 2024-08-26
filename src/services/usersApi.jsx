
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { selectAuthToken } from '../authSlice'; 

const BASE_URL = "https://chatify-api.up.railway.app";

export const usersApi = createApi({
  reducerPath: 'usersApi', 
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = selectAuthToken(getState());
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }), 
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => '/users',
      transformResponse: (response) => {
        sessionStorage.setItem('users', JSON.stringify(response));
        return response;
      },
      
      async onCacheEntryAdded(
        arg,
        { cacheDataLoaded, cacheEntryRemoved, updateCachedData }
      ) {
        try {
          const cachedUsers = sessionStorage.getItem('users');
          if (cachedUsers) {
            updateCachedData(JSON.parse(cachedUsers));
          }
          await cacheDataLoaded; 
        } catch (error) {
          console.error('Error loading cached users:', error);
        }
        await cacheEntryRemoved;
      },
    }),
    getUser: builder.query({
      query: (slug) => `/users/${slug}`,
    }),
    deleteUser: builder.mutation({
      query: (slug) => ({
        url: `/users/${slug}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useGetUsersQuery, useGetUserQuery, useDeleteUserMutation } = usersApi;
