import React, { useRef, useState } from "react";
import Header from "./Header";
import { ValidateData } from "../utils/Validate";
import {  createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BG_URL, UserPhoto } from "../utils/Constants";

const Login = () => {
  const dispatch = useDispatch()
  const [login, setLogin] = useState(true);
  const [errorMessage, setErrorMessage]  = useState(null)

  const name = useRef(null)
  const email = useRef(null)
  const password = useRef(null)
//   const confirmPassword = useRef(null)

  const handleLogin = () => {
    setLogin(!login);
  };

  const handleLoginData =()=>{
    const message = ValidateData(email.current.value, password.current.value)
    setErrorMessage(message)
    if(message) return ;
   
    if(!login){

        createUserWithEmailAndPassword(auth,email.current.value, password.current.value)
  .then((userCredential) => {
    const user = userCredential.user;
    updateProfile(auth, {
      displayName: name.current.value, photoURL: UserPhoto
    }).then(() => {
      const {uid, email, displayName }= auth;
          dispatch(addUser({uid: uid,  email:email, displayName:displayName}))
    }).catch((error) => {
    //  error page 
    });
    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode + " - " + errorMessage)
    // ..
  });

    }else{

        signInWithEmailAndPassword(auth, email.current.value, password.current.value)
  .then((userCredential) => {
    const user = userCredential.user;
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode + " - " + errorMessage)
  });


    }
    
  }

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src={BG_URL} alt="background"
        />
      </div>
      <form onSubmit={(e)=> e.preventDefault()} className="absolute p-12 bg-black w-3/12 my-40 mx-auto right-0 left-0 text-white opacity-85 rounded-xl">
        <h1 className="text-3xl font-bold py-3">
          {login ? "Sign In" : "Sign Up"}
        </h1>
        {!login && (
          <input ref={name}
            type="text"
            placeholder="Full Name"
            className="p-2 m-2 w-full bg-gray-600 rounded-sm"
          />
        )}
        <input ref={email}
          type="text"
          placeholder="Email Address"
          className="p-2 m-2 w-full bg-gray-600 rounded-sm"
        />
        <input ref={password}
          type="password"
          placeholder="Password"
          className="p-2 m-2 w-full bg-gray-600 rounded-sm"
        />
        {/* {!login && (
          <input ref={confirmPassword}
            type="password"
            placeholder="Confirm Password"
            className="p-2 m-2 w-full bg-gray-600 rounded-sm"
          />
        )} */}
        <p className="text-red-500 font-bold mx-3">{errorMessage}</p>
        <button className="p-2 my-4 mx-2 w-full bg-red-700  rounded-sm" onClick={handleLoginData}>
          {login ? "Sign In" : "Sign Up"}
        </button>
        <p>
          {login ? "Don't have an account ?" : "Already have an account ?"}{" "}
          <span
            className="text-yellow-400 cursor-pointer"
            onClick={handleLogin}
          >
            {login ? "Register" : "Sign In"}{" "}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
