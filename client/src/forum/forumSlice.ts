import { createSlice } from "@reduxjs/toolkit";

interface ForumState {
  searchTerm: string;
  pageNumber: number; // podrazumjevano se prikazuje prva stranica.
  pageSize: number;
}

const initialStateForum: ForumState = {
  searchTerm: "",
  pageNumber: 1, // podrazumjevano se prikazuje prva stranica.
  pageSize: 3,
};

export const forumSlice = createSlice({
  name: "forum",
  initialState: initialStateForum,
  reducers: {
    setForumSearchTerm: (state, action) => {
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
  setForumSearchTerm,
  setPageNumber,
  setPageSize,
  resetSearchTerm,
} = forumSlice.actions;
