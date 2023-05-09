import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import Divider from '@mui/material/Divider/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useInfiniteQuery } from '@tanstack/react-query';

import { useArticle } from '../context/article-search-context';
import { useDebounce } from '../hooks/useDebounce';
import { ArticleService } from '../services/article-service';
import ArticleCard from './article-card';
import Loader from './loader';

function ArticleList() {
  const [articleNumber, setArticleNumber] = useState<number>(0);
  const { termSearch } = useArticle();
  const debouncedSearchTerm = useDebounce(termSearch.trim(), 600);
  const { ref, inView } = useInView();

  const { isLoading, data, isFetchingNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ['article', debouncedSearchTerm],
    queryFn: ({ pageParam = 1 }) =>
      ArticleService.getFiltered({ termSearch: debouncedSearchTerm, pageNumber: pageParam }),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.results.length ? allPages.length + 1 : undefined,
    onSuccess: (data) => setArticleNumber(data.pages[0].count),
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <Typography fontWeight={600} mt={'45px'}>
        Results: {articleNumber}
      </Typography>
      <Divider />
      <Grid container mt={5} columnGap={5.5}>
        {data?.pages.map((page) =>
          page.results.map((article) => <ArticleCard key={article.id} articleData={article} />)
        )}
      </Grid>
      <p ref={ref}>{isFetchingNextPage ? 'Loading more...' : 'Nothing more to load'}</p>
    </>
  );
}

export default ArticleList;
