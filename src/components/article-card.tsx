import { useNavigate } from 'react-router-dom';

import { CardActionArea } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import ArrowRightIcon from '../assets/images/icons/arrow-right-icon';
import DateIcon from '../assets/images/icons/date-icon';
import { useArticle } from '../context/article-search-context';
import { APIRoute, AppRoute } from '../enums';
import { Article } from '../types/article.types';
import { formatDate } from '../utils';

type ArticleCardProps = {
  articleData: Article;
};

function ArticleCard({
  articleData: { id, image_url, published_at, summary, title },
}: ArticleCardProps) {
  const navigate = useNavigate();
  const { termSearch } = useArticle();

  const getHighlightedText = (text: string, highlight: string) => {
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));

    return parts.map((part, i) =>
      part.toLowerCase() === highlight.toLowerCase() ? <mark key={i}>{part}</mark> : part
    );
  };

  return (
    <Card
      onClick={() => navigate(`${AppRoute.Main}/${APIRoute.Articles}/${id}`)}
      sx={{ width: '400px', height: '500px', margin: 0, marginBottom: '45px' }}
    >
      <CardActionArea sx={{ height: '100%' }}>
        <CardMedia component="img" height="217" image={image_url} alt={title} />
        <Typography sx={{ opacity: 0.6 }} fontSize="14px" ml={2} mt={2.5}>
          <DateIcon /> {formatDate(published_at)}
        </Typography>
        <CardContent sx={{ height: '100%' }}>
          <Typography fontSize="24px" lineHeight="29px" mb={1}>
            {getHighlightedText(title.slice(0, 45), termSearch.trim())}
            {title.length > 45 && '...'}
          </Typography>
          <Typography height="95px">
            {summary.slice(0, 100)}
            {summary.length > 100 && '...'}
          </Typography>
          <Typography fontWeight="700">Read more {<ArrowRightIcon />}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ArticleCard;
