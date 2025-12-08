import React, { useEffect, useState } from "react";
import { AuthContex } from "./AuthContex";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { auth } from "../Firebase/Firebase";
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loader, setLoader]=useState(true)
//SingOut
const creatSingOut=()=>{
    setLoader(true)
     return signOut(auth)
}

// creatUserEmailAndPasswor

const creatUserWithEmail =(email, password)=>{
    setLoader(true)
 return createUserWithEmailAndPassword(auth,email,password)
}
// sinIn With Googel
const provider =new GoogleAuthProvider()
const singInWithGoogle=()=>{
    setLoader(true)
    return signInWithPopup(auth, provider)
}


// singInWithEmailAndPassword
const userSingIn =(email,password)=>{
    setLoader(true)
 return signInWithEmailAndPassword(auth,email,password)
}
//updateProfiel 
const updataUserProfile=(profile)=>{
  return updateProfile(auth.currentUser,profile)
}

useEffect(()=>{
    const subscibe=onAuthStateChanged(auth,(current)=>{
        setLoader(false),
        setUser(current)
    })
    return()=>{
        subscibe()
    }
},[])




  const authInfo = {
    user,
    setUser,
    loader,
    setLoader,
    creatUserWithEmail,
    singInWithGoogle,
    userSingIn,
    creatSingOut,
    updataUserProfile
  };

  return <AuthContex value={authInfo}>{children}</AuthContex>;
};