import 'react-toastify/dist/ReactToastify.css';

import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import App from './components/app';
import ArticleSearchProvider from './context/article-search-context';
import { theme } from './theme';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <QueryClientProvider client={queryClient}>
    <ArticleSearchProvider>
      <BrowserRouter>
        <ToastContainer />
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </ArticleSearchProvider>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
