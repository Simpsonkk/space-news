import { useAppDispatch, useAppSelector } from '../hooks';
import {
  getArticles,
  getArticlesCount,
  getTermSearch,
} from '../store/slices/article-data/selectors';
import ArticleCard from './article-card';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider/Divider';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useEffect, useState } from 'react';
import {
  fetchCountArticlesAction,
  fetchFilteredArticlesAction,
} from '../store/actions/api-actions';
import { loadArticles } from '../store/slices/article-data/article-data';

function ArticleList() {
  const [pageNumber, setPageAmount] = useState(1);
  const articleList = useAppSelector(getArticles);
  const articleCount = useAppSelector(getArticlesCount);

  const dispatch = useAppDispatch();
  const termSearch = useAppSelector(getTermSearch);

  const hasMore = articleCount - pageNumber * 12 > 0;

  useEffect(() => {
    dispatch(fetchFilteredArticlesAction({ termSearch, pageNumber }));
  }, [dispatch, termSearch, pageNumber]);

  useEffect(() => {
    setPageAmount(1);
    dispatch(loadArticles(null));
    dispatch(fetchCountArticlesAction(termSearch));
  }, [dispatch, termSearch]);

  return (
    <>
      <Typography fontWeight={600} mt={'45px'}>
        Results: {hasMore ? articleCount : articleList.length}
      </Typography>
      <Divider />
      <InfiniteScroll
        next={() => {
          setPageAmount((prev) => prev + 1);
        }}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        dataLength={articleList.length}
        endMessage={<p>Yay! You have seen it all</p>}
      >
        <Grid container mt={5} justifyContent="space-between">
          {articleList.map((article) => (
            <ArticleCard key={article.id} articleData={article} />
          ))}
        </Grid>
      </InfiniteScroll>
    </>
  );
}

export default ArticleList;
