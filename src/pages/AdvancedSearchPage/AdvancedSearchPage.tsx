import './AdvancedSearchPage.scss'
import React from 'react';
import { FullPageTitleBar, SearchBar } from 'src/components/common';
import { APP_NAME } from 'src/configs/constants';
import { useTranslation } from 'react-i18next';

export const AdvancedSearchPage: React.FC<IAdvancedSearchPage> = ({

}) => {
  const { t } = useTranslation();
  document.title = `${APP_NAME} | ${t('advanced_search_page.title')}`

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

        <SearchBar />
      </div>
    </div>
  );
};
