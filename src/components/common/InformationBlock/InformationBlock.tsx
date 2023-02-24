import './InformationBlock.scss';
import React from 'react';
import { capitalize, capitalizeAndMapInformationField, capitalizeEachWord } from 'src/helpers/capitalize';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';


export const InformationBlock: React.FC<IInformationBlock> = ({ isPoint, itemInformation, usingLanguage }) => {
  const history = useHistory();
  const { t } = useTranslation();

  return (
    <div
      role="div"
      aria-label="information-block"
      className="information-block">
      {itemInformation &&
        <>
          <div className="information-block__title flex flex-col items-center justify-center">
            <span className="px-2">
              <h1 className="information-block__title--code">{itemInformation.code.toUpperCase()}</h1>
              <h1 className="information-block__title--name">{capitalizeEachWord(itemInformation.name)}</h1>
            </span>
          </div>

          <div
            className={`information-block__view-details flex justify-between`}
            onClick={() => {
              history.push(`/detail/${isPoint ? "point" : "meridian"}/${itemInformation.code}`)
            }}
          >
            <span>
              {t('view_details')}
            </span>

            <div className='inline-flex items-center justify-center' style={{ transform: "rotate(45deg)" }}>
              <FontAwesomeIcon icon={faArrowUp} />
            </div>
          </div>

          {Object.keys(itemInformation).map((field, index) => {
            if (field === "description") {
              return (
                <div key={`point-information-${index}`}>
                  <div
                    className={`information-block__category`}>
                    {capitalizeAndMapInformationField(isPoint, field, usingLanguage)}
                  </div>
                  <div className="information-block__info">
                    <p className={`information-block__info--text p-2`}>
                      {itemInformation[field]}
                    </p>
                  </div>
                </div>
              )
            }
          })}
        </>}
    </div>
  );
};
