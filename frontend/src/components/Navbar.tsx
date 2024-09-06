import { useState } from "react";
import logo from "../assets/logo-no-background.svg";
import { NavLink } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoCloseSharp } from "react-icons/io5";

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
  const toggleBurgerMenu = () => {
    setIsBurgerMenuOpen(!isBurgerMenuOpen);
  };

  return (
    <header className="py-6 bg-bgPrimary">
      <nav className="flex justify-between px-10 w-screen">
        <a href="">
          <img src={logo} alt="logo" className="h-10" />
        </a>
        <ul className="sm:flex hidden items-center gap-4 text-accentPrimary">
          {navbarItems.map((item) => {
            return (
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
            );
          })}
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
        </ul>
        <div className="flex items-center sm:hidden">
          <button onClick={toggleBurgerMenu} className="flex items-center p-3 rounded text-accentPrimary hover:font-bold">
            {isBurgerMenuOpen ? (
              <IoCloseSharp className="size-5"/>
            ) : (
              <RxHamburgerMenu className="size-5"/>
            )}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
