import { createSlice } from "@reduxjs/toolkit";

interface TutorialState {
  searchTerm: string;
  pageNumber: number; // podrazumjevano se prikazuje prva stranica.
  pageSize: number;
}

const initialStateTutorial:     TutorialState = {
  searchTerm: "",
  pageNumber: 1, // podrazumjevano se prikazuje prva stranica.
  pageSize: 3,
};

export const tutorialSlice = createSlice({
  name: "tutorials",
  initialState: initialStateTutorial,
  reducers: {
    setTutorialSearchTerm: (state, action) => {
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
  setTutorialSearchTerm,
  resetSearchTerm,
  setPageNumber,
  setPageSize,
} = tutorialSlice.actions;
export default tutorialSlice.reducer;
