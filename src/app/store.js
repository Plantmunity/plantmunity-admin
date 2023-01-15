import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query'
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist';

  import storage from './storage';

//redux persists
//import forumReducer from './persists/forum'

//RTK Query
//import { concernApi } from './services/concernApi';


const rootReducer = combineReducers({
    // [concernApi.reducerPath]: concernApi.reducer,
    // user: userReducer,
  });

  const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    //stateReconciler: autoMergeLevel2,
    blacklist: [],
  };

  const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
              },
        }).concat(),
});

setupListeners(store.dispatch);