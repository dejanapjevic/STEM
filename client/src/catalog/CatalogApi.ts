import { createApi } from "@reduxjs/toolkit/query/react";
import { Article } from "../models/article";
import { baseQueryWithErrorHandling } from "../api/baseApi";
import { ArticleParams } from "../models/articleParams";
import { filterEmptyValues } from "../util";
import { Pagination } from "../models/pagination";

export const catalogApi = createApi({
  reducerPath: "catalogApi",
  baseQuery: baseQueryWithErrorHandling,
  endpoints: (builder) => ({
    fetchArticles: builder.query<
      { items: Article[]; pagination: Pagination },
      ArticleParams
    >({
      query: (articleParams) => {
        const safeParams = articleParams || {};
        return {
          url: "articles",
          params: filterEmptyValues(safeParams), //ovo ce ih 'nakaciti' na query string
        };
      },
      transformResponse: (items: Article[], meta) => {
        const paginationHeader = meta?.response?.headers.get("Pagination");
        const pagination = paginationHeader
          ? JSON.parse(paginationHeader)
          : null;
        return { items, pagination };
      },
    }),
    fetchArticleDetails: builder.query<Article, number>({
      query: (articleId) => ({ url: `articles/${articleId}` }),
    }),
    fetchCategoryArticles: builder.query<Article[], string>({
      query: (articleCategory) => ({ url: `articles/type/${articleCategory}` }),
    }),
    fetchFilters: builder.query<string[], void>({
      query: () => ({ url: "articles/filters" }),
    }),
  }),
});

export const {
  useFetchArticleDetailsQuery,
  useFetchArticlesQuery,
  useFetchCategoryArticlesQuery,
  useFetchFiltersQuery,
} = catalogApi;
