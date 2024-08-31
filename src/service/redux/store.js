import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { userApi } from "./apiQuries/UserApi";
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

import storage from "redux-persist/lib/storage";
import { baseApi } from "./apiQuries/baseApi";
import { todoApi } from "./apiQuries/todoApi";

const reducers = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  // userSlice: userSlice,
  // nameSlice: nameSlice
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(userApi.middleware)
      .concat(todoApi.middleware),
});

export let persistor = persistStore(store);

export default store;
