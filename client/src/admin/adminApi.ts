import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../api/baseApi";
import { Article } from "../models/article";

export interface UploadImageResponse {
  pictureUrl: string;
}

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: baseQueryWithErrorHandling,
  endpoints: (builder) => ({
    createArticle: builder.mutation<Article, FormData>({
      query: (data: FormData) => {
        return {
          url: "articles",
          method: "POST",
          body: data,
        };
      },
    }),
    updateArticle: builder.mutation<void, { id: number; data: FormData }>({
      query: ({ id, data }) => {
        data.append("id", id.toString());
        return {
          url: "articles",
          method: "PUT",
          body: data,
        };
      },
    }),
    uploadImage: builder.mutation<UploadImageResponse, FormData>({
      query: (formData) => ({
        url: "articles/upload",
        method: "POST",
        body: formData,
      }),
    }),
    deleteArticle: builder.mutation<void, number>({
      query: (id: number) => {
        return {
          url: `articles/${id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useCreateArticleMutation,
  useUpdateArticleMutation,
  useUploadImageMutation,
  useDeleteArticleMutation,
} = adminApi;
