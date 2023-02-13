import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { CgClose } from "react-icons/cg";
import "../Styles/index.css";
import { Button } from "@chakra-ui/react";
import profile from "../assets/image/user.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="flex w-full items-center justify-between flex-wrap bg-sky-400 p-3 fixed z-10">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <Link to="/" className="font-semibold text-xl tracking-tight">
          My App
        </Link>
      </div>
      <div className="block md:hidden">
        <button
          className="navbar-burger flex items-center px-3 py-2 border rounded text-black border-teal-400 hover:text-white hover:border-white"
          onClick={toggleOpen}
        >
          {!isOpen ? <FaBars color="black" /> : <CgClose color="black" />}
        </button>
      </div>
      <div
        className={`w-full block  md:flex flex-col-reverse md:items-center md:w-auto ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <div className="text-lg font-semibold md:flex-grow">
          <ul className="tab lg:flex md:flex sm:block">
            <li>
              <Link
                to="/"
                className={`block mt-4 md:inline-block md:mt-0 text-black hover: mr-4 ${
                  location.pathname === "/"
                    ? "underline underline-offset-4 decoration-yellow-300 decoration-2"
                    : ""
                }`}
                onClick={toggleOpen}
              >
                Home
              </Link>
            </li>
            <li>
              {" "}
              <Link
                to="/deals"
                className={`block mt-4 md:inline-block md:mt-0 text-black hover: mr-4 ${
                  location.pathname === "/deals"
                    ? "underline underline-offset-4 decoration-yellow-300 decoration-2 "
                    : ""
                }`}
                onClick={toggleOpen}
              >
                Deals
              </Link>
            </li>
            <li className="block mt-4 md:inline-block md:mt-0 text-black mr-3">
              Category
              <ul className="innerTab">
                <li className="hover:bg-slate-300">
                  <Link to="/deals">Home Appliances</Link>
                </li>
                <li className="hover:bg-slate-300">
                  <Link to="/deals">Electronic</Link>
                </li>
                <li className="hover:bg-slate-300">
                  <Link to="/deals">Clothes</Link>
                </li>
              </ul>
            </li>
            <li>
              {" "}
              <Link
                to="/contact"
                className={`block mt-4 md:inline-block md:mt-0 text-black hover: mr-4 ${
                  location.pathname === "/contact"
                    ? "underline underline-offset-4 decoration-yellow-300 decoration-2"
                    : ""
                }`}
                onClick={toggleOpen}
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/aboutus"
                className={`block mt-4 md:inline-block md:mt-0 text-black hover: mr-4 ${
                  location.pathname === "/aboutus"
                    ? "underline underline-offset-4 decoration-yellow-300 decoration-2"
                    : ""
                }`}
                onClick={toggleOpen}
              >
                About
              </Link>
            </li>
            <li>
              {/* <div className="flex items-center flex-shrink-0 text-white mr-5 -mt-1.5"> */}
                <img
                  src={profile}
                  className="w-10 h-10 rounded-full flex items-center flex-shrink-0 text-white mr-5 -mt-1.5"
                  alt="Profile"
                />
                <ul className="innerTabProfile">
                  <li className="hover:bg-slate-300">
                    <Link to="/deals">Profile</Link>
                  </li>
                  <li className="hover:bg-slate-300">
                    <Link to="/deals">Login</Link>
                  </li>
                  <li className="hover:bg-slate-300">
                    <Link to="/deals">Sign out</Link>
                  </li>
                </ul>
            </li>
            <li>
              <Button mt="-7px" bg="#E2E8F0">
                <Link
                  to="/signup"
                  className={`block mt-4 md:inline-block md:mt-0 text-black`}
                  onClick={toggleOpen}
                >
                  Sign Up
                </Link>
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
