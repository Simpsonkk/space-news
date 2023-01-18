import { store } from './../store/index';
import { Article } from './article.model';

export type ArticleState = {
  articleList: Article[],
  selectedArticle: Article | null,
  articlesCount: number,
  searchSymbols: string,
}

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;