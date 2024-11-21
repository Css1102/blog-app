import React from "react";
import { useDispatch } from "react-redux";
import AuthServiceObj from "../../appwrite/Auth.js";
import { logout } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";

function Logout() {
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const logoutHandler = () => {
    let opin=confirm("Are you sure you want to miss this?")
    if(opin){
    AuthServiceObj.logout().then(() => {
      dispatch(logout());
      navigate('/')
    });
    }
  };
  return (
    <button
      className="inline-block text-slate-100 px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
      onClick={logoutHandler}
    >Logout</button>
  );
}

export default Logout;
