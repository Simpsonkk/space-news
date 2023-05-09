import '../assets/styles/app.scss';

import { Route, Routes } from 'react-router-dom';

import { AppRoute } from '../enums';
import ArticlePage from '../pages/article-page';
import MainPage from '../pages/main-page';
import NotFoundPage from '../pages/not-found-page';

function App() {
  return (
    <Routes>
      <Route path={AppRoute.Main} element={<MainPage />} />
      <Route path={AppRoute.Article} element={<ArticlePage />} />
      <Route path={AppRoute.NotFound} element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
