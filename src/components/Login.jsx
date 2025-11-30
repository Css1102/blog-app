import { Link, useNavigate } from "react-router-dom";
import AuthServiceObj from "../appwrite/Auth";
import Button from "./Button";
import React, { useState } from "react";
import Input from "./Input";
import Logo from "./Logo";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login as authLogin } from "../store/authSlice";
import { setJwt } from "../store/authSlice";
export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const login = async (data) => {
    setError("");
    try {
      const response = await AuthServiceObj.loginAccount(data);
      if (response?.session) {
        const userData = await response?.user
        const jwtToken=response?.jwt
        console.log(userData)
        if (userData) {
          dispatch(authLogin(userData));
          dispatch(setJwt(jwtToken))
          navigate("/allposts")
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="flex items-center justify-center w-full h-1/3">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px] mr-16 relative bottom-6 ">
            {/* <Logo width="100%" /> */}
            {/* <img src={cricimg} alt="" /> */}
            <Logo/>
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Email : "
              placeholder="Email Address"
              type="email"
              {...register("email", {
                required: true,
              })}
            />
            <Input
              label="Password : "
              type="password"
              placeholder="Password"
              {...register("password", { required: true })}
            />
            <Button type="submit" disabled={false} className="w-full">
              Sign in{" "}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
