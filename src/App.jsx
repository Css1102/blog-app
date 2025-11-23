import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/authSlice";
import Header from "./components/Header/Header";
import Footer from "./components/footer/Footer";
import AuthServiceObj from "./appwrite/Auth.js";
import Logo from "./components/Logo";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    AuthServiceObj.getCurrentUser()
      .then((userData) => {
        if (userData) dispatch(login({ userData }));
        else dispatch(logout());
      })
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <div className="w-full m-0 p-0 min-h-screen flex flex-wrap justify-between ">
      <div className="w-full">
        <Header />
        </div>
        <div className="min-h-screen w-full bg-lime-200">
        <main>
          <Outlet />
        </main>
        </div>
      <div className="w-full">
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;
