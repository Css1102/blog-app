import { Link, useNavigate } from "react-router-dom";
import AuthServiceObj from "../appwrite/Auth";
import Button from "./Button";
import React, { useState } from "react";
import Input from "./Input";
import Logo from "./Logo";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import cricimg from '../assets/blogimg.svg'
function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const[isError,setIsError]=useState(false)
  const[msg,setMsg]=useState("")
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    console.log(data);
    setError("");
    setMsg("")
    try {
      const userData = await AuthServiceObj.createAccount(data);
      console.log(userData);
        if (userData) {
          setIsError(false)
          console.log(userData.message)
          setMsg(userData?.message)

          navigate("/login");
        }
    } catch (error) {
      setIsError(true)
      setError(error.message);
    }
  };
  return (
    <div className="flex items-center justify-center">
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
          Sign up to create account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>
{isError
  ? error && <p className="text-red-600 mt-8 text-center">{error}</p>
  : msg && <p className="text-green-600 mt-8 text-center">{msg}</p>
}
        <form onSubmit={handleSubmit(create)} className="mt-8">
          <div className="space-y-5">
            <Input
              {...register("name", { required: true })}
              label="Full Name : "
              placeholder="Full Name"
            />
            <Input
              {...register("email", {
                required: true,
              })}
              label="Email : "
              placeholder="Email Address"
              type="email"
            />
            <Input
              {...register("password", { required: true })}
              label="Password : "
              type="password"
              placeholder="Password"
            />
            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
