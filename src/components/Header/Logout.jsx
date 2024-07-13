import React from "react";
import { useDispatch } from "react-redux";
import AuthServiceObj from "../../appwrite/Auth.js";
import { logout } from "../../store/authSlice";

function Logout() {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    let opin=confirm("Are you sure you want to miss this?")
    if(opin){
    AuthServiceObj.logout().then(() => {
      dispatch(logout());
    });
    }
  };
  return (
    <button
      className="inline-block text-orange-200 px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
      onClick={logoutHandler}
    >Logout</button>
  );
}

export default Logout;
