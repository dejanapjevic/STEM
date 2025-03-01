// features/users/userSlice.ts

import { createSlice } from "@reduxjs/toolkit";




 interface UserState {
  searchTerm: string ;
  pageNumber: number, // podrazumjevano se prikazuje prva stranica.
  pageSize: number,
}

const initialStateUser: UserState = {
  searchTerm: "",
  pageNumber: 1, // podrazumjevano se prikazuje prva stranica.
  pageSize: 8,
};

export const userSlice = createSlice({
  name: "users",
  initialState:initialStateUser,
  reducers: {
    setUserSearchTerm: (state, action) => {
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

export const { setUserSearchTerm, resetSearchTerm, setPageNumber, setPageSize } = userSlice.actions;
export default userSlice.reducer;
 