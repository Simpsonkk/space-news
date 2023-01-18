import { store } from './../store/index';
import { Article } from './article.model';

export type ArticleState = {
  articles: Article[];
  selectedArticle: Article | null;
  articleCount: number;
  termSearch: string;
};

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
