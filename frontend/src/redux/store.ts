import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import storyApi from "./features/stories/storyAPI";
import authApi from "./features/auth/authAPI";
import authReducer from "./features/auth/authSlice";

export const store = configureStore({
  reducer: {
    [storyApi.reducerPath]: storyApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    // [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(storyApi.middleware, authApi.middleware),
});

setupListeners(store.dispatch);
