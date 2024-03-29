import { Container } from '@mui/material';

import ArticleList from '../components/article-list';
import ArticleSearch from '../components/article-search';

function MainPage() {
  return (
    <Container
      maxWidth={false}
      fixed
      disableGutters={true}
      sx={{
        paddingBlockStart: '50px',
        paddingBlockEnd: '18px',
        width: '1440px',
        paddingInline: '75px',
      }}
    >
      <ArticleSearch />
      <ArticleList />
    </Container>
  );
}

export default MainPage;
