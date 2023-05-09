import { createContext, ReactNode, useContext, useState } from 'react';

type Context = {
  termSearch: string;
  setTermSearch: (termSearch: string) => void;
};

type ArticleSearchProviderProps = {
  children: ReactNode;
};

const ArticleSearchContext = createContext<Context>({ termSearch: '', setTermSearch: () => '' });

export const useArticle = () => useContext(ArticleSearchContext);

function ArticleSearchProvider({ children }: ArticleSearchProviderProps) {
  const [termSearch, setTermSearch] = useState<string>('');

  return (
    <ArticleSearchContext.Provider value={{ termSearch, setTermSearch }}>
      {children}
    </ArticleSearchContext.Provider>
  );
}

export default ArticleSearchProvider;
