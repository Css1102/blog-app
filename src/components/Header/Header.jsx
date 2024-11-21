import React from "react";
import { Link } from "react-router-dom";
import Container from "../container/Container";
import Logo from "../Logo";
import Logout from "./Logout";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AllPosts from "../../pages/AllPosts";
import rocket from '../../assets/rb_1971.png'
function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  console.log(authStatus)
  const navigate = useNavigate();
  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: !authStatus,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "SignUp",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "Blogs",
      slug: "/allposts",
      active: authStatus,
    },
    {
      name: "Create",
      slug: "/addposts",
      active: authStatus,
    },
  ];
  return (
    <header className=" fixed z-50 w-[100%] h-[120px] md:h-[60px] backdrop-blur-sm py-3 shadow bg-lime-500 rounded-md">
      <Container>
        <nav className="flex flex-row justify-between">
        <Link to="/">
        <div className="flex justify-evenly items-center ">
              <img className=" bg-inherit z-[60] h-[70px] w-[70px] object-cover relative bottom-5" src={rocket} alt="" />
      
            <h2 className="font-sora font-bold text-lg text-white relative bottom-3">ROC8 RETURNS</h2>
            </div>
            </Link>
          <ul className="ml-auto flex">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                {item.name==="Create" && <svg className="ml-2 mr-2 mt-2.5 " xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" 
                viewBox="0 0 24 24" aria-label="Write"><path fill="currentColor"
                d="M14 4a.5.5 0 0 0 0-1zm7 6a.5.5 0 0 0-1 0zm-7-7H4v1h10zM3 4v16h1V4zm1 
                 17h16v-1H4zm17-1V10h-1v10zm-1 1a1 1 0 0 0 1-1h-1zM3 20a1 1 0 
                 0 0 1 1v-1zM4 3a1 1 0 0 0-1 1h1z"></path>
                 <path stroke="currentColor" d="m17.5 4.5-8.458 8.458a.25.25 0 0 0-.06.098l-.824 2.47a.25.25 
                 0 0 0 .316.316l2.47-.823a.25.25 0 0 0 .098-.06L19.5 6.5m-2-2 2.323-2.323a.25.25 0 0 1 
                 .354 0l1.646 1.646a.25.25 0 0 1 0 .354L19.5 6.5m-2-2 2 2">
                </path></svg>
                
                }
                  <button
                    onClick={() => navigate(item.slug)}
                    className={`inline-block text-slate-100 px-8  duration-200 hover:bg-blue-100 rounded-full ${item.name==="Create" ? "py-2 ml-2 relative bottom-[32px]":"py-2"}`}
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <Logout />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
