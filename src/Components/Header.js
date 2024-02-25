import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { NetflixLogo, SUPPORTED_LANGUAGES, UserPhoto } from "../utils/Constants";
import { toggleGPTSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const showGptSearch = useSelector(store => store.gpt.showGptSearch)

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {});
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
        navigate("/browser");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, []);

  const handleGPTclick =()=>{
    dispatch(toggleGPTSearchView())
  }

  const handlelanguage=(e)=>{
    // console.log(e.target.value)
    dispatch(changeLanguage(e.target.value))
  }

  return (
    <div className="  absolute w-screen px-5 md:px-10 py-2   bg-gradient-to-b from-black  z-10 flex flex-col md:flex-row justify-between">
      <img className="mx-auto md:mx-0  w-44 " src={NetflixLogo} alt="logo" />
      {user && (
        <div className=" flex justify-center sm:justify-center ">
        {showGptSearch &&  <select className="p-0 md:p-2 rounded-lg  " onChange={handlelanguage}>
            {SUPPORTED_LANGUAGES.map(lang => <option  key={lang.identifier} value={lang.identifier}>{lang.name}</option>)}
          </select>}
          <button className="bg-red-700 mx-3 md:mx-6 px-2 md:px-6 sm:mx-14 text-white font-medium md:font-semibold rounded-lg" onClick={handleGPTclick}>
            {showGptSearch ? "HomePage" :"GPT Search"}
          </button>
          <img className=" w-8 md:w-12 md:h-14 rounded-3xl" src={UserPhoto} alt="userlogo" />

          <button
            onClick={handleSignOut}
            className="font-bold text-white text-sm md:text-base text-center"
          >
            (Sign Out)
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
