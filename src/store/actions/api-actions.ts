import { SearchParams } from './../../types/search-params.model';
import { APIRoute } from './../../consts';
import { errorHandler } from './../../services/errorHandler';
import { AppDispatch } from './../../types/state.model';
import { AxiosInstance } from 'axios';
import { Article } from './../../types/article.model';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  loadArticles,
  loadArticlesCount,
  loadSelectedArticle,
} from '../slices/article-data/article-data';

export const fetchSelectedArticleAction = createAsyncThunk<
  void,
  string | undefined,
  { extra: { api: AxiosInstance }; dispatch: AppDispatch }
>('fetchSelectedArticle', async (articleId, { extra: { api }, dispatch }) => {
  try {
    const { data } = await api.get<Article>(
      `${APIRoute.Articles}/${articleId}`
    );
    dispatch(loadSelectedArticle(data));
  } catch (error) {
    errorHandler(error);
  }
});

export const fetchFilteredArticlesAction = createAsyncThunk<
  void,
  SearchParams,
  { extra: { api: AxiosInstance }; dispatch: AppDispatch }
>(
  'filteredArticles',
  async (
    params: { termSearch: string; pageNumber: number },
    { extra: { api }, dispatch }
  ) => {
    try {
      const pageSize = 6;
      const titleData = await api.get<Article[]>(
        `${APIRoute.Articles}?${APIRoute.Title}${APIRoute.Contains}=${
          params.termSearch
        }&${APIRoute.Limit}=${pageSize}&${APIRoute.Start}=${
          params.pageNumber * pageSize
        }`
      );

      const summaryData = await api.get<Article[]>(
        `${APIRoute.Articles}?${APIRoute.Summary}${APIRoute.Contains}=${
          params.termSearch
        }&${APIRoute.Limit}=${pageSize}&${APIRoute.Start}=${
          params.pageNumber * pageSize
        }`
      );

      const filterArticles = summaryData.data.filter(
        (summaryArticle) =>
          !titleData.data.find(
            (titleArticle) => titleArticle.id === summaryArticle.id
          )
      );
      dispatch(loadArticles([...titleData.data, ...filterArticles]));
    } catch (error) {
      errorHandler(error);
    }
  }
);

export const fetchCountArticlesAction = createAsyncThunk<
  void,
  string,
  { extra: { api: AxiosInstance }; dispatch: AppDispatch }
>('fetchCountArticles', async (termSearch, { extra: { api }, dispatch }) => {
  try {
    const { data } = await api.get<number>(
      `${APIRoute.Articles}/${APIRoute.Count}?${APIRoute.Title}${APIRoute.Contains}=${termSearch}`
    );
    dispatch(loadArticlesCount(data));
  } catch (error) {
    errorHandler(error);
  }
});
