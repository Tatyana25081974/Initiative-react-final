import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import filtersReduser from "./filters/slice.js";
import recipesReduser from "./recipes/slice.js";
import authReduser from "./auth/slice.js";

const authPersistedReducer = persistReducer(
  {
    key: "auth-token",
    storage,
    whitelist: ["accessToken"],
  },
  authReduser
);

export const store = configureStore({
  reducer: {
    recipes: recipesReduser,
    filters: filtersReduser,
    auth: authPersistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// export const persistor = persistStore(store);
