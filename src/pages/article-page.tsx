import '../assets/styles/article-page.scss';

import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useQuery } from '@tanstack/react-query';

import ArrowLeftIcon from '../assets/images/icons/arrow-left-icon';
import Loader from '../components/loader';
import { useArticle } from '../context/article-search-context';
import { AppRoute } from '../enums';
import { ArticleService } from '../services/article-service';
import { QueryError } from '../types/query-error.types';

function ArticlePage() {
  const { id } = useParams();
  const { termSearch } = useArticle();

  const { data: selectedArticle, isLoading } = useQuery({
    queryKey: [termSearch, id],
    queryFn: () => ArticleService.getSelected(id),
    onError: (error: QueryError) => toast.error(error.message),
  });

  return isLoading ? (
    <Loader />
  ) : (
    <div className="article-page">
      <img
        className="article-page__background"
        src={selectedArticle?.image_url}
        alt={selectedArticle?.title}
      />
      <div className="article-page__content">
        <h3 className="article-page__title">{selectedArticle?.title}</h3>
        <p className="article-page__text">{selectedArticle?.summary}</p>
        <Link to={AppRoute.Main} className="article-page__link">
          {<ArrowLeftIcon />} Back to homepage
        </Link>
      </div>
    </div>
  );
}

export default ArticlePage;
