import MainPage from './main-page';
import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../consts';
import ArticlePage from './article-page';
import NotFoundPage from './not-found-page';
import '../styles/app.scss';

function App() {
  return (
    <Routes>
      <Route path={AppRoute.Main} element={<MainPage />} />
      <Route path={AppRoute.Article} element={<ArticlePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
