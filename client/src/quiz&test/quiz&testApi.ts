import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../api/baseApi";
import { Question } from "./question";
import { CareerOption } from "./careerOption";
import { Pagination } from "../models/pagination";
import { TutorialParams } from "../models/tutorialParams";

export const quiztestApi = createApi({
  reducerPath: "quiz&testApi",
  baseQuery: baseQueryWithErrorHandling,
  endpoints: (builder) => ({
    randomQuestions: builder.query<Question[], void>({
      query: () => ({ url: "quiztest/randomQuestions" }),
    }),
    careerOptions: builder.query<CareerOption[], void>({
      query: () => ({ url: "quiztest/careerOptions" }),
    }),
    fetchQuizQuestions: builder.query<
          { questions: Question[]; pagination: Pagination },
          TutorialParams
        >({
      query: (tutorialParams) => { 
        return {
        url: "quiztest/all-quiz-questions" ,
        params: tutorialParams,
      };
    },
    transformResponse: (questions: Question[], meta) => {
            const paginationHeader = meta?.response?.headers.get("Pagination");
            const pagination = paginationHeader
              ? JSON.parse(paginationHeader)
              : null;
            return { questions, pagination };
          },
        }),
    deleteQuestion:builder.mutation<void, number> ({
        query: (id: number) => {
            return {
              url: `quiztest/delete-question/${id}`,
              method: "DELETE",
            };
          },
    }),
     createQuestion: builder.mutation<Question, FormData>({
          query: (data: FormData) => {
            return {
              url: "quiztest/add-question",
              method: "POST",
              body: data,
            };
          },
        }),
  }),
});
export const {
  useRandomQuestionsQuery,
  useCareerOptionsQuery,
  useFetchQuizQuestionsQuery,
  useDeleteQuestionMutation,
  useCreateQuestionMutation
} = quiztestApi;
