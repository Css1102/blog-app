import React from "react";
import { useDispatch } from "react-redux";
import AuthServiceObj from "../../appwrite/Auth.js";
import { logout } from "../../store/authSlice";

function Logout() {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    AuthServiceObj.logout().then(() => {
      dispatch(logout());
    });
  };
  return (
    <button
      className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
      onClick={logoutHandler}
    ></button>
  );
}

export default Logout;
