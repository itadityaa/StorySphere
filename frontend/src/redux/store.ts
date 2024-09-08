import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import storyApi from "./features/stories/storyAPI";

export const store = configureStore({
  reducer: {
    [storyApi.reducerPath]: storyApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(storyApi.middleware),
});

setupListeners(store.dispatch);
