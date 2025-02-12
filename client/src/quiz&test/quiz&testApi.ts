import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../api/baseApi";
import { Question } from "./question";
import { CareerOption } from "./careerOption";

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
    fetchQuizQuestions: builder.query<Question[], void>({
      query: () => ({ url: "quiztest/all-quiz-questions" }),
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
