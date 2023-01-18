export enum AppRoute {
  Main = '/',
  Article = '/articles/:id',
  NotFound = '*',
}

export enum NameSpace {
  Data = 'articleData',
}
export enum HttpCode {
  BadRequest = 400,
  NotFound = 404,
}

export enum APIRoute {
  Articles = 'articles',
  Contains = '_contains',
  Title = 'title',
  Summary = 'summary',
  Limit = '_limit',
  Start = '_start',
  Count = 'count',
}
