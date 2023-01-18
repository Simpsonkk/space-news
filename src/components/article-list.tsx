import { useAppDispatch, useAppSelector } from '../hooks';
import {
  getArticleList,
  getArticlesCount,
  getSearchSymbols,
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
import { loadArticleList } from '../store/slices/article-data/article-data';

function ArticleList() {
  const [pageAmount, setPageAmount] = useState(1);
  const articleList = useAppSelector(getArticleList);
  const articlesCount = useAppSelector(getArticlesCount);

  const dispatch = useAppDispatch();
  const searchSymbols = useAppSelector(getSearchSymbols);

  const hasMore = articlesCount - pageAmount * 12 > 0;

  useEffect(() => {
    dispatch(fetchFilteredArticlesAction({ searchSymbols, pageAmount }));
  }, [dispatch, searchSymbols, pageAmount]);

  useEffect(() => {
    setPageAmount(1);
    dispatch(loadArticleList(null));
    dispatch(fetchCountArticlesAction(searchSymbols));
  }, [dispatch, searchSymbols]);

  return (
    <>
      <Typography fontWeight={600} mt={'45px'}>
        Results: {hasMore ? articlesCount : articleList.length}
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
