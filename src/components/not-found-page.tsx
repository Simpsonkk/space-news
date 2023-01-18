import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../consts';
import '../styles/not-found-page.scss';

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="page-not-found">
      <button
        onClick={() => navigate(AppRoute.Main)}
        className="page-not-found__button"
      >
        Go back home
      </button>
    </div>
  );
}

export default NotFoundPage;
