"use client"

import React, { useEffect, useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/firebase/firebaseConfig"; // Import auth and provider directly from Firebase
import { logIn, logOut } from "@/redux/features/auth-slice";
import { useDispatch } from "react-redux";


export default function SignIn(props) {
  const [username, setuserName] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      props.setUser(user);
      user && setuserName(user.displayName);
    });
  }, []);

  const signIn = () => {
    signInWithPopup(auth, provider);
    dispatch(logIn(username));
  }
  const signOut = () => {
    auth.signOut();
    dispatch(logOut());
  }

  return (
    <main>
      <div>
        <h3>SignIn with google</h3>
        <div>
          <button onClick={signIn}>Sign In</button>
          <button onClick={signOut}>Sign Out</button>
        </div>
        
      </div>
    </main>
  );
}
