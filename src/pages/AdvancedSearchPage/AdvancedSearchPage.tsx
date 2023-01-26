import './AdvancedSearchPage.scss'
import React, { useState } from 'react';
import {
  FullPageTitleBar,
  SearchBar,
  SearchResults
} from 'src/components/common';
import { APP_NAME } from 'src/configs/constants';
import { useTranslation } from 'react-i18next';

export const AdvancedSearchPage: React.FC<IAdvancedSearchPage> = ({

}) => {
  const { t } = useTranslation();
  document.title = `${APP_NAME} | ${t('advanced_search_page.title')}`

  const [searchResults, setSearchResults] = useState<Array<any>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [numberOfMatchingResults, setNumberOfMatchingResults] = useState<number>(0);
  const [isChoosingAlphabet, setIsChoosingAlphabet] = useState<boolean>(false);

  return (
    <div
      role="div"
      aria-label="advanced-search-page"
      className="advanced-search-page grid grid-cols-7">
      <div className="advanced-search-page__content">
        <FullPageTitleBar
          pageCode="advanced-search"
          translateCode="advanced_search"
        />

        <SearchBar
          callbackSetResults={setSearchResults}
          callbackSetLoading={setIsLoading}
          callbackSetQuery={setQuery}
          numberOfMatchingResults={numberOfMatchingResults}
          isChoosingAlphabet={isChoosingAlphabet}
        />

        <SearchResults
          results={searchResults}
          isLoading={isLoading}
          query={query}
          callbackSetNumberOfMatchingResults={setNumberOfMatchingResults}
          callbackSetChoosingAlphabet={setIsChoosingAlphabet}
        />
      </div>
    </div>
  );
};
