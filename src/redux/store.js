import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import { setupListeners } from '@reduxjs/toolkit/query';
import storage from 'redux-persist/lib/storage';
import filterReducer from './contacts/contacts-reducers';
import themeReducer from "./theme/theme-reducers";
import isOpenReducer from "./isOpen/isOpen-reducers";
import { contactsApi } from "./contacts/contacts-slice";

const themePersistConfig = {
  key: 'theme',
  storage,
}

const rootReducer = combineReducers(({
    filter: filterReducer,
    theme: persistReducer(themePersistConfig, themeReducer),
    isOpen: isOpenReducer,
}));

export const store = configureStore({
    reducer: {
        rootReducer,
        [contactsApi.reducerPath]: contactsApi.reducer,
    },
    middleware: (getDefaultMiddleware) => [
         ...getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
         }),
        contactsApi.middleware,
    ],
    devTools: process.env.NODE_ENV === 'development',
});

export let persistor = persistStore(store);
setupListeners(store.dispatch);

