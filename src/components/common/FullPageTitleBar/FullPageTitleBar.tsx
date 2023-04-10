import './FullPageTitleBar.scss';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import Logo from "src/assets/images/Logo.svg";
import { logout } from 'src/configs/firebase';
import { resetToInitialStateAuthSlice } from 'src/redux/slice';
import { useTranslation } from "react-i18next";

export const FullPageTitleBar: React.FC<IFullPageTitleBar> = ({
  translateCode
}) => {
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
      item: t('auth_bar.menu.home'),
      onClick: () => {
        history.push("/", { isRedirect: true })
      },
      selectable: true,
      divider: true,
      code: "home"
    },
    {
      item: t('auth_bar.menu.data_management'),
      onClick: () => {
        history.push("/data")
      },
      selectable: user && user?.isAdmin,
      divider: false,
      code: "data_management"
    },
    {
      item: t('auth_bar.menu.advanced_search'),
      onClick: () => {
        history.push("/advanced-search")
      },
      selectable: true,
      divider: true,
      code: "advanced_search"
    },
    {
      item: t('auth_bar.menu.start_quiz'),
      onClick: () => {
        history.push("/quiz")
      },
      selectable: user,
      divider: false,
      code: "quiz"
    },
    {
      item: t('auth_bar.menu.personal_records'),
      onClick: () => {
        history.push("/records")
      },
      selectable: true,
      divider: true,
      code: "personal_records"
    },
    {
      item: t('auth_bar.menu.manual'),
      onClick: () => {
        history.push("/manual")
      },
      selectable: true,
      divider: false,
      code: "manual"
    },
    {
      item: t('auth_bar.menu.about_us'),
      onClick: () => {
        history.push("/about")
      },
      selectable: true,
      divider: true,
      code: "about_us"
    },
    {
      item: t('auth_bar.menu.edit_profile'),
      onClick: () => {
        history.push("/edit-profile")
      },
      selectable: user,
      divider: false,
      code: "edit_profile"
    },
    {
      item: t('auth_bar.menu.log_out'),
      onClick: () => {
        history.push("/", { isRedirect: true })
        logout();
        dispatch(resetToInitialStateAuthSlice());
      },
      selectable: true,
      divider: false,
      code: "log_out"
    }
  ]

  const GUEST_MENU_ITEMS = [
    {
      item: t('auth_bar.menu.home'),
      onClick: () => {
        localStorage.removeItem("accessToken")
        history.push("/", { isRedirect: true })
      },
      selectable: true,
      divider: true,
      code: "home"
    },
    {
      item: t('auth_bar.sign_up'),
      onClick: () => {
        history.push("/signup")
      },
      selectable: true,
      divider: false,
      code: "sign_up"
    },
    {
      item: t('auth_bar.log_in'),
      onClick: () => {
        history.push("/login")
      },
      selectable: true,
      divider: true,
      code: "log_in"
    },
    {
      item: t('auth_bar.menu.advanced_search'),
      onClick: () => {
        history.push("/advanced-search")
      },
      selectable: true,
      divider: true,
      code: "advanced_search"
    },
    {
      item: t('auth_bar.menu.manual'),
      onClick: () => {
        history.push("/manual")
      },
      selectable: true,
      divider: false,
      code: "manual"
    },
    {
      item: t('auth_bar.menu.about_us'),
      onClick: () => {
        history.push("/about")
      },
      selectable: true,
      divider: false,
      code: "about_us"
    },
  ]

  return (
    <div
      role="div"
      aria-label="title-bar"
      className="title-bar">
      <span className="title-bar__menu">
        <div
          role="div"
          aria-label="title-bar-logo"
          className="title-bar__menu--button-logo inline-flex w-fit h-full flex-center"
          onClick={() => setIsOpenDropdown(!isOpenDropdown)}>
          <img src={isLoggedIn ? user.profileImage : Logo} className="title-bar__menu--image-logo"></img>
        </div>
      </span>

      <div className="w-full h-full inline-flex items-center justify-end">
        <h1 className="title-bar__page-title">
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


        <div
          role="div"
          aria-label="title-bar-dropdown"
          className={`title-bar__dropdown w-fit h-fit flex flex-col items-end justify-center
                p-1 ${!isOpenDropdown && "title-bar__dropdown--hide"}`}>
          {isLoggedIn ? MENU_ITEMS.map((item, index) => {
            if (item.selectable) {
              return (
                <div
                  className='w-full'
                  role="menu-item"
                  aria-label={`menu-item-${item.item}`}
                  key={`menu-${index}`}>
                  <div
                    className={`title-bar__dropdown--item w-fit
                    ${item.code === translateCode ? "title-bar__dropdown--selected-item" : ""}`}
                    role="menu-item-dropdown"
                    aria-label={`menu-item-dropdown-${item.item}`}
                    onClick={item.onClick}>
                    {item.item}
                  </div>
                  {item.divider && <hr className='title-bar__dropdown--divider w-100' />}
                </div>
              )
            }
          }) :
            GUEST_MENU_ITEMS.map((item, index) => {
              return (
                <div
                  className='w-full'
                  role="menu-item"
                  aria-label={`menu-item-${item.item}`}
                  key={`menu-${index}`}>
                  <div
                    className={`title-bar__dropdown--item w-fit
                    ${item.code === translateCode ? "title-bar__dropdown--selected-item" : ""}`}
                    role="menu-item-dropdown"
                    aria-label={`menu-item-dropdown-${item.item}`}
                    onClick={item.onClick}>
                    {item.item}
                  </div>
                  {item.divider && <hr className='title-bar__dropdown--divider w-100' />}
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  );
};
