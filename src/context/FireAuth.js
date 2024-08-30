import { initializeApp } from "firebase/app";
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getAuth,
  signInWithPopup,
  setPersistence,
  GoogleAuthProvider,
  browserSessionPersistence,
  onAuthStateChanged,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signOut,
} from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { useNavigate } from "react-router-dom";

const firebaseConfig = {
  apiKey: "AIzaSyBq_eXyohux2Hn9s3Qge52b652yDu23Mg4",
  authDomain: "eng-lightning-411714.firebaseapp.com",
  projectId: "eng-lightning-411714",
  storageBucket: "eng-lightning-411714.appspot.com",
  messagingSenderId: "823849634640",
  appId: "1:823849634640:web:34cfabf251af3a062afa55",
  measurementId: "G-3CWRGB017Z",
  databaseUrl: "https://eng-lightning-411714-default-rtdb.firebaseio.com/",
};

const FirebaseContext = createContext(null);

export const useFirebase = () => useContext(FirebaseContext);

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

const FireAuth = (props) => {
  const [confirm, setConfirm] = useState(null);
  const [user, setUser] = useState();
  const [correct, setCorrect] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, [navigate]);

  const fireSignout = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        console.log("error", error);
      });
  };

  const SigninGoogle = () => {
    return setPersistence(auth, browserSessionPersistence)
      .then(() => {
        const provider = new GoogleAuthProvider();
        // In memory persistence will be applied to the signed in Google user
        // even though the persistence was set to 'none' and a page redirect
        // occurred.
        return signInWithPopup(auth, provider);
      })
      .catch((error) => {
        // Handle Errors here.
      });
  };

  const putData = (key, data) => {
    set(ref(database, key), data);
  };

  const SigninPhone = (number, appVerifier) => {
    return signInWithPhoneNumber(auth, number, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        setConfirm(confirmationResult);
      })
      .catch((error) => {
        // Error; SMS not sent
        throw Error(error.code);
      });
  };

  const setupCaptcha = async (number) => {
    const recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
      }
    );

    try {
      await recaptchaVerifier.render().then((widgetId) => {
        window.recaptchaWidgetId = widgetId;
      });
      await SigninPhone(number, recaptchaVerifier);
    } catch (e) {
      throw Error(e);
    }
  };

  const otpLogin = async (code) => {
    try {
      await confirm.confirm(code);
      navigate("/");
    } catch (error) {
      // User couldn't sign in (bad verification code?)
      // ...
      setCorrect(false);
      // errors=error
      throw Error(error.code);
    }
  };

  return (
    <FirebaseContext.Provider
      value={{
        SigninGoogle,
        putData,
        SigninPhone,
        setupCaptcha,
        otpLogin,
        user,
        auth,
        fireSignout,
        correct,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};

export default FireAuth;
