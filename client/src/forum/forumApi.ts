import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../api/baseApi";
import { Topic } from "./topic";
import { Reply } from "./reply";
import { Pagination } from "../models/pagination";
import { ForumParams } from "../models/forumParams";

export const forumApi = createApi({
  reducerPath: "forumApi",
  baseQuery: baseQueryWithErrorHandling,
  tagTypes: ["Replies"],
  endpoints: (builder) => ({
    fetchTopics: builder.query<{topics:Topic[], pagination:Pagination}, ForumParams>({
     query: (forumParams) => { 
             return {
             url: "forum/topics" ,
             params:forumParams
           }
         },
         transformResponse:(topics:Topic[], meta) => {
           const paginationHeader = meta?.response?.headers.get('Pagination');
           const pagination = paginationHeader? JSON.parse(paginationHeader) : null;
           return {topics, pagination};
         }
         }),
    createTopic: builder.mutation<Topic, { title: string }>({
      query: (newTopic) => ({
        url: "/forum/AddTopic",
        method: "POST",
        body: newTopic,
        credentials: "include", // ako koristimo cookies za autentifikaciju, a koristim.
      }),
    }),
    fetchTopicDetails: builder.query<Topic, number>({
      query: (topicId) => ({ url: `forum/${topicId}` }),
    }),

    createReply: builder.mutation<Reply, { text: string; topicId: number }>({
      query: (newReply) => ({
        url: "/forum/AddReply",
        method: "POST",
        body: newReply,
        credentials: "include",
      }),
      invalidatesTags: (_result, _error, { topicId }) => [
        { type: "Replies", id: topicId },
      ],
    }),
    getRepliesByTopic: builder.query<Reply[], number>({
      query: (topicId) => ({ url: `forum/getRepliesByTopic/${topicId}` }),
      providesTags: (_result, _error, topicId) => [
        { type: "Replies", id: topicId },
      ],
    }),
    deleteTopic: builder.mutation<void, number>({
      query: (id: number) => {
        return {
          url: `forum/${id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});
export const {
  useFetchTopicsQuery,
  useCreateTopicMutation,
  useFetchTopicDetailsQuery,
  useCreateReplyMutation,
  useGetRepliesByTopicQuery,
  useDeleteTopicMutation
} = forumApi;
