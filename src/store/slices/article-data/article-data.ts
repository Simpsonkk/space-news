import { Article } from './../../../types/article.model';
import { NameSpace } from './../../../consts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ArticleState } from './../../../types/state.model';

const initialState: ArticleState = {
  articles: [],
  selectedArticle: null,
  termSearch: '',
  articleCount: 0,
};

export const articleData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    loadArticles: (state, action: PayloadAction<Article[] | null>) => {
      if (!action.payload) {
        state.articles = [];
        return;
      }
      if (state.articles.length) {
        state.articles = [...state.articles, ...action.payload];
      } else {
        state.articles = action.payload;
      }
    },
    loadSelectedArticle: (state, action: PayloadAction<Article>) => {
      state.selectedArticle = action.payload;
    },
    loadTermSearch: (state, action: PayloadAction<string>) => {
      state.termSearch = action.payload;
    },
    loadArticlesCount: (state, action: PayloadAction<number>) => {
      state.articleCount = action.payload;
    },
  },
});

export const {
  loadArticles,
  loadSelectedArticle,
  loadTermSearch,
  loadArticlesCount,
} = articleData.actions;
