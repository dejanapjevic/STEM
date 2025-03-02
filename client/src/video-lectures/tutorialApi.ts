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
    fetchTutorials: builder.query<{tutorials:Tutorial[], pagination:Pagination}, TutorialParams>({
      query: (tutorialParams) => { 
        return {
        url: "video/get-all-tutorials" ,
        params:tutorialParams
      }
    },
     transformResponse:(tutorials:Tutorial[], meta) => {
               const paginationHeader = meta?.response?.headers.get('Pagination');
               const pagination = paginationHeader? JSON.parse(paginationHeader) : null;
               return {tutorials, pagination};
             }
             }),
    fetchVideos: builder.query<Video[], void>({
      query: () => ({ url: "video/get-all-videos" }),
    }),
  }),
});

export const {useFetchTutorialsQuery, useFetchVideosQuery} = tutorialApi;