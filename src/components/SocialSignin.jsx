import React, { useState } from "react";
import {
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { auth, provider, provider2 } from "../Firebase/firebase.config";
import { useNavigate } from "react-router-dom";

const SocialSignin = () => {
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");

  // Google SignIn By PopUp Method 😎😎
  const googleSignIn = async (e) => {
    e.preventDefault();
    try {
      let result = await signInWithPopup(auth, provider);

      const credential = GoogleAuthProvider.credentialFromResult(result);

      const token = credential.accessToken;

      // The signed-in user info.
      const user = result.user;
      navigate("/");
      console.log(user, token);
    } catch (error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);

      console.log(errorCode, errorMessage, email, credential);
      setErrorMessage(error.message);
    }
  };

  // Google SignIn By Redirect Method 😎😎

  // Facebook SignIn PopUp 😎😎
  const facebookSignIn = async (e) => {
    e.preventDefault();
    try {
      let result = await signInWithPopup(auth, provider2);

      const credential = FacebookAuthProvider.credentialFromResult(result);

      const token = credential.accessToken;

      // The signed-in user info.
      const user = result.user;
      navigate("/");
      console.log(user, token);
    } catch (error) {
      console.log(error);
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = FacebookAuthProvider.credentialFromError(error);

      console.log(errorCode, errorMessage, email, credential);
      setErrorMessage(error.message);
    }
  };
  return (
    <div className="container my-3">
      <b>SignIn Options :</b>
      <br />
      <button
        onClick={(e) => googleSignIn(e)}
        className="btn btn-outline-danger my-1 mx-2 "
      >
        Google
      </button>
      <button
        onClick={(e) => facebookSignIn(e)}
        className="btn btn-outline-primary my-1"
      >
        Facebook
      </button>
      <br />
      <b className=" text-danger">{errorMessage}</b> <br />
    </div>
  );
};

export default SocialSignin;
