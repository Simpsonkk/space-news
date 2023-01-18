import { Article } from './../../../types/article.model';
import { NameSpace } from './../../../consts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ArticleState } from './../../../types/state.model';

const initialState: ArticleState = {
  articleList: [],
  selectedArticle: null,
  searchSymbols: '',
  articlesCount: 0,
};

export const articleData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    loadArticleList: (state, action: PayloadAction<Article[] | null>) => {
      if (!action.payload) {
        state.articleList = [];
        return;
      }
      if (state.articleList.length) {
        state.articleList = [...state.articleList, ...action.payload];
      } else {
        state.articleList = action.payload;
      }
    },
    loadSelectedArticle: (state, action: PayloadAction<Article>) => {
      state.selectedArticle = action.payload;
    },
    loadSearchSymbols: (state, action: PayloadAction<string>) => {
      state.searchSymbols = action.payload;
    },
    loadArticlesCount: (state, action: PayloadAction<number>) => {
      state.articlesCount = action.payload;
    },
  },
});

export const {
  loadArticleList,
  loadSelectedArticle,
  loadSearchSymbols,
  loadArticlesCount,
} = articleData.actions;
