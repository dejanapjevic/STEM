import { createSlice } from "@reduxjs/toolkit";
import { ArticleParams } from "../models/articleParams";

const initialState: ArticleParams = {
  orderBy: "title",
  pageNumber: 1, // podrazumjevano se prikazuje prva stranica.
  pageSize: 8, //podrazumjevani broj članaka po stranici je 8.
  categories: [], //nema unaprijed izabranih kategorija.
  searchTerm: "",
};

//Definišemo ime slice-a, početno stanje, i reducere koji menjaju to stanje.

export const catalogSlice = createSlice({
  name: "catalogSlice",
  initialState,
  reducers: {
    setPageNumber(state, action) {
      state.pageNumber = action.payload; //payload-podaci koji se prosleđuju akciji.
    },
    //Na primer, kada pozovemo akciju setPageNumber(2),
    //action.payload je 2, tako da se state.pageNumber postavlja na 2

    setPageSize(state, action) {
      state.pageSize = action.payload;
    },

    setOrderBy(state, action) {
      state.orderBy = action.payload;
      state.pageNumber = 1; //promjena sortiranja podrazumjeva ponovno učitavanje sadržaja od prve stranice.
    },

    setCategories(state, action) {
      state.categories = action.payload;
      state.pageNumber = 1;
    },

    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
      state.pageNumber = 1;
    },

    resetParams() {
      return initialState;
    },
  },
});

export const {
  setOrderBy,
  setCategories,
  setPageNumber,
  setPageSize,
  setSearchTerm,
  resetParams,
} = catalogSlice.actions;
