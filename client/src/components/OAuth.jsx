import { Button } from "flowbite-react";
import React from "react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import {
  signInFalse,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

export default function OAuth() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOAuth = async () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      dispatch(signInStart());
      const googleAuthResult = await signInWithPopup(auth, provider);

      const response = await fetch("http://localhost:8000/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: googleAuthResult.user.displayName,
          email: googleAuthResult.user.email,
          photoURL: googleAuthResult.user.photoURL,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        dispatch(signInFalse(data.message));
      } else {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      dispatch(signInFalse(error.message));
    }
  };

  return (
    <Button outline type="button" onClick={handleOAuth}>
      <AiFillGoogleCircle className="w-6 h-6 mr-2" />
      Continue with Google
    </Button>
  );
}
