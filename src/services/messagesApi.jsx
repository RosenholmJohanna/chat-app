import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { selectAuthToken } from '../authSlice';

const BASE_URL = "https://chatify-api.up.railway.app";

export const messagesApi = createApi({
  reducerPath: 'messagesApi',
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
    getConversations: builder.query({
      query: () => '/conversations',
    }),
    getMessagesByConversationId: builder.query({
      query: (conversationId) => `/messages?conversationId=${conversationId}`,
    }),
    sendMessage: builder.mutation({
      query: ({ conversationId, text }) => ({
        url: '/messages',
        method: 'POST',
        body: { conversationId, text },
      }),
    }),
    deleteMessage: builder.mutation({
      query: (messageId) => ({
        url: `/messages/${messageId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetConversationsQuery,
  useGetMessagesByConversationIdQuery,
  useSendMessageMutation,
  useDeleteMessageMutation,
  useLazyGetMessagesByConversationIdQuery,
} = messagesApi;
