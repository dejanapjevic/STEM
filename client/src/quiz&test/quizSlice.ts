import { createSlice } from "@reduxjs/toolkit";

interface QuizState {
  searchTerm: string;
  pageNumber: number; // podrazumjevano se prikazuje prva stranica.
  pageSize: number;
}

const initialStateQuiz:     QuizState = {
  searchTerm: "",
  pageNumber: 1, // podrazumjevano se prikazuje prva stranica.
  pageSize: 7,
};

export const quizSlice = createSlice({
  name: "tutorials",
  initialState: initialStateQuiz,
  reducers: {
    setQuizSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    resetSearchTerm(state) {
      state.searchTerm = ""; // Reset na prazan string
    },
    setPageSize(state, action) {
      state.pageSize = action.payload;
    },
    setPageNumber(state, action) {
      state.pageNumber = action.payload; //payload-podaci koji se prosleđuju akciji.
    },
  },
});

export const {
  setQuizSearchTerm,
  resetSearchTerm,
  setPageNumber,
  setPageSize,
} = quizSlice.actions;
export default quizSlice.reducer;
