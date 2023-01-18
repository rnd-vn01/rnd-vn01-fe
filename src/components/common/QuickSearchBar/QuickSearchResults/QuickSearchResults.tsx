import './QuickSearchResults.scss';
import React, { useState, useRef } from "react";
import { useHistory } from 'react-router-dom';
import { capitalize } from 'src/helpers/capitalize';

export const QuickSearchResults: React.FC<IQuickSearchResults> = ({ query }) => {
  const inputBoxRef = useRef()
  const history = useHistory();

  const [isLoading, setIsLoading] = useState<any>(false)
  const [results, setResults] = useState<any>({
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
  })

  return (
    <div
      role="div"
      aria-label="quick-search-results"
      className="quick-search-results w-full"
      onClick={(e) => e.stopPropagation()}
    >
      {Object.keys(results).map((category: any, index: number) => {
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
      })}
    </div>
  );
};
