import { Article } from './../../../types/article.model';
import { State } from './../../../types/state.model';

export const getArticleList = (state: State): Article[] => state.articleList;
export const getSelectedArticle = (state: State): Article | null => state.selectedArticle;
export const getSearchSymbols = (state: State): string => state.searchSymbols;
export const getArticlesCount = (state: State): number => state.articlesCount;