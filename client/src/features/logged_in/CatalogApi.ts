import { createApi } from "@reduxjs/toolkit/query/react";
import { Article } from "../../article";
import { baseQueryWithErrorHandling } from "../../api/baseApi";

export const catalogApi = createApi({
    reducerPath:'catalogApi',
    baseQuery:baseQueryWithErrorHandling,
    endpoints: (builder)=> ({
        fetchArticles:builder.query<Article[], void>({
            query : () => ({url:'articles'})
        }),
        fetchArticleDetails:builder.query<Article, number> ({
            query: (articleId) => ({url:`articles/${articleId}`})
        }),
        fetchCategoryArticles:builder.query<Article[],string> ({
            query:(articleCategory) => ({url:`articles/type/${articleCategory}`})
        })
    })
})

export const {useFetchArticleDetailsQuery, useFetchArticlesQuery, useFetchCategoryArticlesQuery} = catalogApi;