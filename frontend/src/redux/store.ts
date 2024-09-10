import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import storyApi from "./features/stories/storyAPI";
import authApi from "./features/auth/authAPI";
import authReducer from "./features/auth/authSlice";
import commentApi from "./features/comments/commentAPI";

export const store = configureStore({
  reducer: {
    [storyApi.reducerPath]: storyApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      storyApi.middleware,
      authApi.middleware,
      commentApi.middleware
    ),
});

setupListeners(store.dispatch);
