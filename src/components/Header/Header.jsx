import React from "react";
import { Link } from "react-router-dom";
import Container from "../container/Container";
import Logo from "../Logo";
import Logout from "./Logout";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AllPosts from "../../pages/AllPosts";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  console.log(authStatus)
  const navigate = useNavigate();
  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
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
      name: "AllPosts",
      slug: "/allposts",
      active: authStatus,
    },
    {
      name: "AddPost",
      slug: "/addposts",
      active: authStatus,
    },
  ];
  return (
    <header className=" py-3 shadow bg-zinc-900 border border-b border-b-white">
      <Container>
        <nav className="flex flex-row justify-between">
          <div className="max-h-10 relative right-[390px] xl:right-[405px]">
            <Link to="/">
            <div className="h-[70px] w-[100px] object-cover shadow-none blur-0 relative left-[360px] pb-8 ">
              <Logo />
              </div>
            </Link>
          </div>
          <ul className="ml-auto flex">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="inline-block text-orange-200 px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
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
