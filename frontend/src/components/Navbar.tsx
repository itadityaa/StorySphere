import { useState } from "react";
import logo from "../assets/logo-no-background.svg";
import { Link, NavLink } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoCloseSharp } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import userLogo from "../assets/boy.png";
import { useLogoutMutation } from "../redux/features/auth/authAPI";
import { logout } from "../redux/features/auth/authSlice";

const navbarItems = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "About Us",
    link: "/about",
  },
  {
    name: "Privacy Policy",
    link: "/privacypolicy",
  },
  {
    name: "Contact Us",
    link: "/contact",
  },
];

const Navbar = () => {
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const toggleBurgerMenu = () => {
    setIsBurgerMenuOpen(!isBurgerMenuOpen);
  };

  const dispatch = useDispatch();
  const [logoutUser] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
      alert("Logged out successfully");
    } catch (error) {
      alert(`An error occurred: ${error}`);
    }
  };

  return (
    <header className="py-6 bg-bgPrimary">
      <nav className="flex justify-between px-10 w-full">
        <a href="/">
          <img src={logo} alt="logo" className="h-10" />
        </a>
        <ul className="sm:flex hidden items-center gap-6 text-accentPrimary">
          {navbarItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.link}
                className={({ isActive }) =>
                  isActive
                    ? "text-accentPrimary font-bold"
                    : "text-accentPrimary"
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}

          {user ? (
            <>
              <li className="flex items-center gap-2">
                <img src={userLogo} alt="User Logo" className="size-8" />
                <button
                  onClick={handleLogout}
                  className="w-full text-accentSecondary py-2 rounded-sm hover:rounded-md hover:text-bgSecondary transition-all ease-in-out duration-300"
                >
                  Logout
                </button>
              </li>
              {user.role === "admin" && (
                <li>
                  <Link to="/admin/dashboard">
                    <button className="w-full text-accentSecondary py-2 rounded-sm hover:rounded-md hover:text-bgSecondary transition-all ease-in-out duration-300">
                      Dashboard
                    </button>
                  </Link>
                </li>
              )}
            </>
          ) : (
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
          )}
        </ul>
        <div className="flex items-center sm:hidden">
          <button
            onClick={toggleBurgerMenu}
            className="flex items-center p-3 rounded text-accentPrimary hover:font-bold"
          >
            {isBurgerMenuOpen ? (
              <IoCloseSharp className="size-5" />
            ) : (
              <RxHamburgerMenu className="size-5" />
            )}
          </button>
        </div>
      </nav>

      {isBurgerMenuOpen && (
        <div className="fixed top-24 right-9 w-auto mx-3 h-auto pb-8 border-b rounded-md bg-bgPrimary text-accentPrimary shadow-sm z-50">
          <ul>
            {navbarItems.map((item) => (
              <li key={item.name} className="px-4 mt-5">
                <NavLink
                  onClick={() => setIsBurgerMenuOpen(false)}
                  to={item.link}
                  className={({ isActive }) =>
                    isActive
                      ? "text-accentPrimary font-bold"
                      : "text-accentPrimary"
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
            {!user && (
              <li className="px-4 mt-5">
                <NavLink to="/login">Login</NavLink>
              </li>
            )}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
