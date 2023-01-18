import './CreateAccountPage.scss'
import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { signInWithGoogle, logInWithEmailAndPassword, registerWithEmailAndPassword, logout, onAuthStateChanged, auth, googleProvider } from 'src/configs/firebase';
import { useHistory } from 'react-router-dom';
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithPopup } from 'firebase/auth';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';

import { Button } from 'src/components/common';
import DemoImage from "src/assets/images/Demo.png";
import Logo from "src/assets/images/Logo.svg";
import GoogleLogo from "src/assets/images/GoogleLogo.svg";
import { APP_NAME } from 'src/configs/constants';
import { validateEmail } from 'src/helpers/validate';
import { useAppDispatch } from 'src/redux/store';
import { resetToInitialStateAuthSlice, setStateAuth } from 'src/redux/slice';

export const CreateAccountPage: React.FC = () => {
  document.title = `${APP_NAME} | Sign up`

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [nameError, setNameError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");

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
  const validateAndRegister = async () => {
    setNameError("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");

    if (name.length === 0) {
      setNameError("Please fill in your name!");
      return;
    }

    if (!validateEmail(email)) {
      setEmailError("Email is not valid!");
      return;
    }

    if (password.length < 6) {
      setPasswordError("Password is not valid!");
      return;
    }

    if (confirmPassword.length < 6) {
      setConfirmPasswordError("Invalid confirmation");
      return;
    }

    if (confirmPassword !== password) {
      setConfirmPasswordError("Invalid confirmation");
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

    await createUserWithEmailAndPassword(auth, email, password)
      .then((user: any) => {
        if (auth.currentUser) {
          sendEmailVerification(auth.currentUser)
            .then((result: any) => {
              MySwal.close();

              MySwal.fire({
                icon: 'success',
                title: 'Success...',
                text: 'Your account is created! Please check your email to verify your account!',
              })
                .then(() => {
                  logout();
                  dispatch(resetToInitialStateAuthSlice())
                  history.push("/");
                  return;
                })
            })
            .catch((err: any) => {
              MySwal.fire({
                icon: 'error',
                title: 'Error...',
                text: err.message,
              })
            });
        }
      })
      .catch((error: any) => {
        MySwal.close();

        if (error.code == "auth/missing-email") {
          setEmailError("Please type in your email!");

          MySwal.fire({
            icon: 'error',
            title: 'Error...',
            text: 'Please type in your email!',
          })

          return;
        }
        if (error.code == "auth/invalid-email") {
          setEmailError("Your email is invalid!");

          MySwal.fire({
            icon: 'error',
            title: 'Error...',
            text: 'Your email is invalid!',
          })

          return;
        }
        if (error.code == "auth/email-already-in-use") {
          setEmailError("Email is already in use!");

          MySwal.fire({
            icon: 'error',
            title: 'Error...',
            text: 'Email is already in use!',
          })

        }

        MySwal.fire({
          icon: 'error',
          title: 'Error...',
          text: error.message,
        })
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
          email: user.email,
          profileImage: user.photoURL,
          firebaseId: user.uid,
          isAdmin: true,
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
      aria-label="create-account-page"
      className="create-account-page grid grid-cols-5">
      <div className="create-account-page__section create-account-page__section--main col-span-2 flex-center">
        <img className="create-account-page__image--logo" src={Logo}></img>

        <h1 className="create-account-page__title">Create an Account</h1>

        <div className="create-account-page__subtitle">
          already have an account? <a href="/login">click here</a>
        </div>

        <TextField
          className="create-account-page__input create-account-page__input--name"
          name="name"
          label="Name"
          margin="normal"
          variant="standard"
          sx={style}
          value={name}
          onChange={(e: any) => setName(e.target.value)}
          type="text"
          fullWidth
          error={nameError !== ""}
          helperText={nameError} />

        <TextField
          className="create-account-page__input create-account-page__input--email"
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

        <div className="grid grid-cols-2 w-full gap-x-2">
          <div className="col-span-1">
            <TextField
              className="create-account-page__input create-account-page__input--password"
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
          </div>

          <div className="col-span-1">
            <TextField
              className="create-account-page__input create-account-page__input--confirm-password"
              name="confirm-password"
              label="Confirm Password"
              margin="normal"
              variant="standard"
              sx={style}
              value={confirmPassword}
              onChange={(e: any) => setConfirmPassword(e.target.value)}
              type="password"
              fullWidth
              error={confirmPasswordError !== ""}
              helperText={confirmPasswordError} />
          </div>
        </div>

        <Button
          theme="filled"
          caption="Create account"
          name="create-account"
          onClick={() => {
            validateAndRegister();
          }}
        />

        <Button
          theme="blank"
          logo={GoogleLogo}
          caption="Sign up with Google"
          name="login"
          onClick={signInWithGoogle}
        />
      </div>

      <div className="create-account-page__section create-account-page__section--image col-span-3">
        <img className="create-account-page__image--demo" src={DemoImage}></img>
      </div>
    </div >
  );
};
