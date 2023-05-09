export type Article = {
  id: number;
  title: string;
  summary: string;
  url: string;
  featured: boolean;
  image_url: string;
  launches: object[];
  news_site: string;
  published_at: string;
  updated_at: string;
  events: [];
};

export type PaginatedArticleList = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Article[];
};
