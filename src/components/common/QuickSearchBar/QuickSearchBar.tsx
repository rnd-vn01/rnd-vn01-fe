import './QuickSearchBar.scss';
import React, { useState, useRef, useEffect } from "react";
import SearchIconGray from "src/assets/images/SearchIconGray.svg"
import SearchIconBlack from "src/assets/images/SearchIconBlack.svg"
import AdvancedSearchIcon from "src/assets/images/AdvancedSearchIcon.svg"
import { useHistory } from 'react-router-dom';
import { QuickSearchResults } from './QuickSearchResults/QuickSearchResults';
import { useAppDispatch } from 'src/redux/store';
import { setShowingQuickInformation } from 'src/redux/slice';

export const QuickSearchBar: React.FC = ({ }) => {
  const inputBoxRef = useRef()
  const history = useHistory();
  const dispatch = useAppDispatch();

  const [usingQuickSearchIconImage, setUsingQuickSearchIconImage] = useState<any>(SearchIconGray)
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    dispatch(setShowingQuickInformation({
      quickInformation: null
    }))
  }, [query]);

  return (
    <div
      role="div"
      aria-label="quick-search"
      className="quick-search"
      onClick={() => {
        (inputBoxRef.current as HTMLInputElement)?.focus()
      }}>

      <img
        role="img"
        aria-label="quick-search-icon"
        src={usingQuickSearchIconImage}
        className="quick-search__logo--search"></img>

      <input
        ref={inputBoxRef}
        className="quick-search__input"
        onFocus={() => setUsingQuickSearchIconImage(SearchIconBlack)}
        onBlur={() => setUsingQuickSearchIconImage(SearchIconGray)}
        value={query}
        onChange={e => setQuery(e.target.value)}
        role="input"
        aria-label="quick-search-input"></input>

      <QuickSearchResults
        query={query}
      />
    </div>
  );
};
