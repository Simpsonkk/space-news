import { ChangeEvent } from 'react';

import { Grid, InputAdornment, TextField, Typography } from '@mui/material';

import ArticleSearchIcon from '../assets/images/icons/article-search-icon';
import { useArticle } from '../context/article-search-context';

function ArticleSearchForm() {
  const { termSearch, setTermSearch } = useArticle();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setTermSearch(e.target.value);

  return (
    <Grid container direction="column">
      <Typography fontWeight={600} mb={'10px'}>
        Filter by keywords
      </Typography>
      <TextField
        sx={{
          boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.05)',
        }}
        placeholder="Search here"
        onChange={handleChange}
        value={termSearch}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" sx={{ margin: '10px 18px 10px 5px' }}>
              <ArticleSearchIcon />
            </InputAdornment>
          ),
          style: {
            height: '50px',
          },
        }}
      />
    </Grid>
  );
}

export default ArticleSearchForm;
