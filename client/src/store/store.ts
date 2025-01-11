import { configureStore, legacy_createStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import counterReducer, { counterSlice } from "../features/about/counterReducer";
import { catalogApi } from "../features/logged_in/CatalogApi";
import { uiSlice } from "../uiSlice";


export function configureTheStore() {
    return legacy_createStore(counterReducer);
}
export const store = configureStore ({
    reducer : {
        [catalogApi.reducerPath] : catalogApi.reducer,
        counter:counterSlice.reducer,
        ui: uiSlice.reducer
    },
    middleware:(getDefaultMiddleware) =>
        getDefaultMiddleware().concat(catalogApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()