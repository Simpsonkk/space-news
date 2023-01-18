import { createAPI } from './../services/api';
import { articleData } from './slices/article-data/article-data';
import { configureStore } from '@reduxjs/toolkit';

const api = createAPI();

export const store = configureStore({
  reducer: articleData.reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: { api },
      },
    }),
});
