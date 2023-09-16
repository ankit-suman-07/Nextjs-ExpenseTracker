import React, { useEffect } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/firebase/firebaseConfig"; // Import auth and provider directly from Firebase

export default function SignIn(props) {
  

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      props.setUser(user);
    });
  }, []);

  const signIn = () => signInWithPopup(auth, provider);
  const signOut = () => auth.signOut();

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
