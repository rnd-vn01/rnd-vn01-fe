import './SearchBar.scss';
import React, { useState, useRef } from "react";
import SearchIconGray from "src/assets/images/SearchIconGray.svg"
import SearchIconBlack from "src/assets/images/SearchIconBlack.svg"
import { useHistory } from 'react-router-dom';
import { SearchResults } from './SearchResults/SearchResults';
import { useTranslation } from 'react-i18next';

export const SearchBar: React.FC<ISearchBar> = ({ }) => {
  const inputBoxRef = useRef()
  const history = useHistory();

  const [usingQuickSearchIconImage, setUsingQuickSearchIconImage] = useState<any>(SearchIconGray)
  const [query, setQuery] = useState<string>("");
  const { t } = useTranslation();

  return (
    <div
      role="div"
      aria-label="search-bar"
      className="search-bar"
      onClick={() => {
        if (inputBoxRef.current) {
          (inputBoxRef.current as HTMLInputElement).focus()
        }
      }}>

      <img
        src={usingQuickSearchIconImage}
        className="search-bar__logo--search"></img>

      <span className="search-bar__input--span">
        <input
          ref={inputBoxRef}
          className="search-bar__input"
          onFocus={() => setUsingQuickSearchIconImage(SearchIconBlack)}
          onBlur={() => setUsingQuickSearchIconImage(SearchIconGray)}
          value={query}
          onChange={e => setQuery(e.target.value)}></input>

        <span className="search-bar__number-of-results"
          onClick={(e) => e.stopPropagation()}>
          {100}
          {` `}
          {t('search_bar.matches')}
        </span>
      </span>

      <SearchResults
        query={query}
      />
    </div>
  );
};
