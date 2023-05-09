import { Article, PaginatedArticleList } from '../types/article.types';
import { SearchParams } from '../types/search-params.types';
import { createAPI } from './api';

const api = createAPI();
const PAGE_SIZE = 10;

export const ArticleService = {
  async getFiltered({ pageNumber, termSearch }: SearchParams) {
    const { data } = await api.get<PaginatedArticleList>('/', {
      params: {
        offset: (pageNumber - 1) * PAGE_SIZE,
        title_contains: termSearch,
      },
    });
    return data;
  },
  async getSelected(articleId: string | undefined) {
    const { data } = await api.get<Article>(`/${articleId}`);
    return data;
  },
};
