import './MenuBar.scss';
import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import IconAdmin from 'src/assets/images/IconAdmin.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSearch } from '@fortawesome/free-solid-svg-icons';
import Logo from "src/assets/images/Logo.svg";
import IconShow from "src/assets/images/IconShow.svg";
import IconHide from "src/assets/images/IconHide.svg";
import { MeridianControl, ModelViewModeControl } from 'src/components/common/HomePageControl';

export const MenuBar: React.FC<IMenuBar> = ({
  isShowingSideMenu,
  callbackSetIsShowingSideMenu
}) => {
  const {
    isLoggedIn,
    user
  } = useSelector(
    (state: RootState) => state.authSlice,
  );

  const [isShowing, setIsShowing] = useState<boolean>(true);

  useEffect(() => {
    if (!isShowing) {
      callbackSetIsShowingSideMenu(false);
    }
  }, [isShowing])

  return (
    <div
      role="div"
      aria-label="menu-bar"
      className={`menu-bar ${!isShowing && "menu-bar--hidden"}`}
    >
      <div className={`${!isShowingSideMenu && "p-5"} menu-bar__item 
      ${isShowingSideMenu && isShowing && "menu-bar__item--no-wrap"}
      ${!isShowing && "menu-bar__item--faded"}`}
        onClick={() => setIsShowing(!isShowing)}
      >
        {!isShowingSideMenu && <img src={isShowing ? IconShow : IconHide} className={`menu-bar__logo-show-quick-info
          ${!isShowing && `menu-bar__logo-show-quick-info--faded`}
        `}></img>}
      </div>

      <div className={`menu-bar__item ${isShowingSideMenu && "menu-bar__item--no-wrap"}
      ${!isShowing && "menu-bar__item--hidden"}`}>
        {!isShowingSideMenu && <ModelViewModeControl />}
      </div>

      <div className={`menu-bar__item ${isShowingSideMenu && "menu-bar__item--no-wrap"}
      ${!isShowing && "menu-bar__item--hidden"}`}>
        {!isShowingSideMenu && <MeridianControl />}
      </div>

      <div className={`menu-bar__item ${isShowingSideMenu && "menu-bar__item--no-wrap"}
      ${!isShowing && "menu-bar__item--hidden"}`}>
        {!isShowingSideMenu &&
          <div className='w-full h-full flex-center'>
            <FontAwesomeIcon className="menu-bar__menu--icon-search" icon={faSearch} />
          </div>
        }
      </div>

      <div className={`menu-bar__item flex items-center justify-center 
      ${isShowingSideMenu && "menu-bar__item--wrap"}
      ${!isShowing && "menu-bar__item--hidden"}`}
        onClick={() => callbackSetIsShowingSideMenu(!isShowingSideMenu)}
      >
        <div className='menu-bar__logo-container'>
          {isLoggedIn ?
            <div
              className="menu-bar__menu--button-logo inline-flex w-fit h-full flex-center"
              aria-label="menu-bar-menu-button">
              <img src={Logo} className="menu-bar__menu--image-logo"></img>
              {user.isAdmin && <img src={IconAdmin} className="menu-bar__menu--icon-gear"></img>}
            </div>
            :
            <FontAwesomeIcon className="menu-bar__menu--icon-hamburger" icon={faBars} />}
        </div>
      </div>
    </div>
  );
};
