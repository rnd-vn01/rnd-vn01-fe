import './AdvancedSearchPage.scss'
import React, { useEffect, useState } from 'react';
import {
  FullPageTitleBar,
  SearchBar,
  SearchResults
} from 'src/components/common';
import { APP_NAME } from 'src/configs/constants';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'src/helpers/hooks/useQuery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

export const AdvancedSearchPage: React.FC<IAdvancedSearchPage> = ({ }) => {
  const { t } = useTranslation();
  let hookQuery = useQuery();
  document.title = `${APP_NAME} | ${t('advanced_search_page.title')}`

  const [searchResults, setSearchResults] = useState<Array<any>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [numberOfMatchingResults, setNumberOfMatchingResults] = useState<number>(0);
  const [isChoosingAlphabet, setIsChoosingAlphabet] = useState<boolean>(false);
  const [isFilter, setIsFilter] = useState<boolean>(false);
  const [showingScrollToTop, setShowingScrollToTop] = useState<boolean>(false);

  useEffect(() => {
    document.addEventListener("scroll", () => {
      if (window.pageYOffset > 100) {
        setShowingScrollToTop(true);
      } else {
        setShowingScrollToTop(false);
      }
    })
  }, [])

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
          passedQuery={hookQuery.get('query')}
          callbackIsFilter={setIsFilter}
        />

        <SearchResults
          results={searchResults}
          isLoading={isLoading}
          query={query}
          callbackSetNumberOfMatchingResults={setNumberOfMatchingResults}
          callbackSetChoosingAlphabet={setIsChoosingAlphabet}
          isFilter={isFilter}
        />
      </div>

      <div
        className={`advanced-search-page__scroll-to-top 
      ${showingScrollToTop && "advanced-search-page__scroll-to-top--showing"}`}
        onClick={() => {
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          })
        }}>
        <FontAwesomeIcon
          className="advanced-search-page__scroll-to-top--icon"
          icon={faArrowUp}
        ></FontAwesomeIcon>
      </div>
    </div>
  );
};
