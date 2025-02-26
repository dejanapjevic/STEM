import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../api/baseApi";
import { Tutorial } from "./tutorial";
import { Video } from "./video";

export const tutorialApi = createApi({
  reducerPath: "tutorialApi",
  baseQuery: baseQueryWithErrorHandling,
  endpoints: (builder) => ({
    fetchTutorials: builder.query<Tutorial[], void>({
      query: () => ({ url: "video/get-all-tutorials" }),
    }),
    fetchVideos: builder.query<Video[], void>({
      query: () => ({ url: "video/get-all-videos" }),
    }),
  }),
});

export const {useFetchTutorialsQuery, useFetchVideosQuery} = tutorialApi;