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
// return (
//   <header className="fixed z-50 w-full backdrop-blur-sm bg-lime-500 shadow-md py-3 px-4 sm:px-6 md:px-8 rounded-b-lg">
//     <Container>
//       <nav className="flex flex-wrap items-center justify-between gap-y-4">
//         {/* Logo Section */}
//         <Link to="/" className="flex items-center gap-3 md:relative right-20">
//           <img
//             src={rocket}
//             alt="Logo"
//             className="h-10 w-10 sm:h-12 sm:w-12 object-cover"
//           />
//           <h2 className="font-sora font-bold text-lg sm:text-xl text-white tracking-wide">
//             ROC8 RETURNS
//           </h2>
//         </Link>

//         {/* Navigation Items */}
//         <ul className="flex flex-wrap items-center gap-3 md:relative left-20 sm:gap-4 md:gap-6">
//           {navItems.map((item) =>
//             item.active ? (
//               <li key={item.name} className="flex items-center">
//                 {item.name === "Create" && (
//                   <svg
//                     className="w-5 h-5 text-white mr-2"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     aria-label="Write"
//                   >
//                     <path
//                       fill="currentColor"
//                       d="M14 4a.5.5 0 0 0 0-1zm7 6a.5.5 0 0 0-1 0zm-7-7H4v1h10zM3 4v16h1V4zm1 
//                       17h16v-1H4zm17-1V10h-1v10zm-1 1a1 1 0 0 0 1-1h-1zM3 20a1 1 0 
//                       0 0 1 1v-1zM4 3a1 1 0 0 0-1 1h1z"
//                     />
//                     <path
//                       stroke="currentColor"
//                       d="m17.5 4.5-8.458 8.458a.25.25 0 0 0-.06.098l-.824 2.47a.25.25 
//                       0 0 0 .316.316l2.47-.823a.25.25 0 0 0 .098-.06L19.5 6.5m-2-2 
//                       2.323-2.323a.25.25 0 0 1 .354 0l1.646 1.646a.25.25 0 0 1 0 
//                       .354L19.5 6.5m-2-2 2 2"
//                     />
//                   </svg>
//                 )}
//                 <button
//                   onClick={() => navigate(item.slug)}
//                   className={`text-white font-medium px-4 py-2 rounded-full transition duration-200 hover:bg-white hover:text-lime-600 ${
//                     item.name === "Create" ? "bg-white text-lime-600 shadow-sm" : ""
//                   }`}
//                 >
//                   {item.name}
//                 </button>
//               </li>
//             ) : null
//           )}
//           {authStatus && (
//             <li>
//               <Logout />
//             </li>
//           )}
//         </ul>
//       </nav>
//     </Container>
//   </header>
// );
return (
<header className="fixed z-50 w-full backdrop-blur-sm bg-lime-500 shadow-md py-3 px-4 sm:px-6 md:px-8 rounded-b-lg">
  <Container>
    <nav className="flex flex-col sm:flex-row items-center justify-between gap-4">
      
      {/* Logo Section - Left on large screens */}
      <Link to="/" className="flex items-center gap-3">
        <img
          src={rocket}
          alt="Logo"
          className="h-10 w-10 sm:h-12 sm:w-12 object-cover"
        />
        <h2 className="font-sora font-bold text-lg sm:text-xl text-white tracking-wide">
          ROC8 RETURNS
        </h2>
      </Link>

      {/* Navigation Items - Right on large screens */}
      <ul className="flex flex-wrap items-center justify-center sm:justify-end gap-3 sm:gap-4 md:gap-6 w-full sm:w-auto">
        {navItems.map((item) =>
          item.active ? (
            <li key={item.name} className="flex items-center">
              {item.name === "Create" && (
                <svg
                  className="w-5 h-5 text-white mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-label="Write"
                >
                  <path
                    fill="currentColor"
                    d="M14 4a.5.5 0 0 0 0-1zm7 6a.5.5 0 0 0-1 0zm-7-7H4v1h10zM3 4v16h1V4zm1 
                    17h16v-1H4zm17-1V10h-1v10zm-1 1a1 1 0 0 0 1-1h-1zM3 20a1 1 0 
                    0 0 1 1v-1zM4 3a1 1 0 0 0-1 1h1z"
                  />
                  <path
                    stroke="currentColor"
                    d="m17.5 4.5-8.458 8.458a.25.25 0 0 0-.06.098l-.824 2.47a.25.25 
                    0 0 0 .316.316l2.47-.823a.25.25 0 0 0 .098-.06L19.5 6.5m-2-2 
                    2.323-2.323a.25.25 0 0 1 .354 0l1.646 1.646a.25.25 0 0 1 0 
                    .354L19.5 6.5m-2-2 2 2"
                  />
                </svg>
              )}
              <button
                onClick={() => navigate(item.slug)}
                className={`text-white font-medium px-4 py-2 rounded-full transition duration-200 hover:bg-white hover:text-lime-600 ${
                  item.name === "Create" ? "bg-slate-300 text-lime-600 shadow-sm" : ""
                }`}
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
