import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../api/baseApi";
import { Tutorial } from "./tutorial";
import { Video } from "./video";
import { Pagination } from "../models/pagination";
import { TutorialParams } from "../models/tutorialParams";

export const tutorialApi = createApi({
  reducerPath: "tutorialApi",
  baseQuery: baseQueryWithErrorHandling,
  endpoints: (builder) => ({
    fetchTutorials: builder.query<
      { tutorials: Tutorial[]; pagination: Pagination },
      TutorialParams
    >({
      query: (tutorialParams) => {
        return {
          url: "tutorials/get-all-tutorials",
          params: tutorialParams,
        };
      },
      transformResponse: (tutorials: Tutorial[], meta) => {
        const paginationHeader = meta?.response?.headers.get("Pagination");
        const pagination = paginationHeader
          ? JSON.parse(paginationHeader)
          : null;
        return { tutorials, pagination };
      },
    }),
    fetchTutorialsWithVideos: builder.query<
      { tutorials: Tutorial[]; pagination: Pagination },
      TutorialParams
    >({
      query: (tutorialParams) => {
        return {
          url: "tutorials/get-tutorials-with-videos",
          params: tutorialParams,
        };
      },
      transformResponse: (tutorials: Tutorial[], meta) => {
        const paginationHeader = meta?.response?.headers.get("Pagination");
        const pagination = paginationHeader
          ? JSON.parse(paginationHeader)
          : null;
        return { tutorials, pagination };
      },
    }),
    fetchVideos: builder.query<Video[], void>({
      query: () => ({ url: "tutorials/get-all-videos" }),
    }),
    fetchProgressForUser:builder.query<void,string>({
      query: (userId) => ({  url: `tutorials/get-progress-for-user?userId=${userId}`, }),
    }),
    deleteTutorial: builder.mutation<void, number>({
      query: (id: number) => {
        return {
          url: `tutorials/delete-tutorial/${id}`,
          method: "DELETE",
        };
      },
    }),
    updateProgress: builder.mutation<void, { userId: string, videoId: number, isWatched:boolean }>({
      query: (data) => {
        return {
          url: "tutorials/update-progress",  
          method: "POST",                    
          body: data,                      
        };
      },
    }),
    
    createTutorial: builder.mutation<Tutorial, FormData>({
      query: (data: FormData) => {
        return {
          url: "tutorials/add-tutorial",
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});

export const {
  useFetchTutorialsQuery,
  useFetchVideosQuery,
  useFetchTutorialsWithVideosQuery,
  useCreateTutorialMutation,
  useDeleteTutorialMutation,
  useFetchProgressForUserQuery,
  useUpdateProgressMutation
} = tutorialApi;
