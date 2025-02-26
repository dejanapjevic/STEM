// features/users/userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  searchTerm: string;
}

const initialState: UserState = {
  searchTerm: "",
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUserSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    resetSearchTerm(state) {
        state.searchTerm = "";  // Reset na prazan string
      },
  },
});

export const { setUserSearchTerm , resetSearchTerm} = userSlice.actions;
export default userSlice.reducer;
