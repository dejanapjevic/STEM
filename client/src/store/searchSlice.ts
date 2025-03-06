import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
  type: "articles" | "users" | "forum" | "tutorials" | "quiz";
}

const initialState: SearchState = {
  type: "articles", // Početni tip pretrage
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchType: (state, action: PayloadAction<"articles" | "users" | "forum" | "tutorials" | "quiz">) => {
      state.type = action.payload;
    },
  },
});

export const { setSearchType } = searchSlice.actions;
export default searchSlice.reducer;  // Ovdje eksportuj samo reducer
