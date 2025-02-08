import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQueryWithErrorHandling } from "../api/baseApi"
import { Question } from "./question"
import { CareerOption } from "./careerOption";

export const quiztestApi = createApi({
    reducerPath:"quiz&testApi",
    baseQuery:baseQueryWithErrorHandling,
    endpoints:(builder) => ({
        randomQuestions:builder.query<Question[], void> ({
            query: () => ({ url: "questions/randomQuestions" }),
        }),
        careerOptions:builder.query<CareerOption[], void> ({
            query: () => ({url:"questions/careerOptions"})
        })
    })
})
export const {useRandomQuestionsQuery, useCareerOptionsQuery} = quiztestApi;