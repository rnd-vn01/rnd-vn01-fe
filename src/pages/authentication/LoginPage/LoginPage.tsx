import './LoginPage.scss'
import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { signInWithGoogle, logInWithEmailAndPassword, registerWithEmailAndPassword, logout, onAuthStateChanged, auth, googleProvider } from 'src/configs/firebase';
import { useHistory } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';

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

export const LoginPage: React.FC = () => {
  document.title = `${APP_NAME} | Login`

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  const MySwal = withReactContent(Swal);
  const history = useHistory();
  const dispatch = useAppDispatch();

  // Override Material UI class
  const style = {
    "& label.Mui-focused": {
      color: "#93895E"
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#93895E"
    },
  }

  // Hooks
  useEffect(() => {
    logout();
    dispatch(resetToInitialStateAuthSlice())
  }, []);

  // Functions
  const validateLogin = async () => {
    setEmailError("");
    setPasswordError("");

    if (!validateEmail(email)) {
      setEmailError("Email is not valid!");
      return;
    }

    if (password.length < 6) {
      setPasswordError("Password is not valid!");
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

    await logInWithEmailAndPassword(email, password)
      .then(async (result: any) => {
        MySwal.close();

        if (!result.user?.emailVerified) {
          MySwal.fire({
            icon: 'error',
            title: 'Error...',
            text: 'Please verify your account through email!',
          })
            .then(() => {
              logout();
              dispatch(resetToInitialStateAuthSlice())
              return;
            })
        } else {
          // Valid login
          const user = result.user;
          dispatch(setStateAuth({
            isLoggedIn: true,
            user: {
              email: user.email,
              profileImage: "https://firebasestorage.googleapis.com/v0/b/cs204finalproj.appspot.com/o/istockphoto-1223671392-612x612.jpg?alt=media&token=e9312c19-c34e-4a87-9a72-552532766cde",
              firebaseId: user.uid
            }
          }))
          history.push("/")
        }
      })
      .catch((error: any) => {
        MySwal.close();

        if (error.code === "auth/user-not-found") {
          setEmailError("Your login information is not correct!")
          MySwal.fire({
            icon: 'error',
            title: 'Error...',
            text: 'Your login information is not correct!',
          })
          return;
        }

        if (error.code === "auth/invalid-email") {
          setEmailError("Your email is invalid!");
          MySwal.fire({
            icon: 'error',
            title: 'Error...',
            text: 'Your email is invalid!',
          })
          return;
        }
        if (error.code === "auth/wrong-password") {
          setPasswordError("Your password is not correct!");
          MySwal.fire({
            icon: 'error',
            title: 'Error...',
            text: 'Your password is not correct!',
          })
          return;
        }

        MySwal.fire({
          icon: 'error',
          title: 'Error...',
          text: error.message,
        })
        return;
      });
  }

  const signInWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const user = res.user as any;

      dispatch(setStateAuth({
        isLoggedIn: true,
        user: {
          name: user.displayName,
          email: user?.reloadUserInfo?.providerUserInfo?.[0].email,
          profileImage: user?.reloadUserInfo?.providerUserInfo?.[0].photoUrl,
          firebaseId: user.uid
        }
      }))

      history.push("/")
    } catch (err: any) {
      MySwal.fire({
        icon: 'error',
        title: 'Error...',
        text: err.message,
      })
    }
  }

  return (
    <div
      role="div"
      aria-label="login-page"
      className="login-page grid grid-cols-5">
      <div className="login-page__section login-page__section--main col-span-2 flex-center">
        <img className="login-page__image--logo" src={Logo}></img>

        <h1 className="login-page__title">Log in</h1>

        <div className="login-page__subtitle">
          don't have an account? <a href="/signup">click here</a>
        </div>

        <TextField
          className="login-page__input login-page__input--email"
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

        <TextField
          className="login-page__input login-page__input--password"
          name="password"
          label="Password"
          margin="normal"
          variant="standard"
          sx={style}
          value={password}
          onChange={(e: any) => setPassword(e.target.value)}
          type="password"
          fullWidth
          error={passwordError !== ""}
          helperText={passwordError} />

        <Button
          theme="filled"
          caption="Login"
          name="login"
          onClick={() => {
            validateLogin();
          }}
        />

        <Button
          theme="blank"
          logo={GoogleLogo}
          caption="Sign in with Google"
          name="login"
          onClick={signInWithGoogle}
        />
      </div>

      <div className="login-page__section login-page__section--image col-span-3">
        <img className="login-page__image--demo" src={DemoImage}></img>
      </div>
    </div>
  );
};
