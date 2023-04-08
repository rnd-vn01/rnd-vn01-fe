import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  sendEmailVerification,
  onAuthStateChanged
} from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBhh-rxBo5DHXynUM5H45pTtGxni-um2QA",
  authDomain: "acupuncture-3d-vn01.firebaseapp.com",
  projectId: "acupuncture-3d-vn01",
  storageBucket: "acupuncture-3d-vn01.appspot.com",
  messagingSenderId: "704168149305",
  appId: "1:704168149305:web:881bbf7518e706ebdd68e8"
};

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal);

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('email');

const logInWithEmailAndPassword = async (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

const sendPasswordReset = async (email: string) => {
  await sendPasswordResetEmail(auth, email);
};

const logout = () => {
  signOut(auth);
};

const storage = getStorage(app);

export {
  auth,
  logInWithEmailAndPassword,
  sendPasswordReset,
  logout,
  onAuthStateChanged,
  storage,
  googleProvider
};
