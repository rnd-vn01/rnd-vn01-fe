import './SearchResultItem.scss';
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { capitalizeAndMapInformationField } from 'src/helpers/capitalize';
import { useHistory } from 'react-router-dom';
import Highlighter from "react-highlight-words";

export const SearchResultItem: React.FC<ISearchResultItem> = ({
  item,
  isPoint,
  usingLanguage,
  query
}) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const history = useHistory();

  useEffect(() => {
    if (isCollapsed) {
      var growDiv = document.querySelector('.search-result__information') as HTMLElement;
      if (growDiv.clientHeight) {
        growDiv.style.height = "0px";
        growDiv.style.overflow = "hidden";
      } else {
        growDiv.style.height = growDiv.scrollHeight + "px";
        growDiv.style.overflow = "auto";
      }
    }
  }, [isCollapsed])

  return (
    <div
      role="div"
      aria-label="search-result"
      className={`search-result`}
    >
      <div
        className="search-result__header"
        onClick={(e) => { setIsCollapsed(!isCollapsed) }}>
        <div className="search-result__flex-block flex justify-between">
          <h1 className="search-result__header--code">
            <Highlighter
              highlightClassName='search-result__highlighted'
              searchWords={query || []}
              autoEscape={true}
              textToHighlight={item?.code}
            >
            </Highlighter>
          </h1>
          <h1 className="search-result__header--name">
            <Highlighter
              highlightClassName='search-result__highlighted'
              searchWords={query || []}
              autoEscape={true}
              textToHighlight={item?.name}
            >
            </Highlighter>
          </h1>
        </div>

        <FontAwesomeIcon
          className="search-result__header--view"
          icon={faChevronRight}
          onClick={(e) => {
            e.stopPropagation();
            history.push(`/detail/${isPoint ? "point" : "meridian"}/${item.code}`)
          }}></FontAwesomeIcon>
      </div>

      {isCollapsed && item &&
        <div className="search-result__information">
          {Object.keys(item).map((field, index) => {
            if (field !== "name" && field !== "code") {
              return (
                <div key={`point-information-${index}`}>
                  <div
                    className={`search-result__category ${field === "caution" ? "search-result__category--caution" : ""}`}>
                    <Highlighter
                      highlightClassName='search-result__highlighted'
                      searchWords={query || []}
                      autoEscape={true}
                      textToHighlight={capitalizeAndMapInformationField(isPoint, field, usingLanguage)}
                    >
                    </Highlighter>
                  </div>
                  <div className="search-result__info">
                    {isPoint && field === "functionalities" ?
                      <div className="pb-2 pt-1">
                        {item[field].map((functionality, itemIndex) =>
                        (
                          <p
                            key={`point-functionality-${itemIndex}`}
                          >
                            <Highlighter
                              highlightClassName='search-result__highlighted'
                              searchWords={query || []}
                              autoEscape={true}
                              textToHighlight={`${itemIndex + 1}. ${functionality}`}
                            >
                            </Highlighter>
                          </p>
                        ))}
                      </div>
                      : <>
                        {
                          !isPoint && field === "points" ?
                            <div className="pb-2 pt-1">
                              {item[field].map((point, itemIndex) =>
                              (
                                <p
                                  key={`meridian-points-${itemIndex}`}
                                >
                                  <Highlighter
                                    highlightClassName='search-result__highlighted'
                                    searchWords={query || []}
                                    autoEscape={true}
                                    textToHighlight={`${point.code.toUpperCase()} - ${point.name}`}
                                  >
                                  </Highlighter>
                                </p>
                              ))}
                            </div>
                            :
                            <p className={`search-result__info--text pb-2 pt-1
                          ${field === "caution" ? "search-result__info--text-caution" : ""}`}>
                              <Highlighter
                                highlightClassName='search-result__highlighted'
                                searchWords={query || []}
                                autoEscape={true}
                                textToHighlight={item[field]}
                              >
                              </Highlighter>
                            </p>
                        }
                      </>
                    }
                  </div>
                </div>
              )
            }
          })}
        </div>}
    </div>
  );
};