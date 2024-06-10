import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Outlet } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { login, logout } from "./store/authSlice";
import Header from "./components/Header/Header"
import Footer from "./components/footer/Footer"
import AuthService from './appwrite/Auth'
import Logo from "./components/Logo"


function App() {
console.log(import.meta.env.VITE_APP_APPWRITE_URL)
console.log(import.meta.env.VITE_APP_APPWRITE_PROJECT_ID)
console.log(import.meta.env.VITE_APP_APPWRITE_DATABASE_ID)
console.log(import.meta.env.VITE_APP_APPWRITE_COLLECTION_ID)
console.log(import.meta.env.VITE_APP_APPWRITE_BUCKET_ID)
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

    useEffect(() => {
        AuthService
            .getCurrentUser()
            .then((userData) => {
                if (userData) dispatch(login({ userData }));
                else dispatch(logout());
            })
            .finally(() => setLoading(false));
    }, [dispatch]);
    
    return !loading ? (
      <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
          <div className="w-full block">
              <Header />
              <main>
                  <Outlet />
              </main>
          </div>
          <div className="w-full block">
              <Footer />
          </div>
      </div>
  ) : null;
}

export default App
