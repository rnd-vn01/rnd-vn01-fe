import './DataManagementPage.scss'
import React, { useEffect, useState } from 'react';
import {
  FullPageTitleBar,
  SearchBar,
  SearchResults
} from 'src/components/common';
import { APP_NAME } from 'src/configs/constants';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

export const DataManagementPage: React.FC<IAdvancedSearchPage> = ({

}) => {
  const { t } = useTranslation();
  document.title = `${APP_NAME} | ${t('data_management_page.title')}`

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
      aria-label="data-management-page"
      className="data-management-page grid grid-cols-7">
      <div className="data-management-page__content">
        <FullPageTitleBar
          pageCode="data-management"
          translateCode="data_management"
        />

        <SearchBar
          callbackSetResults={setSearchResults}
          callbackSetLoading={setIsLoading}
          callbackSetQuery={setQuery}
          numberOfMatchingResults={numberOfMatchingResults}
          isChoosingAlphabet={isChoosingAlphabet}
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
        className={`data-management-page__scroll-to-top 
      ${showingScrollToTop && "data-management-page__scroll-to-top--showing"}`}
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          })
        }}
        role="div"
        aria-label="scroll-to-top">
        <FontAwesomeIcon
          className="data-management-page__scroll-to-top--icon"
          icon={faArrowUp}
        ></FontAwesomeIcon>
      </div>
    </div>
  );
};
