import './MobileTitleBar.scss';
import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from 'src/redux/store';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import HomeIcon from "src/assets/images/HomeIcon.svg";

export const MobileTitleBar: React.FC<IMobileTitleBar> = ({
  translateCode,
  isShowingSideMenu,
  callbackSetIsShowingSideMenu,
}) => {
  const {
    currentLanguage
  } = useSelector(
    (state: RootState) => state.languageSlice,
  );
  const {
    isLoggedIn,
    user
  } = useSelector(
    (state: RootState) => state.authSlice,
  );

  const dispatch = useAppDispatch();
  const { t, i18n } = useTranslation();
  const history = useHistory();

  return (
    <div
      role="div"
      aria-label="mobile-title-bar"
      className={`mobile-title-bar `}
    >
      <div className={`p-4 mobile-title-bar__item--small flex-center`}
        onClick={() => history.push("/home", { isRedirect: true })}
      >
        <img src={HomeIcon}></img>
      </div>

      <div className={`mobile-title-bar__item--large flex-center`}>
        <h1 className="mobile-title-bar__page-title">
          {
            t(`title_bar.pages.${translateCode || "default"}`).split(" ").map((word, index) => {
              return <h1
                key={`word-${index}`}
                role={"h1"}
                aria-label={`word-${index}`}
                className={`${index === 0 ? "title-bar__page-title--bg" : ""}`}>{index !== 0 && " "} {word}</h1>
            })
          }
        </h1>
      </div>

      <div className={`mobile-title-bar__item--small flex-center`}
        onClick={() => {
          callbackSetIsShowingSideMenu(!isShowingSideMenu)
        }}
      >
        <FontAwesomeIcon className="menu-bar__menu--icon-hamburger" icon={faBars} />
      </div>
    </div>
  );
};
