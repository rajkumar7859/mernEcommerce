import React, { useState } from "react";
import { Link , useLocation } from "react-router-dom";
import {FaBars} from 'react-icons/fa'
import {CgClose} from 'react-icons/cg'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="flex items-center justify-between flex-wrap bg-sky-400 p-4">
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
          {!isOpen?<FaBars color="black" /> : <CgClose color="black" />}
        </button>
      </div>
      <div
        className={`w-full block flex-grow md:flex flex-col-reverse md:items-center md:w-auto ${
          isOpen ? "block" : "hidden"
        }`}
      >

        <div className="text-lg font-semibold md:flex-grow">
        <ul className="flex" >
          <li>  
            <Link to="/" 
              className={`block mt-4 md:inline-block md:mt-0 text-black hover:text-white mr-4 ${
              location.pathname === "/" ? "underline" : ""}`}
              onClick={toggleOpen}>
              Home
            </Link>
            </li>
          <li>  <Link to="/deals"
              className={`block mt-4 md:inline-block md:mt-0 text-black hover:text-white mr-4 ${
              location.pathname === "/deals" ? "underline " : " hover:underline transition-all duration-200"}`}
              onClick={toggleOpen}
            >
             Deals
            </Link></li>
          <li>  <Link to="/contact"
              className={`block mt-4 md:inline-block md:mt-0 text-black hover:text-white mr-4 ${
              location.pathname === "/contact" ? "underline" : ""}`}
              onClick={toggleOpen}
            >
              Contact
            </Link></li>
          <li> 
            <Link to="/aboutus"
              className={`block mt-4 md:inline-block md:mt-0 text-black hover:text-white mr-4 ${
              location.pathname === "/aboutus" ? "underline" : ""}`}
              onClick={toggleOpen}
            >
              About
            </Link>
            </li>
          <li><Link to="/signup"
              className={`block mt-4 md:inline-block md:mt-0 text-black hover:text-white mr-4 ${
              location.pathname === "/signup" ? "underline" : ""}`}
              onClick={toggleOpen}
            >
              Sign Up
            </Link></li>
        </ul>
      
        </div>
      </div>
    </nav>
  );
};

export default Navbar;