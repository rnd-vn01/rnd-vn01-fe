import './AuthBar.scss';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import Logo from "src/assets/images/Logo.svg";
import { logout } from 'src/configs/firebase';
import { resetToInitialStateAuthSlice } from 'src/redux/slice';
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

export const AuthBar: React.FC = ({ }) => {
  const [isOpenDropdown, setIsOpenDropdown] = useState<boolean>(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    isLoggedIn,
    user
  } = useSelector(
    (state: RootState) => state.authSlice,
  );
  const { t, i18n } = useTranslation();

  const MENU_ITEMS = [
    {
      item: t('auth_bar.menu.personal_records'),
      onClick: () => {
        history.push("/records")
      },
      selectable: true
    },
    {
      item: t('auth_bar.menu.data_management'),
      onClick: () => {
        history.push("/data")
      },
      selectable: user && user?.isAdmin
    },
    {
      item: t('auth_bar.menu.edit_profile'),
      onClick: () => {
        history.push("/edit-profile")
      },
      selectable: user
    },
    {
      item: t('auth_bar.menu.about_us'),
      onClick: () => {
        history.push("/about")
      },
      selectable: true
    },
    {
      item: t('auth_bar.menu.log_out'),
      onClick: () => {
        logout();
        dispatch(resetToInitialStateAuthSlice());
        history.push("/", { isRedirect: true })
      },
      selectable: true
    }
  ]

  const GUEST_MENU_ITEMS = [
    {
      item: t('auth_bar.sign_up'),
      onClick: () => {
        history.push("/signup")
      },
      selectable: true
    },
    {
      item: t('auth_bar.log_in'),
      onClick: () => {
        history.push("/login")
      },
      selectable: true
    },
    {
      item: t('auth_bar.menu.about_us'),
      onClick: () => {
        history.push("/about")
      },
      selectable: true
    },
  ]

  return (
    <div
      role="div"
      aria-label="auth-bar"
      className="auth-bar">
      <div className="auth-bar__logged-in w-full h-full inline-flex items-center justify-start">
        <span className="auth-bar__menu pr-2">
          <div
            className="auth-bar__menu--button-logo inline-flex w-fit h-full flex-center"
            onClick={() => setIsOpenDropdown(!isOpenDropdown)}>
            {isLoggedIn ?
              <>
                <img src={Logo} className="auth-bar__menu--image-logo"></img>
                <FontAwesomeIcon className="auth-bar__menu--icon-gear" icon={faGear} />
              </>
              :
              <FontAwesomeIcon className="auth-bar__menu--icon" icon={faEllipsisVertical} />}
          </div>
        </span>

        <div className={`auth-bar__dropdown w-fit h-fit flex flex-col items-end justify-center
          p-1 ${!isOpenDropdown && "auth-bar__dropdown--hide"}`}>
          {isLoggedIn ? MENU_ITEMS.map((item, index) => {
            if (item.selectable) {
              return (
                <div
                  className="auth-bar__dropdown--item w-fit"
                  onClick={item.onClick}
                  key={`menu-${index}`}>
                  {item.item}
                </div>
              )
            }
          }) :
            GUEST_MENU_ITEMS.map((item, index) => {
              if (item.selectable) {
                return (
                  <div
                    className="auth-bar__dropdown--item w-fit"
                    onClick={item.onClick}
                    key={`menu-${index}`}>
                    {item.item}
                  </div>
                )
              }
            })
          }
        </div>
      </div>
    </div>
  );
};
