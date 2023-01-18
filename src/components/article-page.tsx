import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import ArrowLeftIcon from '../images/icons/arrow-left-icon';
import { fetchSelectedArticleAction } from '../store/actions/api-actions';
import { getSelectedArticle } from '../store/slices/article-data/selectors';
import Loader from './loader';
import '../styles/article-page.scss';
import { AppRoute } from '../consts';

function ArticlePage() {
  const params = useParams();
  const dispatch = useAppDispatch();
  const selectedArticle = useAppSelector(getSelectedArticle);

  useEffect(() => {
    dispatch(fetchSelectedArticleAction(params.id));
  }, [dispatch, params]);

  if (!selectedArticle) {
    return <Loader />;
  }

  return (
    <div className="article-page">
      <img
        className="article-page__background"
        src={selectedArticle.imageUrl}
        alt={selectedArticle.title}
      />
      <div className="article-page__content">
        <h3 className="article-page__title">{selectedArticle.title}</h3>
        <p className="article-page__text">{selectedArticle.summary}</p>
        <Link to={AppRoute.Main} className="article-page__link">
          {<ArrowLeftIcon />} Back to homepage
        </Link>
      </div>
    </div>
  );
}

export default ArticlePage;
