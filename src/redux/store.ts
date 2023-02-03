import { combineReducers, configureStore } from '@reduxjs/toolkit';
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
import themeReducer from './theme/theme-reducers';
import isOpenReducer from './isOpen/isOpen-reducers';
import { contactsApi } from './contacts/contacts-slice';
import { authApi } from './auth/auth';
import authReducer from './auth/auth-slice';
import loggedReducer from './auth/logged-slice';
import avatarsReducer from './addAvatar/avatars-slice';

const themePersistConfig = {
  key: 'theme',
  storage,
};

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token', 'user'],
};

const loggedPersistConfig = {
  key: 'isLoggedIn',
  storage,
};

const avatarsPersistConfig = {
  key: 'avatarsID',
  storage,
};

const rootReducer = combineReducers({
  theme: persistReducer(themePersistConfig, themeReducer),
  auth: persistReducer(authPersistConfig, authReducer),
  isLoggedIn: persistReducer(loggedPersistConfig, loggedReducer),
  userAvatarID: persistReducer(avatarsPersistConfig, avatarsReducer),
  isOpen: isOpenReducer,
});

export const store = configureStore({
  reducer: {
    rootReducer,
    [contactsApi.reducerPath]: contactsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
    contactsApi.middleware,
    authApi.middleware,
  ],
  devTools: process.env.NODE_ENV === 'development',
});

export const rootState = store.getState;

export let persistor = persistStore(store);
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
