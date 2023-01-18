import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Article } from '../types/article.model';
import { formatDate } from '../utils';
import DateIcon from '../images/icons/date-icon';
import { useNavigate } from 'react-router-dom';
import { APIRoute } from '../consts';
import ArrowRightIcon from '../images/icons/arrow-right-icon';
import { useAppSelector } from '../hooks';
import { getSearchSymbols } from '../store/slices/article-data/selectors';

type ArticleCardProps = {
  articleData: Article;
};

function ArticleCard({
  articleData: { id, imageUrl, publishedAt, summary, title },
}: ArticleCardProps) {
  const navigate = useNavigate();
  const searchSymbols = useAppSelector(getSearchSymbols);

  const getHighlightedText = (text: string, highlight: string) => {
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));

    return parts.map((part, i) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <mark key={i}>{part}</mark>
      ) : (
        part
      )
    );
  };

  return (
    <Card
      onClick={() => navigate(`${APIRoute.Articles}/${id}`)}
      sx={{ width: '400px', height: '500px', margin: 0, marginBottom: '45px' }}
    >
      <CardActionArea sx={{ height: '100%' }}>
        <CardMedia component="img" height="217" image={imageUrl} alt={title} />
        <Typography sx={{ opacity: 0.6 }} fontSize="14px" ml={2} mt={2.5}>
          <DateIcon /> {formatDate(publishedAt)}
        </Typography>
        <CardContent sx={{ height: '100%' }}>
          <Typography fontSize="24px" lineHeight="29px" mb={1}>
            {getHighlightedText(title.slice(0, 45), searchSymbols)}
            {title.length > 45 && '...'}
          </Typography>
          <Typography height="95px">
            {getHighlightedText(summary.slice(0, 100), searchSymbols)}
            {summary.length > 100 && '...'}
          </Typography>
          <Typography fontWeight="700">
            Read more {<ArrowRightIcon />}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ArticleCard;
