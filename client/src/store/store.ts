import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { catalogApi } from "../catalog/CatalogApi";
import { uiSlice } from "../uiSlice";
import { errorApi } from "../api/ErrorApi";
import { catalogSlice } from "../catalog/catalogSlice";
import { accountApi } from "../account/accountApi";
import { adminApi } from "../admin/adminApi";
import { quiztestApi } from "../quiz&test/quiz&testApi";
import { forumApi } from "../forum/forumApi";
import { tutorialApi } from "../video-lectures/tutorialApi";
import { userSlice } from "../account/userSlice";
import { forumSlice } from "../forum/forumSlice";
import { tutorialSlice } from "../video-lectures/tutorialSlice";

export const store = configureStore({
  reducer: {
    [catalogApi.reducerPath]: catalogApi.reducer,
    [errorApi.reducerPath]: errorApi.reducer,
    [accountApi.reducerPath]: accountApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
    [quiztestApi.reducerPath]: quiztestApi.reducer,
    [forumApi.reducerPath]: forumApi.reducer,
    [tutorialApi.reducerPath]: tutorialApi.reducer,

    ui: uiSlice.reducer,
    catalog: catalogSlice.reducer,
    users: userSlice.reducer,
    forum: forumSlice.reducer,
    tutorial:tutorialSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      catalogApi.middleware,
      errorApi.middleware,
      accountApi.middleware,
      adminApi.middleware,
      quiztestApi.middleware,
      forumApi.middleware,
      tutorialApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
