import React from 'react'
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import AuthServiceObj from "../appwrite/Auth";
import { login as authLogin } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
const GoogleLogin = () => {

  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    async function verify() {
      try {
        const result = await AuthServiceObj.validateGoogleUser();
        dispatch(authLogin(result.user));

        navigate("/allposts");
      } catch (err) {
        setError(err.message);
        navigate('/login')
      }
    }

    verify();
  }, []);

  return (
    <div className="text-center mt-20 text-white">
      {error ? <p>{error}</p> : <p>Verifying Google login…</p>}
    </div>
  );
}

export default GoogleLogin