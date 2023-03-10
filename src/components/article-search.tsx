import { ChangeEvent, useState } from 'react';
import { Grid, InputAdornment, TextField, Typography } from '@mui/material';
import ArticleSearchIcon from '../images/icons/article-search-icon';
import { useAppDispatch, useAppSelector } from '../hooks';
import { loadTermSearch } from '../store/slices/article-data/article-data';
import { useDebounce } from '../hooks/useDebounce';
import { getTermSearch } from '../store/slices/article-data/selectors';

function ArticleSearchForm() {
  const defaultValue = useAppSelector(getTermSearch);
  const [inputValue, setInputValue] = useState(defaultValue);
  const dispatch = useAppDispatch();

  const makeRequest = useDebounce(() => {
    dispatch(loadTermSearch(inputValue.trim()));
  }, 700);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    makeRequest();
    setInputValue(e.target.value);
  };

  return (
    <Grid container direction="column">
      <Typography fontWeight={600} mb={'10px'}>
        Filter by keywords
      </Typography>
      <TextField
        sx={{
          width: '600px',
          boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.05)',
        }}
        placeholder="Search here"
        onChange={handleChange}
        value={inputValue}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment
              position="start"
              sx={{ margin: '10px 18px 10px 5px' }}
            >
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
