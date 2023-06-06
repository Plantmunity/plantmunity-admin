import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
//import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from "./storage";

// RTK Query

import { accountApi } from "./services/accountApi";
import { authApi } from "./services/authApi";
import { landingApi } from "./services/landingApi";
import { manageApi } from "./services/manageApi";
//Redux
import authReducer from "./persist/authentication/authSlice";
import userReducer from "./persist/account/userSlice";
import registerReducer from "./persist/authentication/registerSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  register: registerReducer,
  [accountApi.reducerPath]: accountApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [landingApi.reducerPath]: landingApi.reducer,
  [manageApi.reducerPath]: manageApi.reducer,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  //stateReconciler: autoMergeLevel2,
  blacklist: [
    accountApi.reducerPath,
    authApi.reducerPath,
    landingApi.reducerPath,
    manageApi.reducerPath,
  ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      accountApi.middleware,
      authApi.middleware,
      landingApi.middleware,
      manageApi.middleware
    ),
});

setupListeners(store.dispatch);
