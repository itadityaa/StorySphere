// import React from 'react'
import logo from "../assets/logo-no-background.svg";
import { NavLink } from "react-router-dom";

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
  {
    name: "Login",
    link: "/login",
  },
];

const Navbar = () => {
  return (
    <header className="py-6 bg-bgPrimary">
      <nav className="container mx-auto flex justify-between px-2">
        <a href="">
          <img src={logo} alt="logo" className="h-10" />
        </a>
        <ul className="sm:flex hidden items-center gap-4 text-accentPrimary">
          {navbarItems.map((item) => {
            return (
              <li key={item.name}>
                <NavLink to={item.link}
                className={({ isActive }) =>
                  isActive? "text-accentPrimary font-bold" : "text-accentPrimary"}
                >{item.name}</NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
