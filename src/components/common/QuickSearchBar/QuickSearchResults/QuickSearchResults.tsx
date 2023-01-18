import './QuickSearchResults.scss';
import React, { useState, useCallback, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { capitalize } from 'src/helpers/capitalize';
import { debounce } from "lodash"

export const QuickSearchResults: React.FC<IQuickSearchResults> = ({ query }) => {
  const history = useHistory();
  const EXAMPLE_RESULT = {
    meridians: [{
      name: "LU",
      url: "/item/meridian/5"
    }, {
      name: "LI",
      url: "/item/meridian/3"
    }],
    points: [{
      name: "Yintang",
      url: "/item/point/5"
    }, {
      name: "Shaoyin",
      url: "/item/point/4"
    }]
  }

  const [isLoading, setIsLoading] = useState<any>(false)
  const [results, setResults] = useState<any>({})

  const fetchResults = (query: string) => {
    setResults(EXAMPLE_RESULT);
    setIsLoading(false);
  }

  const debounceFetchResult = useCallback(
    debounce((newQuery) => fetchResults(newQuery), 500), []);

  useEffect(() => {
    if (query !== "") {
      setIsLoading(true);
      debounceFetchResult(query)
    } else {
      setResults({});
      setIsLoading(false);
    }
  }, [query]);

  return (
    <div
      role="div"
      aria-label="quick-search-results"
      className={`quick-search-results w-full 
      ${!isLoading && Object.keys(results).length > 0 ? "quick-search-results--showing" : ""}`}
      onClick={(e) => e.stopPropagation()}
    >
      {!isLoading && Object.keys(results).length > 0 &&
        Object.keys(results).map((category: any, index: number) => {
          if (results[category].length > 0) {
            return (
              <div
                className={`quick-search-results__block`}
                key={`quick-search-category-${index}`}
              >
                <div className="quick-search-results__block--category">
                  {capitalize(category)}
                </div>
                {results[category].map((item: any, subIndex: number) => (
                  <div
                    className="quick-search-results__item"
                    onClick={() => history.push(item.url)}
                    key={`quick-search-result-item-${index}-${subIndex}`}>
                    <span>{capitalize(item.name)}</span>
                  </div>
                ))}
              </div>
            )
          }
        })
      }
    </div>
  );
};
