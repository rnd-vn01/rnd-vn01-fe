import './ChangePasswordPage.scss'
import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { sendPasswordReset, auth } from 'src/configs/firebase';
import { useHistory, useLocation } from 'react-router-dom';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';

import { Button } from 'src/components/common';

// Assets
import DemoImage from "src/assets/images/Demo.png";
import Logo from "src/assets/images/Logo.svg";
import GoogleLogo from "src/assets/images/GoogleLogo.svg";
import { APP_NAME } from 'src/configs/constants';
import { validateEmail } from 'src/helpers/validate';
import { resetToInitialStateAuthSlice, setStateAuth } from 'src/redux/slice';
import { useAppDispatch } from 'src/redux/store';
import { useTranslation } from "react-i18next";

export const ChangePasswordPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");

  const MySwal = withReactContent(Swal);
  const history = useHistory();
  const dispatch = useAppDispatch();
  const location = useLocation() as any;
  const { t, i18n } = useTranslation();

  document.title = `${APP_NAME} | ${t('password_reset_page.title')}`

  // Override Material UI class
  const style = {
    "& label.Mui-focused": {
      color: "#93895E"
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#93895E"
    },
  }

  // Functions
  const validate = async () => {
    setEmailError("");

    if (!validateEmail(email)) {
      setEmailError(t('login_page.messages.invalid_email'));
      return;
    }

    MySwal.fire({
      didOpen: () => {
        MySwal.showLoading(null);
      },
      didClose: () => {
        MySwal.hideLoading();
      },
      allowOutsideClick: false,
    })

    await sendPasswordReset(email)
      .then(async (result: any) => {
        MySwal.close();

        MySwal.fire({
          icon: 'success',
          title: 'Success...',
          text: t('password_reset_page.messages.reset_email_sent'),
        })
          .then(() => {
            history.push("/");
            return;
          })
      })
      .catch((error: any) => {
        MySwal.close();

        if (error.code === "auth/user-not-found") {
          setEmailError(t('login_page.messages.not_found'))
          MySwal.fire({
            icon: 'error',
            title: t('error'),
            text: t('login_page.messages.not_found'),
          })
          return;
        }

        MySwal.fire({
          icon: 'error',
          title: t('error'),
          text: error.message,
        })
        return;
      });
  }

  return (
    <div
      role="div"
      aria-label="password-reset-page"
      className="password-reset-page grid grid-cols-5">
      <div className="password-reset-page__section password-reset-page__section--main col-span-2 flex-center">
        <img className="password-reset-page__image--logo" src={Logo}
          onClick={() => history.push("/")}></img>

        <h1 className="password-reset-page__title">{t('password_reset_page.title')}</h1>

        <div className="password-reset-page__subtitle">
          {t('password_reset_page.login')} <a href="/signup">{t('login_page.click_here')}</a>
        </div>

        <TextField
          className="password-reset-page__input password-reset-page__input--email"
          name="email"
          label="Email"
          margin="normal"
          variant="standard"
          sx={style}
          value={email}
          onChange={(e: any) => setEmail(e.target.value)}
          type="email"
          fullWidth
          error={emailError !== ""}
          helperText={emailError} />


        <Button
          theme="filled"
          caption={t('password_reset_page.button_captions.reset_password')}
          name="login"
          onClick={() => {
            validate();
          }}
        />
      </div>

      <div className="password-reset-page__section password-reset-page__section--image col-span-3">
        <img className="password-reset-page__image--demo" src={DemoImage}></img>
      </div>
    </div>
  );
};
