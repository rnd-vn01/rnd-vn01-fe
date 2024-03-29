import './InformationBlock.scss';
import React, { useEffect, useState } from 'react';
import { capitalizeAndMapInformationField, capitalizeEachWord } from 'src/helpers/capitalize';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import IconShow from "src/assets/images/IconShow.svg"
import IconHide from "src/assets/images/IconHide.svg"
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from 'src/redux/store';
import { useMediaQuery } from 'react-responsive';
import { setBackFromInformationBlock, setViewDetailsPersistLastPage } from 'src/redux/slice';
import { REFLECTIVE_MERIDIANS } from 'src/configs/constants';

export const InformationBlock: React.FC<IInformationBlock> = ({ isPoint, itemInformation, usingLanguage }) => {
  const history = useHistory();
  const { t } = useTranslation();
  const [isShowing, setIsShowing] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const isDesktop = useMediaQuery({ query: '(min-width: 1080px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

  const {
    isShowingQuickInformation,
    loadingQuickInformation
  } = useSelector(
    (state: RootState) => state.selectionSlice,
  );

  const {
    quickSearchPersistQuery,
  } = useSelector(
    (state: RootState) => state.navigationSlice,
  );

  useEffect(() => {
    if (isShowingQuickInformation) {
      setIsShowing(true)
    } else {
      setIsShowing(false)
    }
  }, [isShowingQuickInformation])

  useEffect(() => {
    if (loadingQuickInformation) {
      setIsShowing(true);
    }
  }, [loadingQuickInformation])

  return (
    <div
      role="div"
      aria-label="information-block"
      className="information-block">

      {loadingQuickInformation ?
        <div className='flex-center p-4 pt-2'>
          <svg aria-hidden="true" className="w-10 h-10 mt-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
          </svg>
          <span className="sr-only">Loading...</span>
        </div> : <>
          {(isDesktop || isMobile) ?
            <>
              {isShowingQuickInformation && <div
                className={`information-block__menu--button-logo inline-flex w-fit h-full flex-center
          ${!isShowing && `information-block__menu--faded`}
        `}
                onClick={(e) => {
                  e.stopPropagation()
                  setIsShowing(!isShowing)
                }}
                role="div"
                aria-label="information-block-hide-icon"
              >
                <img src={isShowing ? IconShow : IconHide} className="information-block__menu--image-logo"></img>
              </div>}

              {itemInformation && isShowing &&
                <>
                  <div className="information-block__title flex flex-col items-center justify-center"
                    data-testid={"information-block-title"}>
                    <span className="px-2 text-center">
                      <h1 className="information-block__title--code">{itemInformation.code}</h1>
                      <h1 className="information-block__title--name">{capitalizeEachWord(itemInformation.name)}</h1>
                    </span>

                    {isDesktop && quickSearchPersistQuery !== "" &&
                      <FontAwesomeIcon icon={faChevronLeft}
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch(setBackFromInformationBlock(true));
                        }}
                        role="icon"
                        aria-label="icon-back"
                        data-testid="icon-back"
                        className='information-block__title--back-icon' />
                    }
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
                            <p className={`information-block__info--text p-2 pb-0`}>
                              {itemInformation[field]}
                            </p>
                          </div>
                        </div>
                      )
                    }
                  })}

                  {
                    !isPoint && REFLECTIVE_MERIDIANS.includes(itemInformation.code) &&
                    <p className={`information-block__info--text-caution p-2 mt-3 pb-0 text-center`}>
                      {t("reflective")}
                    </p>
                  }

                  <div
                    className={`information-block__view-details flex justify-between`}
                    role="div"
                    aria-label="information-block-view-details"
                    onClick={() => {
                      history.push(`/detail/${isPoint ? "point" : "meridian"}/${itemInformation.code}`)
                      dispatch(setViewDetailsPersistLastPage({
                        path: `/?type=${isPoint ? "point" : "line"}&code=${itemInformation.code}`,
                        isRedirect: true,
                        query: quickSearchPersistQuery,
                        filterOptions: {}
                      }));
                    }}
                  >
                    <span>
                      {t('view_details')}
                    </span>

                    <div className='inline-flex items-center justify-center' style={{ transform: "rotate(45deg)" }}>
                      <FontAwesomeIcon icon={faArrowUp} />
                    </div>
                  </div>
                </>}
            </> :
            <>
              {isShowingQuickInformation && <div
                className={`information-block__menu--button-logo inline-flex w-fit h-full flex-center
          ${!isShowing && `information-block__menu--faded`}
        `}
                onClick={(e) => {
                  e.stopPropagation()
                  setIsShowing(!isShowing)
                }}
                role="div"
                aria-label="information-block-hide-icon"
              >
                <img src={isShowing ? IconShow : IconHide} className="information-block__menu--image-logo"></img>
              </div>}

              {itemInformation && isShowing &&
                <div className='grid grid-cols-5'>
                  <div className='col-span-2'>
                    <div className="information-block__title flex flex-col items-center justify-center"
                      data-testid={"information-block-title"}>
                      <span className="px-2 text-center">
                        <h1 className="information-block__title--code">{itemInformation.code}</h1>
                        <h1 className="information-block__title--name">{capitalizeEachWord(itemInformation.name)}</h1>
                      </span>
                    </div>
                  </div>

                  <div className='col-span-3'>
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

                    <div
                      className={`information-block__view-details flex justify-between`}
                      role="div"
                      aria-label="information-block-view-details"
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
                  </div>
                </div>
              }
            </>}
        </>}


    </div>
  );
};
