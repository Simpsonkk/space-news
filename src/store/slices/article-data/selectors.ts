import { Article } from './../../../types/article.model';
import { State } from './../../../types/state.model';

export const getArticles = (state: State): Article[] => state.articles;
export const getSelectedArticle = (state: State): Article | null =>
  state.selectedArticle;
export const getTermSearch = (state: State): string => state.termSearch;
export const getArticlesCount = (state: State): number => state.articleCount;
