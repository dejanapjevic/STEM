import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

import { catalogApi } from "../catalog/CatalogApi";
import { uiSlice } from "../uiSlice";
import { errorApi } from "../api/ErrorApi";
import { catalogSlice } from "../catalog/catalogSlice";
import { accountApi } from "../features/account/accountApi";

export const store = configureStore({
  reducer: {
    [catalogApi.reducerPath]: catalogApi.reducer,
    [errorApi.reducerPath]: errorApi.reducer,
    [accountApi.reducerPath] :accountApi.reducer,
    ui: uiSlice.reducer,
    catalog: catalogSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(catalogApi.middleware, errorApi.middleware, accountApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
