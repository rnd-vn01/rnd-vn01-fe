import './AuthBar.scss';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import Logo from "src/assets/images/Logo.svg";
import { logout } from 'src/configs/firebase';
import { resetToInitialStateAuthSlice } from 'src/redux/slice';

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

  const MENU_ITEMS = [
    {
      item: "User Records",
      onClick: () => {
        history.push("/records")
      },
      selectable: true
    },
    {
      item: "Data Management",
      onClick: () => {
        history.push("/data")
      },
      selectable: user && user?.isAdmin
    },
    {
      item: "Log Out",
      onClick: () => {
        logout();
        dispatch(resetToInitialStateAuthSlice());
        history.push("/")
      },
      selectable: true
    }
  ]

  return (
    <div
      role="div"
      aria-label="auth-bar"
      className="auth-bar">
      {!isLoggedIn ?
        <div className="grid grid-cols-2 auth-bar__not-logged-in w-full h-full">
          <div
            className="auth-bar__option flex items-center justify-center col-span-1"
            onClick={() => history.push("/signup")}>
            Sign Up
          </div>

          <div
            className="auth-bar__option flex items-center justify-center col-span-1"
            onClick={() => history.push("/login")}>
            Log In
          </div>
        </div> :
        <div className="auth-bar__logged-in w-full h-full inline-flex items-center justify-end">
          <span className="auth-bar__menu pr-2">
            <p className="auth-bar__menu--name inline-block">{user?.name}</p>
            <div
              className="auth-bar__menu--button-logo inline-flex w-fit h-full flex-center"
              onClick={() => setIsOpenDropdown(!isOpenDropdown)}>
              <img src={Logo} className="auth-bar__menu--image-logo"></img>
            </div>
          </span>

          <div className={`auth-bar__dropdown w-fit h-fit flex flex-col items-end justify-center
          p-1 ${!isOpenDropdown && "auth-bar__dropdown--hide"}`}>
            {MENU_ITEMS.map((item, index) => {
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
            })}
          </div>
        </div>}

    </div>
  );
};
